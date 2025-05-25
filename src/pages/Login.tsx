import React, { useState } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { setCredentials } from '../redux/features/auth/authSlice';
import { useLoginMutation } from '../redux/features/auth/authApi';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Eye, EyeOff, User, Shield, LogIn } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Quick validation check before attempting login
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const response = await login({ email, password }).unwrap();
      dispatch(setCredentials(response.data));
      toast.success('Login successful! Redirecting to home...');
      
      // Give user time to see the success message
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err: any) {
      // Handle different error scenarios
      if (err?.status === 401) {
        toast.error('Invalid credentials. Please check your email and password.');
      } else if (err?.status === 500) {
        toast.error('Server error. Please try again later.');
      } else {
        toast.error('Something went wrong. Please try again.');
      }
      console.error('Login error:', err);
    }
  };

  const populateCredentials = (type: 'user' | 'admin') => {
    setIsAnimating(true);
    
    // Clear fields first for smooth animation
    setEmail('');
    setPassword('');
    
    // Populate with demo credentials after a brief delay
    setTimeout(() => {
      if (type === 'user') {
        setEmail('user@gmail.com');
        setPassword('123456');
      } else {
        setEmail('user@example.com');
        setPassword('password123');
      }
      setIsAnimating(false);
    }, 200);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-pink-500 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative w-full max-w-md p-8 space-y-6 bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl transform transition-all duration-500 hover:scale-[1.02]">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full animate-bounce">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="mt-2 text-gray-600">Sign in to continue to your account</p>
        </div>

        {/* Demo Credential Buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => populateCredentials('user')}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg hover:from-green-500 hover:to-green-700 transform transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
          >
            <User size={18} />
            <span className="font-medium">User Login</span>
          </button>
          <button
            type="button"
            onClick={() => populateCredentials('admin')}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-400 to-red-600 text-white rounded-lg hover:from-orange-500 hover:to-red-700 transform transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
          >
            <Shield size={18} />
            <span className="font-medium">Admin Login</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className={`transform transition-all duration-300 ${isAnimating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}`}>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 placeholder-gray-400"
              placeholder="Enter your email"
            />
          </div>

          <div className={`transform transition-all duration-300 ${isAnimating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}`}>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 pr-12 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 placeholder-gray-400"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600 transition-colors duration-200"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center cursor-pointer">
              <input type="checkbox" className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" />
              <span className="ml-2 text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-purple-600 hover:text-purple-800 transition-colors duration-200 font-medium">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full px-4 py-3 text-white font-semibold rounded-lg transform transition-all duration-200 ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-xl'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Signing in...</span>
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/register" className="font-semibold text-purple-600 hover:text-purple-800 transition-colors duration-200">
            Sign up
          </a>
        </div>
      </div>

      <ToastContainer 
        position="top-right" 
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

        
    </div>
  );
};

export default Login;