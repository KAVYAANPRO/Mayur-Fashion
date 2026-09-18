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
    <div className="card">
      <h2>Categories</h2>
      
      <form onSubmit={handleAddCategory} className="form-group flex-row" style={{ alignItems: 'flex-end', marginBottom: '2rem' }}>
        <div style={{ flex: 1 }}>
          <label>Category Name</label>
          <input 
            type="text" 
            value={newCategoryName} 
            onChange={(e) => setNewCategoryName(e.target.value)} 
            required 
          />
        </div>
        <div style={{ flex: 2 }}>
          <label>Description</label>
          <input 
            type="text" 
            value={newCategoryDesc} 
            onChange={(e) => setNewCategoryDesc(e.target.value)} 
          />
        </div>
        <button type="submit">Add Category</button>
      </form>

      <div className="grid">
        {categories.map((cat) => (
          <div key={cat._id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3>{cat.name}</h3>
              <p>{cat.description}</p>
            </div>
            <button 
              style={{ marginTop: '1rem', backgroundColor: 'transparent', color: 'black' }}
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
