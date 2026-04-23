import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-20 sm:px-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-10 shadow-2xl shadow-black/10 backdrop-blur-xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h1 className="text-5xl font-bold leading-tight text-white">Smart Complaint Management System</h1>
              <p className="mt-6 max-w-xl text-lg text-slate-200">
                A modern dashboard for tracking citizen issues, handling support tickets, and resolving complaints with role-based workflows.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/register" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-500">
                  Register now
                </Link>
                <Link to="/login" className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                  Login
                </Link>
              </div>
            </div>
            <div className="grid w-full gap-4 sm:grid-cols-2 lg:w-1/2">
              {['Electricity', 'Water', 'Internet', 'Other'].map((item) => (
                <div key={item} className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{item}</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">Submit requests</h2>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LandingPage;
