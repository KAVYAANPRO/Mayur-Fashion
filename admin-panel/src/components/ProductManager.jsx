import React, { useState, useEffect } from 'react';

function ProductManager({ categories, auth }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileView, setMobileView] = useState('all'); // 'all', 'form', 'list'

  // Form states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [sizes, setSizes] = useState([]);
  const [customFields, setCustomFields] = useState([]);
  
  // Image state for file upload
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error('Failed to fetch products', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      alert("Please select an image to upload.");
      return;
    }
    
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('image', imageFile);

      const uploadRes = await fetch(`${import.meta.env.VITE_API_URL}/api/upload`, {
        method: 'POST',
        headers: {
          'x-auth-token': auth.token
        },
        body: formData,
      });

      if (!uploadRes.ok) {
        throw new Error('Image upload failed');
      }

      const uploadData = await uploadRes.json();
      const imageUrl = uploadData.imageUrl;
      const generatedSku = `PROD-${Date.now().toString().slice(-6)}`;

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': auth.token
        },
        body: JSON.stringify({
          name,
          description,
          price: price ? Number(price) : 0,
          sku: generatedSku,
          category,
          images: [imageUrl],
          stock: stock ? Number(stock) : 0,
          sizes,
          customFields
        }),
      });

      if (res.ok) {
        setName('');
        setDescription('');
        setPrice('');
        setCategory('');
        setStock('');
        setSizes([]);
        setCustomFields([]);
        setImageFile(null);
        setImagePreview('');
        fetchProducts();
        alert("Product created successfully!");
        setMobileView('list');
      } else {
        alert("Failed to add product.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred during product creation.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'x-auth-token': auth.token
        }
      });
      if (res.ok) {
        fetchProducts();
      } else {
        console.error('Failed to delete product');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="animate-fade-in-up" style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '10px' }}>
        <h2 style={{ margin: 0, color: 'var(--primary)' }}>Product Management</h2>

        {/* Mobile View Toggle Bar */}
        <div className="mobile-view-tabs" style={{ display: 'flex', gap: '6px' }}>
          <button 
            type="button"
            className={mobileView === 'all' || mobileView === 'form' ? 'btn-primary' : 'btn-outline'}
            onClick={() => setMobileView(mobileView === 'form' ? 'all' : 'form')}
            style={{ fontSize: '0.82rem', padding: '0.5rem 0.9rem', minHeight: '36px' }}
          >
            ➕ Add Product
          </button>
          <button 
            type="button"
            className={mobileView === 'all' || mobileView === 'list' ? 'btn-primary' : 'btn-outline'}
            onClick={() => setMobileView(mobileView === 'list' ? 'all' : 'list')}
            style={{ fontSize: '0.82rem', padding: '0.5rem 0.9rem', minHeight: '36px' }}
          >
            📦 Catalog ({products.length})
          </button>
        </div>
      </div>

      <div className="product-layout-container">
        {/* Form Section */}
        {(mobileView === 'all' || mobileView === 'form') && (
          <div className="product-form-wrapper animate-slide-in-left">
            <div className="card">
              <h3 className="card-title">Add New Product</h3>
              <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                
                {/* Image Upload Area */}
                <div>
                  <label style={{ display: 'block', width: '100%', cursor: 'pointer' }}>
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--border-color)' }} />
                    ) : (
                      <div style={{
                        width: '100%',
                        height: '160px',
                        border: '2px dashed var(--border-color)',
                        borderRadius: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'var(--bg-color)',
                        color: 'var(--text-muted)',
                        fontWeight: 600,
                        fontSize: '0.85rem'
                      }}>
                        <span style={{ fontSize: '1.8rem', marginBottom: '0.25rem', color: 'var(--primary)' }}>📷</span>
                        <span>Upload Product Image *</span>
                      </div>
                    )}
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageChange} 
                      style={{ display: 'none' }} 
                      required 
                    />
                  </label>
                </div>

                <div className="form-group">
                  <label>Product Name *</label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                    placeholder="e.g. Royal Silk Anarkali Suit"
                  />
                </div>

                <div className="form-group">
                  <label>Category *</label>
                  <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)} 
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-row-responsive">
                  <div className="form-group">
                    <label>Price (₹ / $)</label>
                    <input 
                      type="number" 
                      value={price} 
                      onChange={(e) => setPrice(e.target.value)} 
                      placeholder="0.00"
                    />
                  </div>
                  <div className="form-group">
                    <label>Stock Count</label>
                    <input 
                      type="number" 
                      value={stock} 
                      onChange={(e) => setStock(e.target.value)} 
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Available Sizes</label>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL', '6XL'].map(size => {
                      const isSelected = sizes.includes(size);
                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => {
                            if (isSelected) setSizes(sizes.filter(s => s !== size));
                            else setSizes([...sizes, size]);
                          }}
                          style={{
                            padding: '6px 12px',
                            minHeight: '34px',
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            background: isSelected ? 'var(--primary)' : 'var(--bg-color)',
                            color: isSelected ? '#ffffff' : 'var(--text-color)',
                            border: isSelected ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                          }}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="form-group">
                  <label>Custom Specifications (Optional)</label>
                  {customFields.map((field, index) => (
                    <div key={index} className="custom-field-row" style={{ display: 'flex', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                      <input 
                        type="text" 
                        placeholder="Key (Fabric/Care)" 
                        value={field.key} 
                        onChange={e => {
                          const newFields = [...customFields];
                          newFields[index].key = e.target.value;
                          setCustomFields(newFields);
                        }}
                        style={{ flex: '1 1 120px' }}
                      />
                      <input 
                        type="text" 
                        placeholder="Value (Pure Cotton)" 
                        value={field.value} 
                        onChange={e => {
                          const newFields = [...customFields];
                          newFields[index].value = e.target.value;
                          setCustomFields(newFields);
                        }}
                        style={{ flex: '2 1 160px' }}
                      />
                      <button 
                        type="button" 
                        onClick={() => setCustomFields(customFields.filter((_, i) => i !== index))}
                        className="btn-danger"
                        style={{ padding: '0 12px', minHeight: '40px' }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button 
                    type="button" 
                    onClick={() => setCustomFields([...customFields, { key: '', value: '' }])}
                    className="btn-outline"
                    style={{ alignSelf: 'flex-start', fontSize: '0.85rem', minHeight: '36px' }}
                  >
                    + Add Specification Field
                  </button>
                </div>

                <div className="form-group">
                  <label>Description *</label>
                  <textarea 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    required 
                    rows="3" 
                    placeholder="Describe craftsmanship, embroidery, dupatta, fit..."
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn-primary"
                  style={{ width: '100%', opacity: isUploading ? 0.7 : 1, padding: '0.9rem', fontSize: '1rem' }} 
                  disabled={isUploading}
                >
                  {isUploading ? 'UPLOADING PRODUCT...' : 'PUBLISH PRODUCT'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Catalog List Section */}
        {(mobileView === 'all' || mobileView === 'list') && (
          <div className="product-list-wrapper animate-fade-in-up">
            <div className="card" style={{ height: '100%' }}>
              <h3 className="card-title" style={{ marginBottom: '1.25rem' }}>Product Catalog ({products.length})</h3>
              
              {loading ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Loading products...</div>
              ) : products.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>No products in catalog yet.</div>
              ) : (
                <div className="grid">
                  {products.map(product => {
                    const catName = categories.find(c => c._id === product.category)?.name || 'General';
                    return (
                      <div key={product._id} className="card" style={{ padding: '0', overflow: 'hidden' }}>
                        <div style={{ position: 'relative', height: '220px', width: '100%', background: '#000' }}>
                          {product.images && product.images.length > 0 ? (
                            <img src={product.images[0]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#666' }}>
                              No Image
                            </div>
                          )}
                          <span style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            background: 'var(--primary)',
                            color: '#fff',
                            padding: '3px 10px',
                            borderRadius: '12px',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            textTransform: 'uppercase'
                          }}>
                            {catName}
                          </span>
                        </div>
                        <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                          <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '4px', color: '#fff' }}>{product.name}</h4>
                          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'monospace', marginBottom: '8px' }}>SKU: {product.sku}</p>
                          
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', marginTop: 'auto' }}>
                            <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)' }}>₹{product.price || 0}</span>
                            <span style={{ fontSize: '0.8rem', background: 'var(--bg-color)', padding: '2px 8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                              Stock: {product.stock || 0}
                            </span>
                          </div>

                          <button 
                            className="btn-danger"
                            onClick={() => handleDeleteProduct(product._id)}
                            style={{ width: '100%', minHeight: '38px', fontSize: '0.85rem' }}
                          >
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

      <style>{`
        .product-layout-container {
          display: flex;
          gap: 1.5rem;
          align-items: flex-start;
        }

        .product-form-wrapper {
          flex: 1 1 420px;
          min-width: 0;
        }

        .product-list-wrapper {
          flex: 2 1 540px;
          min-width: 0;
        }

        .form-row-responsive {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        @media (max-width: 900px) {
          .product-layout-container {
            flex-direction: column;
          }
          .product-form-wrapper, .product-list-wrapper {
            width: 100%;
            flex: none;
          }
        }

        @media (max-width: 600px) {
          .form-row-responsive {
            grid-template-columns: 1fr;
            gap: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default ProductManager;
