import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="min-h-screen bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">404</p>
      <h1 className="mt-5 text-4xl font-bold text-slate-900">Page not found</h1>
      <p className="mt-4 text-slate-600">The page you are looking for does not exist or has been moved.</p>
      <Link to="/" className="mt-8 inline-flex rounded-2xl bg-primary px-6 py-3 text-white hover:bg-blue-600">
        Go back home
      </Link>
    </div>
  </div>
);

export default NotFound;
