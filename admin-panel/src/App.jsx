import React, { useState, useEffect } from 'react';
import CategoryManager from './components/CategoryManager';
import ProductManager from './components/ProductManager';
import Login from './components/Login';
import AdminManagement from './components/AdminManagement';
import VideoSettings from './components/VideoSettings';

function App() {
  const [auth, setAuth] = useState(null);
  const [activeTab, setActiveTab] = useState('products');
  const [categories, setCategories] = useState([]);
  
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/categories`);
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
      <header className="animate-fade-in-up">
        <div className="admin-header-row">
          <div className="admin-brand">
            <img 
              src="/assets/logo/mayur-official-brand-logo-white.png" 
              alt="Mayur Fashion" 
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div>
              <h1 style={{ color: 'var(--primary)', margin: 0, lineHeight: 1.2 }}>Mayur Admin Portal</h1>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                User: <strong style={{ color: 'var(--text-color)' }}>{auth.user.name}</strong> ({auth.user.role})
              </span>
            </div>
          </div>

          <div className="admin-nav-tabs">
            <button 
              className={activeTab === 'products' ? 'btn-primary' : 'btn-outline'}
              onClick={() => setActiveTab('products')}
            >
              📦 Products
            </button>
            <button 
              className={activeTab === 'categories' ? 'btn-primary' : 'btn-outline'}
              onClick={() => setActiveTab('categories')}
            >
              🏷️ Categories
            </button>
            <button
              className={activeTab === 'video' ? 'btn-primary' : 'btn-outline'}
              onClick={() => setActiveTab('video')}
            >
              🎬 Company Video
            </button>
            {auth.user.role === 'master' && (
              <button 
                className={activeTab === 'admins' ? 'btn-primary' : 'btn-outline'}
                onClick={() => setActiveTab('admins')}
              >
                👥 Admins
              </button>
            )}
            <button 
              className="btn-danger"
              onClick={handleLogout}
              title="Logout from admin session"
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </header>

      <main>
        {activeTab === 'categories' && <CategoryManager categories={categories} refreshCategories={fetchCategories} auth={auth} />}
        {activeTab === 'products' && <ProductManager categories={categories} auth={auth} />}
        {activeTab === 'video' && <VideoSettings auth={auth} />}
        {activeTab === 'admins' && auth.user.role === 'master' && <AdminManagement auth={auth} />}
      </main>
    </div>
  );
}

export default App;
