import React, { useState, useEffect } from 'react';

function ProductManager({ categories, auth }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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
      // Create local preview URL
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
      // 1. Upload the image first
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

      // 2. Generate SKU
      const generatedSku = `PROD-${Date.now().toString().slice(-6)}`;

      // 3. Create the product
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': auth.token
        },
        body: JSON.stringify({
          name,
          description,
          price: price ? Number(price) : 0, // Optional
          sku: generatedSku,
          category,
          images: [imageUrl],
          stock: stock ? Number(stock) : 0, // Optional
          sizes,
          customFields
        }),
      });

      if (res.ok) {
        // Reset form
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
      } else {
        console.error('Failed to add product');
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
    <div style={styles.container}>
      <h2 style={styles.heading}>Product Management</h2>
      
      <div style={styles.contentLayout}>
        <div style={styles.formSection}>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Add New Product</h3>
            <form onSubmit={handleAddProduct} style={styles.form}>
              
              <div style={styles.imageUploadSection}>
                <label style={styles.imageLabel}>
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" style={styles.imagePreview} />
                  ) : (
                    <div style={styles.imagePlaceholder}>
                      <span style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>+</span>
                      <span>Upload Image (Mandatory)</span>
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

              <div style={styles.inputGroup}>
                <label style={styles.label}>Product Name *</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                  style={styles.input} 
                  placeholder="Enter product name"
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Category *</label>
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)} 
                  required 
                  style={styles.select}
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div style={styles.inputRow}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Price (Optional)</label>
                  <input 
                    type="number" 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)} 
                    style={styles.input} 
                    placeholder="0.00"
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Stock (Optional)</label>
                  <input 
                    type="number" 
                    value={stock} 
                    onChange={(e) => setStock(e.target.value)} 
                    style={styles.input} 
                    placeholder="0"
                  />
                </div>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Sizes (Optional)</label>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                    <label key={size} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input 
                        type="checkbox"
                        checked={sizes.includes(size)}
                        onChange={(e) => {
                          if (e.target.checked) setSizes([...sizes, size]);
                          else setSizes(sizes.filter(s => s !== size));
                        }}
                      />
                      {size}
                    </label>
                  ))}
                </div>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Custom Fields (Optional)</label>
                {customFields.map((field, index) => (
                  <div key={index} style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
                    <input 
                      type="text" 
                      placeholder="Key (e.g. Wash Care)" 
                      value={field.key} 
                      onChange={e => {
                        const newFields = [...customFields];
                        newFields[index].key = e.target.value;
                        setCustomFields(newFields);
                      }}
                      style={{...styles.input, flex: 1}}
                    />
                    <input 
                      type="text" 
                      placeholder="Value (e.g. Dry Clean Only)" 
                      value={field.value} 
                      onChange={e => {
                        const newFields = [...customFields];
                        newFields[index].value = e.target.value;
                        setCustomFields(newFields);
                      }}
                      style={{...styles.input, flex: 2}}
                    />
                    <button 
                      type="button" 
                      onClick={() => setCustomFields(customFields.filter((_, i) => i !== index))}
                      style={{ padding: '0.5rem', backgroundColor: '#dc3545', color: 'white', border: 'none' }}
                    >
                      X
                    </button>
                  </div>
                ))}
                <button 
                  type="button" 
                  onClick={() => setCustomFields([...customFields, { key: '', value: '' }])}
                  style={{ padding: '0.5rem 1rem', backgroundColor: '#eee', border: '1px solid #ccc', cursor: 'pointer', alignSelf: 'flex-start' }}
                >
                  + Add Custom Field
                </button>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Description *</label>
                <textarea 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  required 
                  rows="3" 
                  style={styles.textarea}
                  placeholder="Describe the product..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                style={{...styles.submitButton, opacity: isUploading ? 0.7 : 1}} 
                disabled={isUploading}
              >
                {isUploading ? 'Uploading...' : 'Create Product'}
              </button>
            </form>
          </div>
        </div>

        <div style={styles.listSection}>
          <h3 style={{...styles.cardTitle, marginBottom: '1.5rem'}}>Product Catalog</h3>
          {loading ? (
            <div style={styles.loading}>Loading catalog...</div>
          ) : (
            <div style={styles.grid}>
              {products.map(product => {
                const catName = categories.find(c => c._id === product.category)?.name || 'Unknown';
                return (
                  <div key={product._id} style={styles.productCard}>
                    {product.images && product.images.length > 0 ? (
                      <div style={styles.productImageContainer}>
                         <img src={product.images[0]} alt={product.name} style={styles.productImage} />
                         <span style={styles.categoryBadge}>{catName}</span>
                      </div>
                    ) : (
                      <div style={{...styles.productImageContainer, backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        No Image
                      </div>
                    )}
                    <div style={styles.productDetails}>
                      <h4 style={styles.productName}>{product.name}</h4>
                      <p style={styles.productSku}>SKU: {product.sku}</p>
                      
                      <div style={{ fontSize: '0.75rem', color: '#555', marginBottom: '1rem' }}>
                        <div>Uploaded by: {product.createdBy ? product.createdBy.name : 'System'}</div>
                        <div>Last updated by: {product.lastModifiedBy ? product.lastModifiedBy.name : 'System'}</div>
                      </div>

                      <div style={styles.productMetaRow}>
                        <span style={styles.productPrice}>${product.price}</span>
                        <span style={styles.productStock}>Stock: {product.stock}</span>
                      </div>
                      
                      <button 
                        style={styles.deleteButton}
                        onClick={() => handleDeleteProduct(product._id)}
                      >
                        Delete Item
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '1400px',
    margin: '0 auto',
    fontFamily: '"Inter", "Segoe UI", Roboto, sans-serif',
    color: '#000',
  },
  heading: {
    fontSize: '2.5rem',
    fontWeight: '800',
    marginBottom: '2rem',
    textTransform: 'uppercase',
    letterSpacing: '-1px',
    borderBottom: '4px solid #000',
    paddingBottom: '0.5rem',
    display: 'inline-block',
  },
  contentLayout: {
    display: 'flex',
    gap: '3rem',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  formSection: {
    flex: '1 1 400px',
  },
  listSection: {
    flex: '2 1 600px',
  },
  card: {
    backgroundColor: '#fff',
    border: '2px solid #000',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '8px 8px 0px #000',
  },
  cardTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    marginBottom: '1.5rem',
    textTransform: 'uppercase',
    borderBottom: '2px solid #000',
    paddingBottom: '0.5rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  inputRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  },
  label: {
    fontWeight: '600',
    fontSize: '0.9rem',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  input: {
    padding: '0.75rem',
    border: '2px solid #000',
    borderRadius: '6px',
    fontSize: '1rem',
    outline: 'none',
    transition: 'all 0.2s ease',
  },
  select: {
    padding: '0.75rem',
    border: '2px solid #000',
    borderRadius: '6px',
    fontSize: '1rem',
    outline: 'none',
    backgroundColor: '#fff',
    cursor: 'pointer',
  },
  textarea: {
    padding: '0.75rem',
    border: '2px solid #000',
    borderRadius: '6px',
    fontSize: '1rem',
    outline: 'none',
    resize: 'vertical',
  },
  imageUploadSection: {
    width: '100%',
    marginBottom: '0.5rem',
  },
  imageLabel: {
    display: 'block',
    width: '100%',
    cursor: 'pointer',
  },
  imagePlaceholder: {
    width: '100%',
    height: '200px',
    border: '2px dashed #000',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fafafa',
    transition: 'background-color 0.2s',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontSize: '0.85rem',
  },
  imagePreview: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    border: '2px solid #000',
    borderRadius: '8px',
  },
  submitButton: {
    padding: '1rem',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    cursor: 'pointer',
    marginTop: '1rem',
    transition: 'transform 0.1s',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '2rem',
  },
  productCard: {
    backgroundColor: '#fff',
    border: '2px solid #000',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '6px 6px 0px #000',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s ease',
  },
  productImageContainer: {
    position: 'relative',
    height: '240px',
    width: '100%',
    borderBottom: '2px solid #000',
  },
  productImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  categoryBadge: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    backgroundColor: '#000',
    color: '#fff',
    padding: '0.25rem 0.75rem',
    borderRadius: '99px',
    fontSize: '0.75rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    border: '1px solid #fff',
  },
  productDetails: {
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  productName: {
    fontSize: '1.25rem',
    fontWeight: '800',
    marginBottom: '0.25rem',
    margin: 0,
  },
  productSku: {
    fontSize: '0.75rem',
    color: '#666',
    marginBottom: '1rem',
    fontFamily: 'monospace',
  },
  productMetaRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
    marginTop: 'auto',
  },
  productPrice: {
    fontSize: '1.25rem',
    fontWeight: '800',
  },
  productStock: {
    fontSize: '0.85rem',
    fontWeight: '600',
    padding: '0.25rem 0.5rem',
    backgroundColor: '#f0f0f0',
    borderRadius: '4px',
    border: '1px solid #000',
  },
  deleteButton: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: 'transparent',
    color: '#000',
    border: '2px solid #000',
    borderRadius: '6px',
    fontWeight: '700',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  loading: {
    fontSize: '1.2rem',
    fontWeight: '600',
    textAlign: 'center',
    padding: '3rem',
  }
};

export default ProductManager;
