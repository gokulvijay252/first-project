import React, { useState } from 'react';
import { loginUser } from '../services/authService';
import { saveToken } from '../utils/tokenUtils';
import { Link } from 'react-router-dom';

// ✅ Toastify imports
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await loginUser(email, password);
      saveToken(res.token);

      // ✅ Show success toast (no timer, no close buton)
      toast.success('Login Successful...!');
    } catch (err: any) {
      setError(err.message);

      toast.error(err.message || 'Login Failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 w-full rounded hover:bg-blue-700"
        >
          Login
        </button>

        <div className="text-center mt-4 text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </div>
      </form>

      {/* ✅ Toast container with custom config */}
      <ToastContainer
        autoClose={false}
        closeButton={false}
        position="bottom-right"
        pauseOnHover={false}
        draggable={false}
      />
    </div>
  );
};

export default Login;
