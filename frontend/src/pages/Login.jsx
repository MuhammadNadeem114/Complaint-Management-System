import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { HiLockClosed } from 'react-icons/hi';

const Login = () => {
  const { login, loading } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!form.email.trim()) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Invalid email format';
    if (!form.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await login(form);
      toast.success('Logged in successfully');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-12 px-4 sm:px-6 lg:px-8 flex items-center">
      <div className="mx-auto w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 shadow-lg">
            <HiLockClosed className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white">Welcome Back</h1>
          <p className="mt-2 text-blue-100">Sign in to your account</p>
        </div>

        {/* Card */}
        <div className="rounded-3xl bg-white p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-900">Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={`w-full rounded-2xl border-2 px-4 py-3 text-slate-900 placeholder-slate-400 transition focus:outline-none focus:ring-2 ${
                  errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-slate-200 focus:border-blue-500 focus:ring-blue-100'
                }`}
                placeholder="you@example.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-900">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className={`w-full rounded-2xl border-2 px-4 py-3 text-slate-900 placeholder-slate-400 transition focus:outline-none focus:ring-2 ${
                  errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-slate-200 focus:border-blue-500 focus:ring-blue-100'
                }`}
                placeholder="••••••••"
              />
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
            </div>

            {/* Demo Credentials */}
            <div className="rounded-2xl bg-blue-50 p-3 text-xs text-blue-700 border border-blue-200">
              <p className="font-semibold mb-2">Demo Account:</p>
              <p>Email: admin@scms.local</p>
              <p>Password: Admin@123</p>
            </div>

            {/* Submit Button */}
            <button
              disabled={loading}
              type="submit"
              className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 font-semibold text-white shadow-lg transition hover:shadow-xl hover:from-blue-700 hover:to-blue-800 disabled:cursor-not-allowed disabled:from-slate-300 disabled:to-slate-300 disabled:shadow-none"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 border-t border-slate-200" />
            <p className="text-sm text-slate-500">or</p>
            <div className="flex-1 border-t border-slate-200" />
          </div>

          {/* Sign up Link */}
          <p className="text-center text-sm text-slate-600">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-700 underline">
              Create one
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-blue-100">
          Smart Complaint Management System © 2024
        </p>
      </div>
    </div>
  );
};

export default Login;
