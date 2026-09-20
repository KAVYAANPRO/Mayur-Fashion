import React, { useState } from 'react';

function Login({ setAuth }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

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
        setError(data.message || 'Invalid username or password');
      }
    } catch (err) {
      setError('Failed to login. Ensure backend server is running.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-box animate-fade-in-up">
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <img 
            src="/assets/logo/mayur-official-brand-logo-white.png" 
            alt="Mayur Fashion" 
            style={{ 
              maxHeight: '60px', 
              maxWidth: '240px', 
              width: 'auto', 
              marginBottom: '1rem',
              filter: 'drop-shadow(0 4px 10px rgba(239,35,60,0.3))' 
            }}
          />
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 600 }}>
            Admin Management Portal
          </p>
        </div>
        
        {error && (
          <div style={{ 
            color: 'var(--danger)', 
            marginBottom: '1.25rem', 
            textAlign: 'center', 
            padding: '0.75rem', 
            border: '1px solid var(--danger)', 
            borderRadius: '6px', 
            backgroundColor: 'rgba(220, 53, 69, 0.12)',
            fontSize: '0.88rem'
          }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} className="flex-col">
          <div className="form-group animate-slide-in-left delay-1">
            <label>Username</label>
            <input 
              type="text" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required 
              placeholder="Enter admin username"
              autoCapitalize="none"
              autoCorrect="off"
            />
          </div>
          <div className="form-group animate-slide-in-left delay-2">
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
              placeholder="Enter password"
            />
          </div>
          <button 
            type="submit" 
            className="btn-primary animate-fade-in-up delay-3" 
            style={{ marginTop: '0.75rem', width: '100%', padding: '0.85rem' }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'AUTHENTICATING...' : 'SECURE LOGIN'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
