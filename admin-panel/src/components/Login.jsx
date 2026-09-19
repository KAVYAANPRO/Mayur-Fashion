import React, { useState } from 'react';

function Login({ setAuth }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setAuth({ token: data.token, user: data.user });
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to login. Ensure backend is running.');
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-box animate-fade-in-up">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '2rem' }}>MAYUR FASHION</h2>
          <p style={{ color: 'var(--text-muted)' }}>Admin Portal</p>
        </div>
        
        {error && <div style={{ color: 'var(--danger)', marginBottom: '1.5rem', textAlign: 'center', padding: '0.75rem', border: '1px solid var(--danger)', borderRadius: '4px', backgroundColor: 'rgba(220, 53, 69, 0.1)' }}>{error}</div>}
        
        <form onSubmit={handleLogin} className="flex-col">
          <div className="form-group animate-slide-in-left delay-1">
            <label>Username</label>
            <input 
              type="text" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group animate-slide-in-left delay-2">
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn-primary animate-fade-in-up delay-3" style={{ marginTop: '1rem', width: '100%', padding: '1rem' }}>
            SECURE LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
