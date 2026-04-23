import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { HiCheckCircle } from 'react-icons/hi';

const Register = () => {
  const { register, loading } = useContext(AuthContext);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Invalid email format';
    if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await register(form);
      toast.success('Account created successfully! Redirecting...');
      setForm({ name: '', email: '', password: '' });
    } catch (error) {
      toast.error(error.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 shadow-lg">
            <HiCheckCircle className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white">Create Account</h1>
          <p className="mt-2 text-blue-100">Join our complaint management system</p>
        </div>

        {/* Card */}
        <div className="rounded-3xl bg-white p-8 shadow-2xl backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-900">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={`w-full rounded-2xl border-2 px-4 py-3 text-slate-900 placeholder-slate-400 transition focus:outline-none focus:ring-2 ${
                  errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-slate-200 focus:border-blue-500 focus:ring-blue-100'
                }`}
                placeholder="John Doe"
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>

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

            {/* Submit Button */}
            <button
              disabled={loading}
              type="submit"
              className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 font-semibold text-white shadow-lg transition hover:shadow-xl hover:from-blue-700 hover:to-blue-800 disabled:cursor-not-allowed disabled:from-slate-300 disabled:to-slate-300 disabled:shadow-none"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 border-t border-slate-200" />
            <p className="text-sm text-slate-500">or</p>
            <div className="flex-1 border-t border-slate-200" />
          </div>

          {/* Sign in Link */}
          <p className="text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700 underline">
              Sign in
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

export default Register;
