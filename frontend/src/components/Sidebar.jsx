import { NavLink } from 'react-router-dom';

const Sidebar = ({ links, role, open, onClose }) => {
  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-[var(--surface)]/80 backdrop-blur-sm transition-opacity duration-300 md:hidden ${open ? 'opacity-100 pointer-events-auto' : 'pointer-events-none opacity-0'}`}
        onClick={onClose}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 transform rounded-r-3xl border border-[var(--border)] bg-[var(--surface)]/95 p-6 shadow-2xl shadow-slate-950/40 transition-transform duration-300 md:static md:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[var(--text)]">SCMS</h2>
          <p className="text-sm text-[var(--muted)]">Smart Complaint Management</p>
        </div>
        <nav className="space-y-2">
          {links.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `block rounded-3xl px-4 py-3 text-sm font-semibold transition ${
                  isActive ? 'bg-[var(--accent-soft)] text-[var(--text)] shadow-sm shadow-cyan-500/10' : 'text-[var(--muted)] hover:bg-[var(--surface-soft)] hover:text-[var(--text)]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-10 rounded-[2rem] border border-[var(--border)] bg-[var(--surface-strong)]/95 p-4 text-sm text-[var(--muted)]">
          <p className="font-semibold text-[var(--text)]">Role</p>
          <p className="mt-2 text-[var(--muted)]">{role === 'admin' ? 'Admin access to all complaints and status controls' : 'User access to submit and track your complaints'}</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
