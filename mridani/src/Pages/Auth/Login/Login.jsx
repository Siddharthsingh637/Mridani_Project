import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { loginUser } from '../../../Service/API/auth';

const Login = ({ onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(formData);
      sessionStorage.setItem('authToken', data.token); // ✅ store token in cache (session)
      // window.open('/profile', '_blank'); // opens profile page in a new tab
      navigate('/'); // optionally navigate to home in current tab
          } catch (err) {
      setError('Invalid username or password.');
    }
  };  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-xl p-10 bg-white rounded-md shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose || (() => navigate(-1))}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
        >
          <X size={22} />
        </button>

        <h2 className="text-4xl font-normal text-center text-gray-900 mb-8 tracking-tight">
          LOGIN
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AB1D68]"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AB1D68]"
              required
            />
            <div className="text-right mt-2">
              <Link
                to="/forgot-password"
                className="text-sm text-red-900 font-medium hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          {error && <p className="text-sm text-red-500 -mt-2">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 font-semibold text-white bg-red-800 rounded-full hover:bg-red-750 transition"
          >
            LOGIN
          </button>
        </form>

        <div className="mt-6 text-sm text-center text-gray-600">
          Don’t have an account?{' '}
          <Link
            to="/signup"
            className="text-black font-semibold hover:underline hover:text-red-800"
          >
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
