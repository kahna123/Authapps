'use client'; 
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roleId, setRoleId] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    // Here, you should add validation and authentication logic
    sessionStorage.setItem('roleId', roleId);
    if (roleId == 5) {
      router.push('/admin');
    } else if (roleId == 6) {
      router.push('/station');
    }
  };

  return (
<form
  onSubmit={handleLogin}
  className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4"
>
  <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
    <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Login</h1>
    
    <label className="block mb-5">
      <span className="text-sm font-medium text-gray-700">Email:</span>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full mt-2 px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </label>

    <label className="block mb-5">
      <span className="text-sm font-medium text-gray-700">Password:</span>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full mt-2 px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </label>

    <label className="block mb-6">
      <span className="text-sm font-medium text-gray-700">Role ID:</span>
      <select
        value={roleId}
        onChange={(e) => setRoleId(e.target.value)}
        required
        className="w-full mt-2 px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" disabled>Select role</option>
        <option value="5">Admin</option>
        <option value="6">Station</option>
      </select>
    </label>

    <button
      type="submit"
      className="w-full px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      Login
    </button>
  </div>
</form>


  );
}
