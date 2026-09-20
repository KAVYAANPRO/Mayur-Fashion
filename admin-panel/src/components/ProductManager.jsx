import React, { useState, useEffect, useRef } from 'react';

/* ─── tiny helper: human-readable file size ────────────────── */
const fmtSize = (bytes) => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
};

function ProductManager({ categories, auth }) {
  const [products, setProducts]       = useState([]);
  const [loading, setLoading]         = useState(true);
  const [mobileView, setMobileView]   = useState('all');

  /* ── form fields ── */
  const [name, setName]               = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice]             = useState('');
  const [category, setCategory]       = useState('');
  const [stock, setStock]             = useState('');
  const [sizes, setSizes]             = useState([]);
  const [customFields, setCustomFields] = useState([]);

  /* ── multi-image state ── */
  const [imageFiles, setImageFiles]   = useState([]);   // File objects
  const [previews, setPreviews]       = useState([]);   // { url, name, size }
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');
  const fileInputRef = useRef(null);
  const dropZoneRef  = useRef(null);

  /* ── fetch ── */
  const fetchProducts = async () => {
    try {
      const res  = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error('Failed to fetch products', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  /* ── add images (merge, deduplicate by name) ── */
  const addImages = (newFiles) => {
    const combined = [...imageFiles];
    const newPreviews = [...previews];

    Array.from(newFiles).forEach((file) => {
      const already = combined.some((f) => f.name === file.name && f.size === file.size);
      if (!already) {
        combined.push(file);
        newPreviews.push({ url: URL.createObjectURL(file), name: file.name, size: file.size });
      }
    });

    setImageFiles(combined);
    setPreviews(newPreviews);
  };

  const handleFileInputChange = (e) => {
    if (e.target.files.length) addImages(e.target.files);
    e.target.value = ''; // reset so same file can be re-added after removal
  };

  const removeImage = (idx) => {
    URL.revokeObjectURL(previews[idx].url);
    setImageFiles((prev) => prev.filter((_, i) => i !== idx));
    setPreviews((prev)  => prev.filter((_, i) => i !== idx));
  };

  /* Reorder: move left / right */
  const moveImage = (idx, dir) => {
    const newFiles = [...imageFiles];
    const newPrev  = [...previews];
    const target   = idx + dir;
    if (target < 0 || target >= newFiles.length) return;
    [newFiles[idx], newFiles[target]] = [newFiles[target], newFiles[idx]];
    [newPrev[idx],  newPrev[target]]  = [newPrev[target],  newPrev[idx]];
    setImageFiles(newFiles);
    setPreviews(newPrev);
  };

  /* ── drag-and-drop ── */
  const handleDragOver = (e) => { e.preventDefault(); dropZoneRef.current?.classList.add('dz-hover'); };
  const handleDragLeave = ()   => { dropZoneRef.current?.classList.remove('dz-hover'); };
  const handleDrop = (e) => {
    e.preventDefault();
    dropZoneRef.current?.classList.remove('dz-hover');
    if (e.dataTransfer.files.length) addImages(e.dataTransfer.files);
  };

  /* ── submit ── */
  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (imageFiles.length === 0) {
      alert('Please select at least one product image.');
      return;
    }

    setIsUploading(true);
    setUploadProgress(`Uploading ${imageFiles.length} image(s) to cloud…`);

    try {
      /* Upload all images in one request */
      const formData = new FormData();
      imageFiles.forEach((file) => formData.append('images', file));

      const uploadRes = await fetch(`${import.meta.env.VITE_API_URL}/api/upload-multiple`, {
        method: 'POST',
        headers: { 'x-auth-token': auth.token },
        body: formData,
      });

      if (!uploadRes.ok) throw new Error('Image upload failed');
      const { imageUrls } = await uploadRes.json();

      setUploadProgress('Saving product…');

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-auth-token': auth.token },
        body: JSON.stringify({
          name, description,
          price:  price  ? Number(price)  : 0,
          sku:    `PROD-${Date.now().toString().slice(-6)}`,
          category,
          images: imageUrls,
          stock:  stock  ? Number(stock)  : 0,
          sizes,
          customFields,
        }),
      });

      if (res.ok) {
        setName(''); setDescription(''); setPrice(''); setCategory('');
        setStock(''); setSizes([]); setCustomFields([]);
        previews.forEach((p) => URL.revokeObjectURL(p.url));
        setImageFiles([]); setPreviews([]);
        fetchProducts();
        setMobileView('list');
      } else {
        alert('Failed to add product.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred during product creation.');
    } finally {
      setIsUploading(false);
      setUploadProgress('');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`, {
        method: 'DELETE', headers: { 'x-auth-token': auth.token },
      });
      if (res.ok) fetchProducts();
    } catch (err) { console.error(err); }
  };

  /* ─── render ────────────────────────────────────────────────── */
  return (
    <div className="animate-fade-in-up" style={{ width: '100%' }}>

      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '10px' }}>
        <h2 style={{ margin: 0, color: 'var(--primary)' }}>Product Management</h2>
        <div className="mobile-view-tabs" style={{ display: 'flex', gap: '6px' }}>
          <button type="button"
            className={mobileView === 'all' || mobileView === 'form' ? 'btn-primary' : 'btn-outline'}
            onClick={() => setMobileView(mobileView === 'form' ? 'all' : 'form')}
            style={{ fontSize: '0.82rem', padding: '0.5rem 0.9rem', minHeight: '36px' }}>
            ➕ Add Product
          </button>
          <button type="button"
            className={mobileView === 'all' || mobileView === 'list' ? 'btn-primary' : 'btn-outline'}
            onClick={() => setMobileView(mobileView === 'list' ? 'all' : 'list')}
            style={{ fontSize: '0.82rem', padding: '0.5rem 0.9rem', minHeight: '36px' }}>
            📦 Catalog ({products.length})
          </button>
        </div>
      </div>

      <div className="product-layout-container">

        {/* ── ADD FORM ─────────────────────────────────────────── */}
        {(mobileView === 'all' || mobileView === 'form') && (
          <div className="product-form-wrapper animate-slide-in-left">
            <div className="card">
              <h3 className="card-title">Add New Product</h3>
              <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>

                {/* ── Multi-Image Upload Zone ── */}
                <div>
                  <label style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
                    Product Photos * &nbsp;
                    <span style={{ fontWeight: 400, fontSize: '0.78rem' }}>
                      ({previews.length} selected — unlimited, first photo = cover)
                    </span>
                  </label>

                  {/* Drop zone */}
                  <div
                    ref={dropZoneRef}
                    className="drop-zone"
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    style={{
                      border: '2px dashed var(--border-color)',
                      borderRadius: '10px',
                      padding: '20px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      background: 'var(--bg-color)',
                      transition: 'border-color 0.2s, background 0.2s',
                      marginBottom: previews.length ? '12px' : 0,
                    }}
                  >
                    <div style={{ fontSize: '2rem', marginBottom: '6px' }}>📷</div>
                    <div style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '0.9rem' }}>
                      Click to browse or drag &amp; drop photos here
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      JPG, PNG, WEBP — unlimited photos allowed
                    </div>
                  </div>

                  {/* Hidden file input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileInputChange}
                    style={{ display: 'none' }}
                  />

                  {/* Preview grid */}
                  {previews.length > 0 && (
                    <div className="photo-preview-grid">
                      {previews.map((p, idx) => (
                        <div key={idx} className="photo-preview-item">
                          {/* Cover badge */}
                          {idx === 0 && (
                            <span className="cover-badge">Cover</span>
                          )}
                          <img src={p.url} alt={p.name} />

                          {/* Controls overlay */}
                          <div className="photo-controls">
                            <button type="button" title="Move left"
                              onClick={() => moveImage(idx, -1)}
                              disabled={idx === 0}
                              className="photo-ctrl-btn">‹</button>
                            <button type="button" title="Remove"
                              onClick={() => removeImage(idx)}
                              className="photo-ctrl-btn photo-ctrl-remove">✕</button>
                            <button type="button" title="Move right"
                              onClick={() => moveImage(idx, 1)}
                              disabled={idx === previews.length - 1}
                              className="photo-ctrl-btn">›</button>
                          </div>

                          {/* File info */}
                          <div className="photo-info">
                            {fmtSize(p.size)}
                          </div>
                        </div>
                      ))}

                      {/* "+ Add more" tile */}
                      <div
                        className="photo-add-more"
                        onClick={() => fileInputRef.current?.click()}
                        title="Add more photos"
                      >
                        <span style={{ fontSize: '1.6rem', color: 'var(--primary)' }}>+</span>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>Add more</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Product Name */}
                <div className="form-group">
                  <label>Product Name *</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                    required placeholder="e.g. Royal Silk Anarkali Suit" />
                </div>

                {/* Category */}
                <div className="form-group">
                  <label>Category *</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                {/* Price + Stock */}
                <div className="form-row-responsive">
                  <div className="form-group">
                    <label>Price (₹ / $)</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0.00" />
                  </div>
                  <div className="form-group">
                    <label>Stock Count</label>
                    <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="0" />
                  </div>
                </div>

                {/* Sizes */}
                <div className="form-group">
                  <label>Available Sizes</label>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL', '6XL'].map((size) => {
                      const sel = sizes.includes(size);
                      return (
                        <button key={size} type="button"
                          onClick={() => sel ? setSizes(sizes.filter((s) => s !== size)) : setSizes([...sizes, size])}
                          style={{
                            padding: '6px 12px', minHeight: '34px', borderRadius: '20px',
                            fontSize: '0.8rem', fontWeight: 700,
                            background: sel ? 'var(--primary)' : 'var(--bg-color)',
                            color: sel ? '#fff' : 'var(--text-color)',
                            border: sel ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                          }}>
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Custom fields */}
                <div className="form-group">
                  <label>Custom Specifications (Optional)</label>
                  {customFields.map((field, index) => (
                    <div key={index} className="custom-field-row"
                      style={{ display: 'flex', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                      <input type="text" placeholder="Key (Fabric/Care)" value={field.key}
                        onChange={(e) => { const f = [...customFields]; f[index].key = e.target.value; setCustomFields(f); }}
                        style={{ flex: '1 1 120px' }} />
                      <input type="text" placeholder="Value (Pure Cotton)" value={field.value}
                        onChange={(e) => { const f = [...customFields]; f[index].value = e.target.value; setCustomFields(f); }}
                        style={{ flex: '2 1 160px' }} />
                      <button type="button"
                        onClick={() => setCustomFields(customFields.filter((_, i) => i !== index))}
                        className="btn-danger" style={{ padding: '0 12px', minHeight: '40px' }}>✕</button>
                    </div>
                  ))}
                  <button type="button"
                    onClick={() => setCustomFields([...customFields, { key: '', value: '' }])}
                    className="btn-outline" style={{ alignSelf: 'flex-start', fontSize: '0.85rem', minHeight: '36px' }}>
                    + Add Specification Field
                  </button>
                </div>

                {/* Description */}
                <div className="form-group">
                  <label>Description *</label>
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                    required rows="3" placeholder="Describe craftsmanship, embroidery, dupatta, fit…" />
                </div>

                {/* Upload progress */}
                {uploadProgress && (
                  <div style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600, textAlign: 'center' }}>
                    ⏳ {uploadProgress}
                  </div>
                )}

                <button type="submit" className="btn-primary"
                  style={{ width: '100%', opacity: isUploading ? 0.7 : 1, padding: '0.9rem', fontSize: '1rem' }}
                  disabled={isUploading}>
                  {isUploading ? 'PUBLISHING…' : `PUBLISH PRODUCT ${previews.length > 0 ? `(${previews.length} photo${previews.length > 1 ? 's' : ''})` : ''}`}
                </button>

              </form>
            </div>
          </div>
        )}

        {/* ── CATALOG LIST ─────────────────────────────────────── */}
        {(mobileView === 'all' || mobileView === 'list') && (
          <div className="product-list-wrapper animate-fade-in-up">
            <div className="card" style={{ height: '100%' }}>
              <h3 className="card-title" style={{ marginBottom: '1.25rem' }}>
                Product Catalog ({products.length})
              </h3>

              {loading ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Loading products…</div>
              ) : products.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>No products in catalog yet.</div>
              ) : (
                <div className="grid">
                  {products.map((product) => {
                    const catName = categories.find((c) => c._id === product.category)?.name || 'General';
                    const photoCount = product.images?.length || 0;
                    return (
                      <div key={product._id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                        {/* Image area with photo count badge */}
                        <div style={{ position: 'relative', height: '220px', background: '#000' }}>
                          {photoCount > 0 ? (
                            <img src={product.images[0]} alt={product.name}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#666' }}>
                              No Image
                            </div>
                          )}
                          {/* Category badge */}
                          <span style={{
                            position: 'absolute', top: '10px', right: '10px',
                            background: 'var(--primary)', color: '#fff',
                            padding: '3px 10px', borderRadius: '12px',
                            fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase',
                          }}>{catName}</span>
                          {/* Photo count badge */}
                          {photoCount > 1 && (
                            <span style={{
                              position: 'absolute', bottom: '10px', left: '10px',
                              background: 'rgba(0,0,0,0.65)', color: '#fff',
                              padding: '3px 9px', borderRadius: '10px',
                              fontSize: '0.72rem', fontWeight: 600,
                            }}>🖼 {photoCount} photos</span>
                          )}
                        </div>

                        {/* Info */}
                        <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                          <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '4px', color: '#fff' }}>{product.name}</h4>
                          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'monospace', marginBottom: '8px' }}>
                            SKU: {product.sku}
                          </p>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', marginTop: 'auto' }}>
                            <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)' }}>₹{product.price || 0}</span>
                            <span style={{ fontSize: '0.8rem', background: 'var(--bg-color)', padding: '2px 8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                              Stock: {product.stock || 0}
                            </span>
                          </div>
                          <button className="btn-danger"
                            onClick={() => handleDeleteProduct(product._id)}
                            style={{ width: '100%', minHeight: '38px', fontSize: '0.85rem' }}>
                            🗑️ Delete Product
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── Styles ─────────────────────────────────────────────── */}
      <style>{`
        .product-layout-container { display: flex; gap: 1.5rem; align-items: flex-start; }
        .product-form-wrapper     { flex: 1 1 420px; min-width: 0; }
        .product-list-wrapper     { flex: 2 1 540px; min-width: 0; }
        .form-row-responsive      { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }

        /* Drop zone hover state */
        .drop-zone.dz-hover {
          border-color: var(--primary) !important;
          background: rgba(239,35,60,0.05) !important;
        }

        /* Photo preview grid */
        .photo-preview-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
          gap: 10px;
        }

        /* Each preview tile */
        .photo-preview-item {
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          aspect-ratio: 1;
          background: var(--bg-color);
          border: 1px solid var(--border-color);
        }
        .photo-preview-item img {
          width: 100%; height: 100%; object-fit: cover; display: block;
        }

        /* Cover badge */
        .cover-badge {
          position: absolute; top: 5px; left: 5px; z-index: 2;
          background: var(--primary); color: #fff;
          font-size: 0.65rem; font-weight: 700; padding: 2px 7px;
          border-radius: 8px; text-transform: uppercase;
        }

        /* Controls overlay on hover */
        .photo-controls {
          position: absolute; bottom: 0; left: 0; right: 0;
          background: rgba(0,0,0,0.6);
          display: flex; justify-content: center; align-items: center; gap: 4px;
          padding: 5px;
          opacity: 0; transition: opacity 0.2s;
        }
        .photo-preview-item:hover .photo-controls { opacity: 1; }

        .photo-ctrl-btn {
          background: rgba(255,255,255,0.2); border: none; color: #fff;
          width: 26px; height: 26px; border-radius: 50%;
          font-size: 1rem; line-height: 1; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.15s;
        }
        .photo-ctrl-btn:hover:not(:disabled) { background: rgba(255,255,255,0.45); }
        .photo-ctrl-btn:disabled { opacity: 0.3; cursor: not-allowed; }
        .photo-ctrl-remove:hover:not(:disabled) { background: rgba(239,35,60,0.8) !important; }

        /* File size label */
        .photo-info {
          position: absolute; top: 5px; right: 5px;
          background: rgba(0,0,0,0.55); color: #fff;
          font-size: 0.6rem; padding: 2px 6px; border-radius: 6px;
        }

        /* "+ Add more" tile */
        .photo-add-more {
          aspect-ratio: 1;
          border: 2px dashed var(--border-color);
          border-radius: 8px;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          cursor: pointer; transition: border-color 0.2s, background 0.2s;
        }
        .photo-add-more:hover {
          border-color: var(--primary);
          background: rgba(239,35,60,0.04);
        }

        @media (max-width: 900px) {
          .product-layout-container { flex-direction: column; }
          .product-form-wrapper, .product-list-wrapper { width: 100%; flex: none; }
        }
        @media (max-width: 600px) {
          .form-row-responsive { grid-template-columns: 1fr; gap: 0; }
          .photo-preview-grid  { grid-template-columns: repeat(auto-fill, minmax(80px, 1fr)); }
        }
      `}</style>
    </div>
  );
}

export default ProductManager;
