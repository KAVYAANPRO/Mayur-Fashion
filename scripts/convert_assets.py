import os
import zipfile
import json
import pymupdf
import cv2
import numpy as np
from PIL import Image, ImageOps
import pillow_heif
from ultralytics import YOLO

pillow_heif.register_heif_opener()

BASE_DIR = r"e:\Mayur Fashion"
PHOTOS_DIR = os.path.join(BASE_DIR, "Photos")
PUBLIC_DIR = os.path.join(BASE_DIR, "public")
ASSETS_DIR = os.path.join(PUBLIC_DIR, "assets")
CATALOG_DIR = os.path.join(ASSETS_DIR, "catalog")
PRODUCTS_DIR = os.path.join(ASSETS_DIR, "products")
LOGO_DIR = os.path.join(ASSETS_DIR, "logo")
DATA_DIR = os.path.join(BASE_DIR, "src", "data")

os.makedirs(CATALOG_DIR, exist_ok=True)
os.makedirs(PRODUCTS_DIR, exist_ok=True)
os.makedirs(LOGO_DIR, exist_ok=True)
os.makedirs(DATA_DIR, exist_ok=True)

print("--- 1. Processing PDF Catalog Pages ---")
pdf_path = os.path.join(PHOTOS_DIR, "FINAL_MAYUR.pdf")
catalog_manifest = []

if os.path.exists(pdf_path):
    doc = pymupdf.open(pdf_path)
    for i, page in enumerate(doc):
        pix = page.get_pixmap(dpi=180)
        filename_jpg = f"page_{i+1}.jpg"
        out_jpg = os.path.join(CATALOG_DIR, filename_jpg)
        pix.save(out_jpg)
        
        img = Image.open(out_jpg)
        filename_webp = f"page_{i+1}.webp"
        out_webp = os.path.join(CATALOG_DIR, filename_webp)
        img.save(out_webp, "WEBP", quality=92)
        
        catalog_manifest.append({
            "pageNumber": i + 1,
            "image": f"/assets/catalog/{filename_webp}",
            "imageJpg": f"/assets/catalog/{filename_jpg}",
            "width": pix.width,
            "height": pix.height
        })
        print(f"  Processed catalog page {i+1} ({pix.width}x{pix.height})")

print("\n--- 2. Loading YOLO Model for Accurate Person Detection ---")
yolo_model = YOLO("yolov8n.pt")

print("\n--- 3. Processing Photoshoots 1 & 2 (Studio Gear Removed & Full-Length Model Preserved) ---")
zips = [
    ("shoot2", os.path.join(PHOTOS_DIR, "Mayur Fashion Shoot-2- Sakshi- Photos.zip")),
    ("shoot1", os.path.join(PHOTOS_DIR, "Mayur Kurtis Shoot-1- Sakshi.zip"))
]

processed_photos = []

