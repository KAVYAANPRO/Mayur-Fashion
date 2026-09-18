import React, { useState } from 'react';

function Login({ setAuth }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f9f9f9' }}>
      <div style={{ padding: '2rem', backgroundColor: 'white', border: '2px solid black', width: '400px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', fontWeight: 800 }}>Admin Login</h2>
        {error && <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Username</label>
            <input 
              type="text" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required 
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc' }} 
            />
          </div>
          <div>
            <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc' }} 
            />
          </div>
          <button type="submit" style={{ padding: '1rem', backgroundColor: 'black', color: 'white', fontWeight: 800, cursor: 'pointer', marginTop: '1rem' }}>LOGIN</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
