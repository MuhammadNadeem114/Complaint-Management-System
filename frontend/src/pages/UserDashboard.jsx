import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import { createComplaint, fetchStats } from '../services/complaintService';
import DashboardLayout from '../components/DashboardLayout';
import DashboardCard from '../components/DashboardCard';
import ComplaintListSection from '../components/ComplaintListSection';
import Spinner from '../components/Spinner';
import { HiExclamationCircle } from 'react-icons/hi';

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({ title: '', description: '', category: 'Electricity', priority: 'Medium' });
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statsError, setStatsError] = useState(null);

  const loadStats = async () => {
    setStatsError(null);
    try {
      const data = await fetchStats();
      setStats(data);
    } catch (error) {
      setStatsError('Unable to load dashboard stats');
      toast.error('Unable to load dashboard stats');
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await createComplaint(form);
      if (response.emailSent) {
        toast.success('Complaint submitted successfully and email sent');
      } else {
        toast.warn(response.message || 'Complaint submitted, but email failed to send');
      }
      setForm({ title: '', description: '', category: 'Electricity', priority: 'Medium' });
      await loadStats();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title={`Welcome back, ${user?.name}`} subtitle="Submit new complaints and monitor existing requests.">
      <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Submit a complaint</h2>
            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Title</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition"
                  placeholder="Issue title"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 min-h-[140px] focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition"
                  placeholder="Describe the problem in detail"
                  required
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition"
                  >
                    <option>Electricity</option>
                    <option>Water</option>
                    <option>Internet</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Priority</label>
                  <select
                    value={form.priority}
                    onChange={(e) => setForm({ ...form, priority: e.target.value })}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-white font-semibold shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-800 disabled:cursor-not-allowed disabled:from-slate-300 disabled:to-slate-300 disabled:shadow-none transition"
              >
                {loading ? 'Submitting...' : 'Submit complaint'}
              </button>
            </form>
          </div>

          <div className="space-y-4">
            {statsError ? (
              <div className="rounded-3xl border border-red-200 bg-red-50 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <HiExclamationCircle className="h-5 w-5 text-red-600" />
                  <p className="text-sm font-semibold text-red-900">{statsError}</p>
                </div>
                <button
                  onClick={loadStats}
                  className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition"
                >
                  Try Again
                </button>
              </div>
            ) : stats ? (
              <> 
                <DashboardCard title="Total complaints" value={stats.total || 0} />
                <DashboardCard title="Pending" value={stats.pending || 0} />
                <DashboardCard title="Resolved" value={stats.resolved || 0} />
              </>
            ) : (
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <Spinner />
              </div>
            )}
          </div>
        </div>

        <div className="mt-10">
          <ComplaintListSection />
        </div>
      </DashboardLayout>
  );
};

export default UserDashboard;
