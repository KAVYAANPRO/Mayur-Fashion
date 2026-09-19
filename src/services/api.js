const API_URL = import.meta.env.VITE_API_URL || 'https://mayurfashionapi.vercel.app';

/**
 * Fetch all categories from the API.
 * Returns array of { _id, name, description }
 */
export async function fetchCategories() {
  const res = await fetch(`${API_URL}/api/categories`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

/**
 * Fetch all products from the API.
 * Optionally filter by category ObjectId.
 * Returns array of populated product documents.
 */
export async function fetchProducts(categoryId) {
  let url = `${API_URL}/api/products`;
  if (categoryId) {
    url += `?category=${categoryId}`;
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

/**
 * Track demand for a product (increment demandScore).
 */
export async function trackDemand(productId) {
  const res = await fetch(`${API_URL}/api/products/${productId}/track-demand`, {
    method: 'POST',
  });
  if (!res.ok) throw new Error('Failed to track demand');
  return res.json();
}

/**
 * Transform a MongoDB product document (with populated category)
 * into the shape the frontend components expect.
 */
export function transformProduct(apiProduct) {
  const categoryName = apiProduct.category?.name || 'Uncategorized';
  const categoryId = apiProduct.category?._id || apiProduct.category || '';

  // Extract custom fields into a lookup map for easy access
  const fields = {};
  if (apiProduct.customFields && apiProduct.customFields.length > 0) {
    apiProduct.customFields.forEach(f => {
      if (f.key) fields[f.key.toLowerCase().trim()] = f.value;
    });
  }

  // Build the product shape expected by ProductCard / ProductModal
  return {
    // Use MongoDB _id as the unique identifier
    id: apiProduct.sku || apiProduct._id,
    _id: apiProduct._id,
    title: apiProduct.name,
    category: categoryId,
    categoryLabel: categoryName,
    tagline: fields['tagline'] || apiProduct.description?.substring(0, 60) + '…',
    primaryImage: apiProduct.images?.[0] || '/assets/products/placeholder.webp',
    primaryImageJpg: apiProduct.images?.[0] || '/assets/products/placeholder.jpg',
    gallery: apiProduct.images || [],
    color: fields['color'] || 'Classic',
    colorHex: fields['color hex'] || fields['colorhex'] || '#8a7b6b',
    fabric: fields['fabric'] || 'Premium Fabric',
    bottomFabric: fields['bottom fabric'] || fields['bottomfabric'] || '',
    dupatta: fields['dupatta'] || '',
    work: fields['work'] || '',
    sizes: apiProduct.sizes && apiProduct.sizes.length > 0
      ? apiProduct.sizes
      : ["M (38)", "L (40)", "XL (42)", "XXL (44)", "3XL (46)", "4XL (48)", "5XL (50)", "6XL (52)"],
    moq: fields['moq'] || '1 Set',
    isNew: isRecentProduct(apiProduct.createdAt),
    isBestseller: (apiProduct.demandScore || 0) >= 5,
    description: apiProduct.description,
    price: apiProduct.price || 0,
    stock: apiProduct.stock || 0,
    features: extractFeatures(fields),
  };
}

/**
 * Check if a product was created within the last 30 days.
 */
function isRecentProduct(createdAt) {
  if (!createdAt) return false;
  const created = new Date(createdAt);
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  return created >= thirtyDaysAgo;
}

/**
 * Extract feature highlights from custom fields.
 */
function extractFeatures(fields) {
  const features = [];
  if (fields['features']) {
    // Support comma-separated features
    return fields['features'].split(',').map(f => f.trim()).filter(Boolean);
  }
  if (fields['fabric']) features.push(`${fields['fabric']} Fabric`);
  if (fields['work']) features.push(fields['work']);
  if (fields['dupatta']) features.push(fields['dupatta']);
  if (fields['bottom fabric'] || fields['bottomfabric']) features.push(fields['bottom fabric'] || fields['bottomfabric']);
  return features.length > 0 ? features : ['Premium Quality', 'Sizes M to 6XL'];
}

/**
 * Transform API categories into the shape used by the category filter ribbon.
 * Adds an "All Collections" entry at the start.
 */
export function transformCategories(apiCategories, products) {
  const allEntry = {
    id: 'all',
    label: 'All Collections',
    count: products.length,
    _id: 'all',
  };

  const mapped = apiCategories.map(cat => ({
    id: cat._id,
    _id: cat._id,
    label: cat.name,
    count: products.filter(p => {
      const pCatId = p.category?._id || p.category;
      return pCatId === cat._id;
    }).length,
  }));

  return [allEntry, ...mapped];
}
