import React, { useState, useEffect } from 'react';

function AdminManagement({ auth }) {
  const [admins, setAdmins] = useState([]);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchAdmins = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/admins`, {
        headers: { 'x-auth-token': auth.token }
      });
      const data = await res.json();
      if (res.ok) setAdmins(data);
    } catch (err) {
      console.error('Failed to fetch admins');
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleCreateSubAdmin = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setIsSubmitting(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/create-subadmin`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-auth-token': auth.token
        },
        body: JSON.stringify({ name, password })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Sub-admin created successfully');
        setName('');
        setPassword('');
        fetchAdmins();
      } else {
        setError(data.message || 'Failed to create sub-admin');
      }
    } catch (err) {
      setError('Server connection error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAdmin = async (id) => {
    if (!window.confirm('Are you sure you want to remove this admin?')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/admins/${id}`, {
        method: 'DELETE',
        headers: { 'x-auth-token': auth.token }
      });
      const data = await res.json();
      if (res.ok) {
        fetchAdmins();
      } else {
        setError(data.message || 'Failed to remove admin');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <div className="animate-fade-in-up">
      <div className="card" style={{ marginBottom: '1.75rem' }}>
        <h2 style={{ color: 'var(--primary)' }}>Create Sub-Admin</h2>
        {message && <div style={{ color: 'var(--success)', marginBottom: '1rem', fontSize: '0.9rem', fontWeight: 600 }}>✅ {message}</div>}
        {error && <div style={{ color: 'var(--danger)', marginBottom: '1rem', fontSize: '0.9rem', fontWeight: 600 }}>⚠️ {error}</div>}
        
        <form onSubmit={handleCreateSubAdmin} className="category-form-responsive">
          <div style={{ flex: '1 1 200px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase' }}>
              Sub-Admin Name *
            </label>
            <input 
              type="text" 
              placeholder="e.g. manager1" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required 
            />
          </div>
          <div style={{ flex: '1 1 200px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase' }}>
              Password *
            </label>
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : '➕ Create Admin'}
          </button>
        </form>
      </div>

      <div className="card animate-fade-in-up delay-1">
        <h2 style={{ color: '#ffffff', marginBottom: '1rem' }}>Registered Admins ({admins.length})</h2>
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Admin Name</th>
                <th>Role</th>
                <th>Created Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map(admin => (
                <tr key={admin._id}>
                  <td>
                    <strong>{admin.name}</strong>
                  </td>
                  <td>
                    <span style={{ 
                      padding: '3px 8px', 
                      borderRadius: '4px', 
                      fontSize: '0.75rem', 
                      fontWeight: 700, 
                      background: admin.role === 'master' ? 'rgba(239,35,60,0.15)' : 'rgba(255,255,255,0.1)',
                      color: admin.role === 'master' ? 'var(--primary)' : 'var(--text-muted)'
                    }}>
                      {admin.role.toUpperCase()}
                    </span>
                  </td>
                  <td>{new Date(admin.createdAt).toLocaleDateString()}</td>
                  <td>
                    {admin.role !== 'master' && (
                      <button 
                        onClick={() => handleDeleteAdmin(admin._id)}
                        className="btn-danger"
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.82rem', minHeight: '34px' }}
                      >
                        Remove
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminManagement;
