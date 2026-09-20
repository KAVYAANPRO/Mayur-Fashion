import React, { useState } from 'react';

function CategoryManager({ categories, refreshCategories, auth }) {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDesc, setNewCategoryDesc] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': auth.token
        },
        body: JSON.stringify({ name: newCategoryName, description: newCategoryDesc }),
      });
      if (res.ok) {
        setNewCategoryName('');
        setNewCategoryDesc('');
        refreshCategories();
      } else {
        alert('Failed to add category');
      }
    } catch (err) {
      console.error(err);
      alert('Error creating category');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/categories/${id}`, {
        method: 'DELETE',
        headers: {
          'x-auth-token': auth.token
        }
      });
      if (res.ok) {
        refreshCategories();
      } else {
        alert('Failed to delete category');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card animate-fade-in-up">
      <h2 style={{ color: 'var(--primary)', marginBottom: '1.25rem' }}>Category Management</h2>
      
      <form onSubmit={handleAddCategory} className="category-form-responsive animate-fade-in-up delay-1">
        <div style={{ flex: '1 1 200px' }}>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase' }}>
            Category Name *
          </label>
          <input 
            type="text" 
            placeholder="e.g. 3-Piece Kurti Sets"
            value={newCategoryName} 
            onChange={(e) => setNewCategoryName(e.target.value)} 
            required 
          />
        </div>
        <div style={{ flex: '2 1 280px' }}>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase' }}>
            Description
          </label>
          <input 
            type="text" 
            placeholder="e.g. Designer Kurti with matching Pant & Dupatta"
            value={newCategoryDesc} 
            onChange={(e) => setNewCategoryDesc(e.target.value)} 
          />
        </div>
        <button type="submit" className="btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : '➕ Add Category'}
        </button>
      </form>

      <div className="grid">
        {categories.map((cat, index) => (
          <div 
            key={cat._id} 
            className={`card animate-fade-in-up delay-${Math.min((index % 4) + 1, 4)}`} 
            style={{ justifyContent: 'space-between', minHeight: '130px' }}
          >
            <div>
              <h3 className="card-title" style={{ color: '#ffffff', fontSize: '1.15rem', marginBottom: '4px' }}>{cat.name}</h3>
              <p className="card-subtitle" style={{ margin: 0 }}>{cat.description || 'No description provided'}</p>
            </div>
            <button 
              className="btn-danger"
              style={{ marginTop: '1rem', alignSelf: 'flex-start', fontSize: '0.82rem', padding: '0.5rem 1rem' }}
              onClick={() => handleDeleteCategory(cat._id)}
            >
              🗑️ Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryManager;
