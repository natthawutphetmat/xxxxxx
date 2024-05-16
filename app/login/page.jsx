// app/login.page.js
"use client";

import { redirect } from 'next/navigation';
import React, { useState, useEffect } from 'react';


export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [loginadmin, setLoginadmin] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === 'admin' && password === '1234') {
      localStorage.setItem('isLoggedIn', 'admin');
    
      setLoginadmin('admin')

    } else {
      setLoginError(true);
      console.log*('ok')
    }
  };
 if(loginadmin === 'admin') {
 window.location.href="/"

 }

  return (
    <div style={{ padding: '20px', maxWidth: '300px', margin: '0 auto' }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
          style={{ margin: '10px 0', display: 'block', width: '100%' }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          style={{ margin: '10px 0', display: 'block', width: '100%' }}
        />
        <button type="submit" style={{ width: '100%', padding: '10px' }}>Log In</button>
        {loginError && <p style={{ color: 'red' }}>Invalid username or password!</p>}
      </form>
    </div>
  );
}
