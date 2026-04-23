import { NavLink } from 'react-router-dom';

const Sidebar = ({ links, role, open, onClose }) => {
  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-black/20 transition-opacity duration-300 lg:hidden ${open ? 'opacity-100 pointer-events-auto' : 'pointer-events-none opacity-0'}`}
        onClick={onClose}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 transform border-r border-slate-200 bg-white p-5 shadow-xl transition-transform duration-300 lg:static lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="mb-8">
          <h2 className="text-xl font-bold text-slate-900">SCMS</h2>
          <p className="text-sm text-slate-500">Smart Complaint Management</p>
        </div>
        <nav className="space-y-2">
          {links.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `block rounded-xl px-4 py-3 text-sm font-medium ${
                  isActive ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
          <p className="font-semibold text-slate-900">Role</p>
          <p className="mt-2">{role === 'admin' ? 'Admin access to all complaints and status controls' : 'User access to submit and track your complaints'}</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
