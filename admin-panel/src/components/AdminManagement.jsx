import React, { useState, useEffect } from 'react';

function AdminManagement({ auth }) {
  const [admins, setAdmins] = useState([]);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

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
        setError(data.message);
      }
    } catch (err) {
      setError('Server error');
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
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2>Create Sub-Admin</h2>
        {message && <div style={{ color: 'var(--success)', marginBottom: '1rem' }}>{message}</div>}
        {error && <div style={{ color: 'var(--danger)', marginBottom: '1rem' }}>{error}</div>}
        
        <form onSubmit={handleCreateSubAdmin} style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr auto' }}>
          <input 
            type="text" 
            placeholder="Sub-admin Name" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            required 
          />
          <button type="submit" className="btn-primary">
            Create
          </button>
        </form>
      </div>

      <div className="card animate-fade-in-up delay-1">
        <h2>Admin List</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Name</th>
              <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Role</th>
              <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Created At</th>
              <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map(admin => (
              <tr key={admin._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '1rem' }}>{admin.name}</td>
                <td style={{ padding: '1rem', color: admin.role === 'master' ? 'var(--primary)' : 'inherit', fontWeight: admin.role === 'master' ? 'bold' : 'normal' }}>
                  {admin.role.toUpperCase()}
                </td>
                <td style={{ padding: '1rem' }}>{new Date(admin.createdAt).toLocaleDateString()}</td>
                <td style={{ padding: '1rem' }}>
                  {admin.role !== 'master' && (
                    <button 
                      onClick={() => handleDeleteAdmin(admin._id)}
                      className="btn-danger"
                      style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
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
  );
}

export default AdminManagement;
