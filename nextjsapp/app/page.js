'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import "./globals.css"
import { Toaster } from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roleId, setRoleId] = useState('');

  const handleLogin = () => {
    if (email && password && roleId) {
      sessionStorage.setItem('roleId', roleId);
      if (roleId === '5') {
        router.push('/admin');
      } else if (roleId === '6') {
        router.push('/station');
      }
    } else {
      alert('Please fill all fields');
    }
  };

  return (
    <div>
           <Toaster />
      <h1>Login</h1>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <select value={roleId} onChange={(e) => setRoleId(e.target.value)}>
        <option value="">Select Role</option>
        <option value="5">Admin</option>
        <option value="6">Station</option>
      </select>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
