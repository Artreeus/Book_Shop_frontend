import React, { useState } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { setCredentials } from '../redux/features/auth/authSlice';
import { useLoginMutation } from '../redux/features/auth/authApi';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await login({ email, password }).unwrap();
      dispatch(setCredentials(response.data));
      toast.success('Login successful...Redirecting to the Home page!!'); // Success toast
      setTimeout(() => navigate('/'), 1500);
    } catch (err: any) {
      if (err?.status === 401) {
        toast.error('Invalid login credentials. Please try again.'); // Specific error
      } else {
        toast.error('Failed to login. Please try later.'); // General error
      }
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen hero hero2 hero3">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-4xl font-bold text-center text-[#393280]">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#393280]">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border border-[#393280] rounded-lg focus:outline-none focus:ring"
              placeholder="Enter your email"
            />
          </div>
          <div>
      <label className="block text-sm font-medium text-[#393280]">Password</label>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 mt-2 border border-[#393280] rounded-lg focus:outline-none focus:ring"
          placeholder="Enter your password"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#393280]"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 text-white bg-[#393280] rounded-lg hover:bg-[#ED553B] disabled:bg-gray-400 transition-colors duration-300"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Login;
