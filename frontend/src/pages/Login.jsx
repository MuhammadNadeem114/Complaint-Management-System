import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { HiLockClosed, HiEye, HiEyeOff } from 'react-icons/hi';

const Login = () => {
  const { login, loading } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 py-12 px-4 sm:px-6 lg:px-8 flex items-center">
      <div className="mx-auto w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent)] shadow-lg shadow-cyan-500/30">
            <HiLockClosed className="h-8 w-8 text-slate-950" />
          </div>
          <h1 className="text-4xl font-bold text-[var(--text)]">Welcome Back</h1>
          <p className="mt-2 text-[var(--muted)]">Sign in to your account</p>
        </div>

        {/* Card */}
        <div className="rounded-[2rem] bg-[var(--surface)]/95 p-8 shadow-surface border border-[var(--border)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-200">Email Address</label>
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
              <label className="mb-2 block text-sm font-semibold text-[var(--text)]">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className={`w-full rounded-2xl border-2 px-4 py-3 pr-12 text-[var(--text)] placeholder-slate-500 transition focus:outline-none focus:ring-2 ${
                    errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-[var(--border)] focus:border-[var(--accent)] focus:ring-[var(--accent-soft)]'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)] transition hover:text-[var(--text)]"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <HiEyeOff className="h-5 w-5" /> : <HiEye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
            </div>

            {/* Demo Credentials */}
            <div className="rounded-3xl bg-slate-900/80 p-4 text-sm text-slate-300 border border-slate-800">
              <p className="font-semibold mb-2 text-white">Demo Account:</p>
              <p>Email: admin@scms.local</p>
              <p>Password: Admin@123</p>
            </div>

            {/* Submit Button */}
            <button
              disabled={loading}
              type="submit"
              className="w-full rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3 font-semibold text-slate-950 shadow-xl shadow-cyan-500/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:from-slate-500 disabled:to-slate-500 disabled:shadow-none"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 border-t border-slate-800" />
            <p className="text-sm text-slate-400">or</p>
            <div className="flex-1 border-t border-slate-800" />
          </div>

          {/* Sign up Link */}
          <p className="text-center text-sm text-slate-400">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="font-semibold text-cyan-400 hover:text-cyan-300 underline">
              Create one
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-slate-500">
          Smart Complaint Management System © 2024
        </p>
      </div>
    </div>
  );
};

export default Login;
