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
    <div style={{ padding: '2rem' }}>
      <div style={{ border: '2px solid black', padding: '2rem', marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1.5rem', fontWeight: 800 }}>Create Sub-Admin</h2>
        {message && <div style={{ color: 'green', marginBottom: '1rem' }}>{message}</div>}
        {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
        
        <form onSubmit={handleCreateSubAdmin} style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr auto' }}>
          <input 
            type="text" 
            placeholder="Sub-admin Name" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            required 
            style={{ padding: '0.75rem', border: '1px solid black' }}
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            required 
            style={{ padding: '0.75rem', border: '1px solid black' }}
          />
          <button type="submit" style={{ backgroundColor: 'black', color: 'white', padding: '0.75rem 2rem', fontWeight: 'bold' }}>
            Create
          </button>
        </form>
      </div>

      <div style={{ border: '2px solid black', padding: '2rem' }}>
        <h2 style={{ marginBottom: '1.5rem', fontWeight: 800 }}>Admin List</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid black' }}>
              <th style={{ padding: '1rem' }}>Name</th>
              <th style={{ padding: '1rem' }}>Role</th>
              <th style={{ padding: '1rem' }}>Created At</th>
              <th style={{ padding: '1rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map(admin => (
              <tr key={admin._id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '1rem' }}>{admin.name}</td>
                <td style={{ padding: '1rem', fontWeight: admin.role === 'master' ? 'bold' : 'normal' }}>
                  {admin.role.toUpperCase()}
                </td>
                <td style={{ padding: '1rem' }}>{new Date(admin.createdAt).toLocaleDateString()}</td>
                <td style={{ padding: '1rem' }}>
                  {admin.role !== 'master' && (
                    <button 
                      onClick={() => handleDeleteAdmin(admin._id)}
                      style={{ padding: '0.5rem 1rem', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
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
