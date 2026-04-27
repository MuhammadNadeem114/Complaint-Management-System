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
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div className="relative grid min-h-screen grid-cols-1 md:grid-cols-[280px_1fr]">
        <Sidebar links={links} role={user?.role} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="relative overflow-hidden p-6 md:p-10 md:pl-0">
          <div className="absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.18),transparent_50%)]" />
          <div className="relative mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              {/* Mobile Toggle - Only visible on mobile */}
              <button
                type="button"
                onClick={() => setSidebarOpen((prev) => !prev)}
                className="hidden max-lg:inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] shadow-sm transition hover:bg-[var(--surface-soft)]"
                aria-label="Toggle sidebar"
              >
                {sidebarOpen ? <HiX size={20} /> : <HiMenu size={20} />}
              </button>
              <div>
                <h1 className="text-3xl font-semibold text-[var(--text)]">{title}</h1>
                <p className="mt-2 text-[var(--muted)]">{subtitle}</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[var(--surface-soft)] px-3 py-1 text-sm uppercase tracking-[0.2em] text-[var(--muted)]">{user?.role || 'User'}</span>
              <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm text-[var(--text)]">{user?.name}</span>
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
