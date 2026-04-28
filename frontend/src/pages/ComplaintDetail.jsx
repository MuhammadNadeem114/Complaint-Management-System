import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import { fetchComplaintById, updateComplaint, deleteComplaint } from '../services/complaintService';
import DashboardLayout from '../components/DashboardLayout';
import Spinner from '../components/Spinner';

const statusOptions = ['Pending', 'In Progress', 'Resolved'];
const priorityOptions = ['Low', 'Medium', 'High'];

const ComplaintDetail = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const isAdmin = user?.role === 'admin';

  const loadComplaint = async () => {
    setError(null);
    setLoading(true);
    try {
      const data = await fetchComplaintById(id);
      setComplaint(data);
    } catch (err) {
      setError(err.response?.data?.error || 'Unable to load complaint details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComplaint();
  }, [id]);

  const handleUpdateStatus = async () => {
    if (!complaint) return;
    const nextStatus = prompt('Select new status: Pending, In Progress, Resolved', complaint.status);
    if (!nextStatus || !statusOptions.includes(nextStatus)) {
      toast.error('Invalid status selection');
      return;
    }
    if (nextStatus === complaint.status) {
      toast.info('Status is already set to that value');
      return;
    }
    setSubmitting(true);
    try {
      await updateComplaint(id, { status: nextStatus });
      toast.success('Complaint status updated');
      loadComplaint();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Unable to update status');
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdatePriority = async () => {
    if (!complaint) return;
    const nextPriority = prompt('Select new priority: Low, Medium, High', complaint.priority);
    if (!nextPriority || !priorityOptions.includes(nextPriority)) {
      toast.error('Invalid priority selection');
      return;
    }
    if (nextPriority === complaint.priority) {
      toast.info('Priority is already set to that value');
      return;
    }
    setSubmitting(true);
    try {
      await updateComplaint(id, { priority: nextPriority });
      toast.success('Complaint priority updated');
      loadComplaint();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Unable to update priority');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!complaint) return;
    if (!window.confirm('Delete this complaint? This cannot be undone.')) return;
    setSubmitting(true);
    try {
      await deleteComplaint(id);
      toast.success('Complaint deleted');
      navigate('/complaints');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Delete failed');
    } finally {
      setSubmitting(false);
    }
  };

  const canDelete = complaint && complaint.status === 'Pending' && !isAdmin && complaint.userId?.id === user?.id;

  return (
    <DashboardLayout title="Complaint details" subtitle="View the full complaint history and take action where permitted.">
      {loading ? (
        <Spinner />
      ) : error ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-8 shadow-sm">
          <p className="text-red-900 font-semibold">{error}</p>
          <button
            onClick={loadComplaint}
            className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
          >
            Reload
          </button>
        </div>
      ) : (
        complaint && (
          <div className="space-y-8">
            <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)]/95 p-6 shadow-2xl shadow-slate-950/30">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-[var(--text)]">{complaint.title}</h2>
                  <p className="mt-2 text-sm text-[var(--muted)]">Submitted by {complaint.userId?.name || 'Unknown'} • {complaint.userId?.email || 'No email'}</p>
                </div>
                <div className="space-x-2">
                  {isAdmin && (
                    <button
                      disabled={submitting}
                      onClick={handleUpdateStatus}
                      className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-50"
                    >
                      Update status
                    </button>
                  )}
                  {isAdmin && (
                    <button
                      disabled={submitting}
                      onClick={handleUpdatePriority}
                      className="rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-2 text-sm font-semibold text-[var(--text)] hover:bg-[var(--surface)] disabled:opacity-50"
                    >
                      Update priority
                    </button>
                  )}
                  {canDelete && (
                    <button
                      disabled={submitting}
                      onClick={handleDelete}
                      className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100 disabled:opacity-50"
                    >
                      Delete complaint
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface-soft)] p-5">
                  <p className="text-sm text-[var(--muted)]">Category</p>
                  <p className="mt-2 text-lg font-semibold text-[var(--text)]">{complaint.category}</p>
                </div>
                <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface-soft)] p-5">
                  <p className="text-sm text-[var(--muted)]">Priority</p>
                  <p className="mt-2 text-lg font-semibold text-[var(--text)]">{complaint.priority}</p>
                </div>
                <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface-soft)] p-5">
                  <p className="text-sm text-[var(--muted)]">Status</p>
                  <p className="mt-2 text-lg font-semibold text-[var(--text)]">{complaint.status}</p>
                </div>
                <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface-soft)] p-5">
                  <p className="text-sm text-[var(--muted)]">Submitted</p>
                  <p className="mt-2 text-lg font-semibold text-[var(--text)]">{new Date(complaint.createdAt).toLocaleString()}</p>
                </div>
              </div>

              <div className="mt-8 rounded-3xl border border-[var(--border)] bg-[var(--surface-soft)] p-6">
                <h3 className="text-xl font-semibold text-[var(--text)]">Description</h3>
                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{complaint.description}</p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)]/95 p-6 shadow-2xl shadow-slate-950/30">
              <h3 className="text-xl font-semibold text-[var(--text)]">Complaint history</h3>
              {complaint.history?.length ? (
                <div className="mt-6 space-y-4">
                  {complaint.history.slice().reverse().map((event, index) => (
                    <div key={index} className="rounded-3xl border border-[var(--border)] bg-[var(--surface-soft)] p-4">
                      <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--muted)]">
                        <span>{new Date(event.timestamp).toLocaleString()}</span>
                        <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                        <span>{event.changedBy?.name || 'System'} ({event.changedBy?.role || 'system'})</span>
                      </div>
                      <p className="mt-3 text-base font-semibold text-[var(--text)]">{event.action}</p>
                      {event.comment && <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{event.comment}</p>}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm text-[var(--muted)]">No history entries yet.</p>
              )}
            </div>
          </div>
        )
      )}
    </DashboardLayout>
  );
};

export default ComplaintDetail;
