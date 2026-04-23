import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <DashboardLayout title="My Profile" subtitle="Your account details and role information.">
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Account Role</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">{user?.role || 'User'}</h2>
            <button onClick={logout} className="mt-8 w-full rounded-2xl bg-red-600 px-4 py-3 text-white hover:bg-red-700">
              Logout
            </button>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Account information</p>
            <div className="mt-6 space-y-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Name</p>
                <p className="mt-2 text-lg font-medium text-slate-900">{user?.name}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Email</p>
                <p className="mt-2 text-lg font-medium text-slate-900">{user?.email}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Dashboard</p>
                <Link
                  to={user?.role === 'admin' ? '/admin/dashboard' : '/user/dashboard'}
                  className="mt-2 inline-block rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600"
                >
                  Go to dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
  );
};

export default Profile;
