import { useContext, useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { AuthContext } from '../context/AuthContext';
import Sidebar from './Sidebar';

const DashboardLayout = ({ title, subtitle, children }) => {
  const { user, logout } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const links = user?.role === 'admin'
    ? [
        { label: 'Dashboard', to: '/admin/dashboard' },
        { label: 'All Complaints', to: '/complaints' },
        { label: 'Profile', to: '/profile' },
      ]
    : [
        { label: 'Dashboard', to: '/user/dashboard' },
        { label: 'My Complaints', to: '/complaints' },
        { label: 'Profile', to: '/profile' },
      ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="relative grid min-h-screen grid-cols-1 lg:grid-cols-[280px_1fr]">
        <Sidebar links={links} role={user?.role} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="p-6 lg:p-10 lg:pl-0">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              {/* Mobile Toggle - Only visible on mobile */}
              <button
                type="button"
                onClick={() => setSidebarOpen((prev) => !prev)}
                className="hidden max-lg:inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 transition"
                aria-label="Toggle sidebar"
              >
                {sidebarOpen ? <HiX size={20} /> : <HiMenu size={20} />}
              </button>
              <div>
                <h1 className="text-3xl font-semibold text-slate-900">{title}</h1>
                <p className="mt-2 text-slate-600">{subtitle}</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm uppercase tracking-[0.2em] text-slate-600">{user?.role || 'User'}</span>
              <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700">{user?.name}</span>
              <button onClick={logout} className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition">
                Logout
              </button>
            </div>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
