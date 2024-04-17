import React, { useState } from 'react';
import axios from 'axios';

function Login({ setUserRole }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (role) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', role);
      setUserRole(role);
      setError('');
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">Login</h2>
        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-4">
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="flex justify-around">
              <button
                type="button"
                className="w-1/2 py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none mr-2 focus:ring focus:ring-indigo-500"
                onClick={() => handleLogin('HR')}
              >
                Login as HR
              </button>
              <button
                type="button"
                className="w-1/2 py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500"
                onClick={() => handleLogin('Employee')}
              >
                Login as Employee
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