for shoot_id, zip_path in zips:
    if not os.path.exists(zip_path):
        print(f"  Warning: {zip_path} not found")
        continue
    
    with zipfile.ZipFile(zip_path) as z:
        names = sorted([n for n in z.namelist() if not n.startswith('__MACOSX') and n.lower().endswith(('.heic', '.jpg', '.jpeg', '.png'))])
        print(f"  Found {len(names)} images in {shoot_id}")
        
        for idx, name in enumerate(names):
            base_name = os.path.splitext(os.path.basename(name))[0]
            clean_id = f"{shoot_id}_{base_name.lower()}"
            
            with z.open(name) as f:
                try:
                    img = Image.open(f)
                    img = ImageOps.exif_transpose(img) # Correct orientation
                    w, h = img.size
                    
                    # Run YOLO person detection on downscaled copy
                    small_img = img.copy()
                    small_img.thumbnail((800, 1067), Image.Resampling.LANCZOS)
                    sw, sh = small_img.size
                    
                    yolo_res = yolo_model(np.array(small_img), verbose=False)[0]
                    
                    person_box = None
                    max_area = 0
                    for box, cls, conf in zip(yolo_res.boxes.xyxy.cpu().numpy(), yolo_res.boxes.cls.cpu().numpy(), yolo_res.boxes.conf.cpu().numpy()):
                        if int(cls) == 0 and conf > 0.35:
                            area = (box[2] - box[0]) * (box[3] - box[1])
                            if area > max_area:
                                max_area = area
                                person_box = [
                                    box[0] / sw * w,
                                    box[1] / sh * h,
                                    box[2] / sw * w,
                                    box[3] / sh * h
                                ]
                    
                    if person_box:
                        px1, py1, px2, py2 = person_box
                    else:
                        if shoot_id == "shoot1":
                            px1, py1, px2, py2 = int(w * 0.39), int(h * 0.39), int(w * 0.59), int(h * 0.89)
                        else:
                            px1, py1, px2, py2 = int(w * 0.38), int(h * 0.36), int(w * 0.64), int(h * 0.99)
                            
                    person_h = py2 - py1
                    person_w = px2 - px1
                    
                    # Top Crop:
                    # Guaranteed below curtain rod grommets (y >= 0.325*h), leaving clean curtain headroom
                    crop_top = max(int(h * 0.325), int(py1 - person_h * 0.065))
                    
                    # Bottom Crop:
                    # Captures model from head down to shoes/sandals and floor
                    if py2 >= h * 0.95:
                        crop_bottom = h
                    else:
                        crop_bottom = min(h, int(py2 + person_h * 0.045))
                        
                    # Lateral Crop:
                    # Clean curtain zone is [0.372*w, 0.618*w] (completely inside curtain, outside mirror & stool)
                    c_left = int(w * 0.372)
                    c_right = int(w * 0.618)
                    
                    # Expand safely only if model extends beyond clean zone (e.g. wide sleeves / dupatta)
                    if px1 - 15 < c_left:
                        c_left = max(int(w * 0.335), int(px1 - 15))
                    if px2 + 15 > c_right:
                        c_right = min(int(w * 0.655), int(px2 + 15))
                        
                    cropped_img = img.crop((c_left, crop_top, c_right, crop_bottom))
                    
                    # Corner healing if expanded into mirror or stool zones
                    cv_crop = cv2.cvtColor(np.array(cropped_img), cv2.COLOR_RGB2BGR)
                    ch, cw, _ = cv_crop.shape
                    
                    mask = np.zeros((ch, cw), dtype=np.uint8)
                    need_inpaint = False
                    
                    # If c_left expanded into mirror zone (< 0.370*w):
                    if c_left < int(w * 0.370):
                        mirror_end_x = int(w * 0.370) - c_left
                        safe_mx = min(mirror_end_x + 5, max(0, int(px1 - c_left - 8)))
                        if safe_mx > 5:
                            pts_l = np.array([[0, int(ch * 0.75)], [safe_mx, int(ch * 0.90)], [safe_mx, ch], [0, ch]], np.int32)
                            cv2.fillPoly(mask, [pts_l], 255)
                            need_inpaint = True
                            
                    # If c_right expanded into stool zone (> 0.618*w):
                    if c_right > int(w * 0.618):
                        stool_start_x = int(w * 0.618) - c_left
                        safe_sx = max(stool_start_x - 5, min(cw, int(px2 - c_left + 8)))
                        if safe_sx < cw - 5:
                            pts_r = np.array([[safe_sx, ch], [safe_sx, int(ch * 0.85)], [cw, int(ch * 0.75)], [cw, ch]], np.int32)
                            cv2.fillPoly(mask, [pts_r], 255)
                            need_inpaint = True
                            
                    if need_inpaint:
                        cleaned_cv = cv2.inpaint(cv_crop, mask, 5, cv2.INPAINT_TELEA)
                    else:
                        cleaned_cv = cv_crop
                        
                    final_pil = Image.fromarray(cv2.cvtColor(cleaned_cv, cv2.COLOR_BGR2RGB))
                    
                    # Master High-Res Output (max 1200x2000)
                    img_full = final_pil.copy()
                    img_full.thumbnail((1200, 2000), Image.Resampling.LANCZOS)
                    
                    out_jpg_name = f"{clean_id}.jpg"
                    out_webp_name = f"{clean_id}.webp"
                    out_thumb_name = f"{clean_id}_thumb.webp"
                    
                    out_jpg_path = os.path.join(PRODUCTS_DIR, out_jpg_name)
                    out_webp_path = os.path.join(PRODUCTS_DIR, out_webp_name)
                    out_thumb_path = os.path.join(PRODUCTS_DIR, out_thumb_name)
                    
                    img_full.save(out_jpg_path, "JPEG", quality=92)
                    img_full.save(out_webp_path, "WEBP", quality=92)
                    
                    # Retina Thumbnail (max 600x1000)
                    img_thumb = final_pil.copy()
                    img_thumb.thumbnail((600, 1000), Image.Resampling.LANCZOS)
                    img_thumb.save(out_thumb_path, "WEBP", quality=88)
                    
                    processed_photos.append({
                        "id": clean_id,
                        "shoot": shoot_id,
                        "original": base_name,
                        "image": f"/assets/products/{out_webp_name}",
                        "imageJpg": f"/assets/products/{out_jpg_name}",
                        "thumbnail": f"/assets/products/{out_thumb_name}",
                        "width": img_full.width,
                        "height": img_full.height
                    })
                    print(f"    Cleaned & Cropped {clean_id} -> {img_full.width}x{img_full.height}")
                except Exception as e:
                    print(f"    Error processing {name}: {e}")

manifest_data = {
    "catalog": catalog_manifest,
    "photos": processed_photos,
    "totalPhotos": len(processed_photos)
}

manifest_path = os.path.join(DATA_DIR, "photos_manifest.json")
with open(manifest_path, "w", encoding="utf-8") as f:
    json.dump(manifest_data, f, indent=2)

print(f"\nManifest saved to {manifest_path} with {len(processed_photos)} professionally cropped photos.")
