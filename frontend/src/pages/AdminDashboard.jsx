import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchAllComplaints, fetchStats, updateComplaint } from '../services/complaintService';
import DashboardLayout from '../components/DashboardLayout';
import DashboardCard from '../components/DashboardCard';
import Spinner from '../components/Spinner';
import ComplaintCard from '../components/ComplaintCard';
import { HiExclamationCircle } from 'react-icons/hi';

const statusOptions = ['Pending', 'In Progress', 'Resolved'];
const categoryOptions = ['All', 'Electricity', 'Water', 'Internet', 'Other'];

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [stats, setStats] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [complaintData, statData] = await Promise.all([fetchAllComplaints(), fetchStats()]);
      setComplaints(complaintData);
      setStats(statData);
    } catch (error) {
      setError('Unable to load admin dashboard');
      toast.error('Unable to load admin dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdate = async (complaint) => {
    const status = prompt('Enter new status: Pending, In Progress, Resolved', complaint.status);
    if (!status || !statusOptions.includes(status)) {
      toast.error('Invalid status');
      return;
    }
    try {
      await updateComplaint(complaint._id, { status });
      toast.success('Complaint status updated');
      loadData();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Update failed');
    }
  };

  const filtered = useMemo(
    () => complaints.filter((item) => {
      const statusMatch = selectedStatus === 'All' || item.status === selectedStatus;
      const categoryMatch = selectedCategory === 'All' || item.category === selectedCategory;
      return statusMatch && categoryMatch;
    }),
    [complaints, selectedStatus, selectedCategory]
  );

  if (loading) return (
    <DashboardLayout title="Admin dashboard" subtitle="Manage all complaints and monitor resolution metrics.">
      <Spinner />
    </DashboardLayout>
  );

  if (error) {
    return (
      <DashboardLayout title="Admin dashboard" subtitle="Manage all complaints and monitor resolution metrics.">
        <div className="rounded-3xl border border-red-200 bg-red-50 p-8 shadow-sm">
          <div className="flex items-start gap-4">
            <HiExclamationCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-red-900">{error}</p>
              <button
                onClick={loadData}
                className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const chartData = stats ? [
    { name: 'Pending', value: stats.pending },
    { name: 'In Progress', value: stats.inProgress },
    { name: 'Resolved', value: stats.resolved },
  ] : [];

  return (
    <DashboardLayout title="Admin dashboard" subtitle="Manage all complaints and monitor resolution metrics.">
      <div className="grid gap-6 lg:grid-cols-3">
          <DashboardCard title="Total complaints" value={stats?.total || 0} />
          <DashboardCard title="Pending" value={stats?.pending || 0} />
          <DashboardCard title="Resolved" value={stats?.resolved || 0} />
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.8fr_1fr]">
          <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)]/95 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
            <h2 className="text-xl font-semibold text-[var(--text)]">Complaint status summary</h2>
            <div className="mt-6 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.35)" />
                  <XAxis dataKey="name" stroke="rgba(226,232,240,0.9)" />
                  <YAxis stroke="rgba(226,232,240,0.9)" />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.96)', borderRadius: 16, border: '1px solid rgba(148,163,184,0.18)' }} labelStyle={{ color: '#e2e8f0' }} itemStyle={{ color: '#cbd5e1' }} />
                  <Bar dataKey="value" fill="#22d3ee" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)]/95 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
            <h2 className="text-xl font-semibold text-[var(--text)]">Filters</h2>
            <div className="mt-5 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-[var(--muted)]">Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3 text-[var(--text)] focus:border-[var(--accent)] focus:ring-[var(--accent-soft)] focus:outline-none transition"
                >
                  {['All', ...statusOptions].map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-[var(--muted)]">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3 text-[var(--text)] focus:border-[var(--accent)] focus:ring-[var(--accent-soft)] focus:outline-none transition"
                >
                  {categoryOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">All complaints</h2>
              <p className="text-sm text-slate-500">Filter by category or status and manage complaint progress.</p>
            </div>
            <p className="text-sm text-slate-500">Showing {filtered.length} of {complaints.length} complaints</p>
          </div>
          <div className="grid gap-5">
            {filtered.length === 0 ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-600 shadow-sm">
                No complaints match the selected filters.
              </div>
            ) : (
              filtered.map((complaint) => (
                <ComplaintCard key={complaint._id} complaint={complaint} onUpdate={handleUpdate} isAdmin />
              ))
            )}
          </div>
        </div>
      </DashboardLayout>
  );
};

export default AdminDashboard;
