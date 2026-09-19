import React, { useState } from 'react';

function CategoryManager({ categories, refreshCategories, auth }) {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDesc, setNewCategoryDesc] = useState('');

  const handleAddCategory = async (e) => {
    e.preventDefault();
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
        console.error('Failed to add category');
      }
    } catch (err) {
      console.error(err);
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
        console.error('Failed to delete category');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card animate-fade-in-up">
      <h2>Categories</h2>
      
      <form onSubmit={handleAddCategory} className="form-group flex-row animate-fade-in-up delay-1" style={{ alignItems: 'flex-end', marginBottom: '2rem' }}>
        <div style={{ flex: 1 }}>
          <label>Category Name</label>
          <input 
            type="text" 
            value={newCategoryName} 
            onChange={(e) => setNewCategoryName(e.target.value)} 
            required 
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ flex: 2 }}>
          <label>Description</label>
          <input 
            type="text" 
            value={newCategoryDesc} 
            onChange={(e) => setNewCategoryDesc(e.target.value)} 
            style={{ width: '100%' }}
          />
        </div>
        <button type="submit" className="btn-primary">Add Category</button>
      </form>

      <div className="grid">
        {categories.map((cat, index) => (
          <div key={cat._id} className={`card animate-fade-in-up delay-${Math.min(index % 4 + 1, 4)}`} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3 className="card-title" style={{ color: 'var(--text-color)' }}>{cat.name}</h3>
              <p className="card-subtitle">{cat.description}</p>
            </div>
            <button 
              className="btn-danger"
              style={{ marginTop: '1rem', width: 'fit-content' }}
              onClick={() => handleDeleteCategory(cat._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryManager;
