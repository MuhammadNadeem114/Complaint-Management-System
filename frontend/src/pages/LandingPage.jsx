import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div className="relative overflow-hidden px-6 py-16 sm:px-10 lg:py-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.16),transparent_45%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <section className="space-y-8 rounded-[2rem] border border-[var(--border)] bg-[var(--surface)]/95 p-8 shadow-surface backdrop-blur-xl sm:p-10">
            <span className="inline-flex rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
              Department of Student Affairs
            </span>
            <div className="space-y-6">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Complaint management built for students, staff, and campus services.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[var(--muted)]">
                Create, track, and resolve requests with responsive email actions and a polished interface designed for every device.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-7 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Create account
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-7 py-3 text-sm font-semibold text-[var(--text)] transition hover:bg-[var(--surface)]"
              >
                Sign in
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: 'Fast support', subtitle: 'Submit issues, receive status updates, and resolve quickly.' },
                { title: 'Public access', subtitle: 'Email links work on mobile and external devices.' },
                { title: 'Student-first', subtitle: 'Designed for campus teams and student services.' },
                { title: 'Reliable tracking', subtitle: 'Clear complaint status with built-in notifications.' },
              ].map((item) => (
                <div key={item.title} className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface-strong)] p-6 shadow-lg shadow-slate-950/10">
                  <p className="text-sm uppercase tracking-[0.2em] text-[var(--muted)]">{item.title}</p>
                  <p className="mt-4 text-xl font-semibold text-[var(--text)]">{item.subtitle}</p>
                </div>
              ))}
            </div>
          </section>

          <aside className="space-y-6 rounded-[2rem] border border-[var(--border)] bg-[var(--surface)]/95 p-8 shadow-surface backdrop-blur-xl sm:p-10">
            <div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-cyan-500/20 via-slate-900/50 to-indigo-600/10 p-6 shadow-inner shadow-cyan-500/10">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-[var(--accent)]">University Portal</p>
                  <h2 className="mt-3 text-3xl font-semibold text-[var(--text)]">Campus Service Desk</h2>
                </div>
                <div className="rounded-3xl bg-white/10 px-4 py-2 text-sm font-semibold text-[var(--text)] backdrop-blur-md">
                  Trusted by student services
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {['Electricity', 'Water', 'Internet', 'Maintenance'].map((item) => (
                  <div key={item} className="rounded-3xl bg-[var(--surface-strong)] px-4 py-4 text-sm text-[var(--text)] shadow-sm shadow-slate-950/10">
                    <p className="font-semibold">{item}</p>
                    <p className="text-[var(--muted)]">Fast ticket creation</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] bg-[var(--surface-strong)] p-6 shadow-xl shadow-slate-950/10">
              <p className="text-sm uppercase tracking-[0.2em] text-[var(--muted)]">Department spotlight</p>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/20">
                  DS
                </div>
                <div>
                  <p className="font-semibold text-[var(--text)]">Student Welfare Office</p>
                  <p className="text-sm text-[var(--muted)]">Campus operations and support.</p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl bg-[var(--surface-strong)] p-4 text-center shadow-sm shadow-slate-950/10">
                <p className="text-2xl font-semibold text-[var(--accent)]">24/7</p>
                <p className="mt-1 text-sm text-[var(--muted)]">Access anytime</p>
              </div>
              <div className="rounded-3xl bg-[var(--surface-strong)] p-4 text-center shadow-sm shadow-slate-950/10">
                <p className="text-2xl font-semibold text-[var(--accent)]">94%</p>
                <p className="mt-1 text-sm text-[var(--muted)]">Response rate</p>
              </div>
              <div className="rounded-3xl bg-[var(--surface-strong)] p-4 text-center shadow-sm shadow-slate-950/10">
                <p className="text-2xl font-semibold text-[var(--accent)]">Mobile</p>
                <p className="mt-1 text-sm text-[var(--muted)]">Friendly UI</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default LandingPage;
