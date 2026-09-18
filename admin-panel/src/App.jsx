import React, { useState, useEffect } from 'react';
import CategoryManager from './components/CategoryManager';
import ProductManager from './components/ProductManager';
import Login from './components/Login';
import AdminManagement from './components/AdminManagement';

function App() {
  const [auth, setAuth] = useState(null);
  const [activeTab, setActiveTab] = useState('products');
  const [categories, setCategories] = useState([]);
  
  const fetchCategories = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/categories');
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error('Failed to fetch categories', err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      setAuth({ token, user: JSON.parse(user) });
    }
    fetchCategories();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuth(null);
  };

  if (!auth) {
    return <Login setAuth={setAuth} />;
  }

  return (
    <div className="app-container">
      <header className="flex-row" style={{ justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ display: 'inline-block', marginRight: '1rem' }}>Mayur Fashion Admin</h1>
          <span style={{ fontSize: '0.9rem', color: '#666' }}>Logged in as <strong>{auth.user.name}</strong> ({auth.user.role})</span>
        </div>
        <div className="flex-row">
          <button 
            style={{ backgroundColor: activeTab === 'products' ? 'black' : 'white', color: activeTab === 'products' ? 'white' : 'black' }}
            onClick={() => setActiveTab('products')}
          >
            Products
          </button>
          <button 
            style={{ backgroundColor: activeTab === 'categories' ? 'black' : 'white', color: activeTab === 'categories' ? 'white' : 'black' }}
            onClick={() => setActiveTab('categories')}
          >
            Categories
          </button>
          {auth.user.role === 'master' && (
            <button 
              style={{ backgroundColor: activeTab === 'admins' ? 'black' : 'white', color: activeTab === 'admins' ? 'white' : 'black' }}
              onClick={() => setActiveTab('admins')}
            >
              Admins
            </button>
          )}
          <button 
            style={{ backgroundColor: '#dc3545', color: 'white', marginLeft: '1rem' }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>

      <main>
        {activeTab === 'categories' && <CategoryManager categories={categories} refreshCategories={fetchCategories} auth={auth} />}
        {activeTab === 'products' && <ProductManager categories={categories} auth={auth} />}
        {activeTab === 'admins' && auth.user.role === 'master' && <AdminManagement auth={auth} />}
      </main>
    </div>
  );
}

export default App;
