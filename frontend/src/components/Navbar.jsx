import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import ThemeToggle from './ThemeToggle';

const Navbar = ({ user, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dashboardPath = user?.role === 'admin' ? '/admin/dashboard' : '/user/dashboard';

  return (
    <nav className="sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-3 text-[var(--text)]">
          <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20">
            SC
          </div>
          <div>
            <p className="text-base font-semibold">Smart Complaint</p>
            <p className="text-xs text-[var(--muted)]">Department support portal</p>
          </div>
        </Link>

        <div className="hidden items-center gap-3 sm:flex">
          <ThemeToggle />
          {user ? (
            <>
              <Link to={dashboardPath} className="rounded-2xl border border-[var(--border)] px-4 py-2 text-sm text-[var(--text)] transition hover:bg-[var(--surface-soft)]">
                Dashboard
              </Link>
              <button
                onClick={onLogout}
                className="rounded-2xl bg-[var(--surface-strong)] px-4 py-2 text-sm font-semibold text-[var(--text)] transition hover:bg-[var(--surface)]"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="rounded-2xl border border-[var(--border)] px-4 py-2 text-sm text-[var(--text)] transition hover:bg-[var(--surface-soft)]">
                Login
              </Link>
              <Link to="/register" className="rounded-2xl bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
                Register
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-3 sm:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] text-[var(--text)] transition hover:bg-[var(--surface)]"
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <HiX className="h-5 w-5" /> : <HiMenu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="sm:hidden border-t border-[var(--border)] bg-[var(--surface)]/98 px-4 py-4 backdrop-blur-xl">
          <div className="flex flex-col gap-3">
            {user ? (
              <>
                <Link
                  to={dashboardPath}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-2xl border border-[var(--border)] px-4 py-3 text-sm text-[var(--text)] transition hover:bg-[var(--surface-soft)]"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    onLogout();
                    setMenuOpen(false);
                  }}
                  className="rounded-2xl bg-[var(--surface-strong)] px-4 py-3 text-sm font-semibold text-[var(--text)] transition hover:bg-[var(--surface)]"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-2xl border border-[var(--border)] px-4 py-3 text-sm text-[var(--text)] transition hover:bg-[var(--surface-soft)]"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-2xl bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
