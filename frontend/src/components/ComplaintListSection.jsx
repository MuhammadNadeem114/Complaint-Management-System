import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { fetchUserComplaints, deleteComplaint } from '../services/complaintService';
import ComplaintCard from './ComplaintCard';
import Spinner from './Spinner';
import { HiExclamationCircle } from 'react-icons/hi';

const ComplaintListSection = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadComplaints = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchUserComplaints();
      setComplaints(data);
    } catch (error) {
      setError('Could not load complaints. Please try again.');
      toast.error('Could not load complaints');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComplaints();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteComplaint(id);
      toast.success('Complaint deleted successfully');
      loadComplaints();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Delete failed');
    }
  };

  if (loading) return <Spinner />;

  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">My complaints</h2>
          <p className="text-sm text-slate-500">Review the status of complaints you have filed.</p>
        </div>
      </div>

      {error ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-8 shadow-sm">
          <div className="flex items-start gap-4">
            <HiExclamationCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-red-900">{error}</p>
              <button
                onClick={loadComplaints}
                className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-5">
          {complaints.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-600 shadow-sm">
              No complaints found yet. Submit one from the dashboard above.
            </div>
          ) : (
            complaints.map((item) => (
              <ComplaintCard key={item._id} complaint={item} onDelete={handleDelete} />
            ))
          )}
        </div>
      )}
    </section>
  );
};

export default ComplaintListSection;
