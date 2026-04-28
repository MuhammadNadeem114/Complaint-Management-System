import { Link } from 'react-router-dom';

const ComplaintCard = ({ complaint, onDelete, onUpdate, isAdmin }) => {
  return (
    <div className="transform rounded-[2rem] border border-[var(--border)] bg-[var(--surface)]/95 p-6 shadow-2xl shadow-slate-950/40 transition-transform duration-300 hover:-translate-y-1 hover:shadow-slate-950/70">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-[var(--text)]">{complaint.title}</h3>
          <p className="text-sm text-[var(--muted)]">{complaint.category} • {complaint.priority}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em] font-semibold ${complaint.status === 'Resolved' ? 'bg-emerald-500/15 text-emerald-200' : complaint.status === 'In Progress' ? 'bg-cyan-500/15 text-cyan-200' : 'bg-amber-500/15 text-amber-200'}`}>
          {complaint.status}
        </span>
      </div>
      <p className="mt-5 text-sm leading-7 text-[var(--muted)]">{complaint.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        <p className="rounded-full bg-[var(--surface-soft)] px-3 py-1 text-xs font-medium text-[var(--text)]">Submitted by {complaint.userId?.name || 'you'}</p>
        <p className="rounded-full bg-[var(--surface-soft)] px-3 py-1 text-xs font-medium text-[var(--text)]">{new Date(complaint.createdAt).toLocaleString()}</p>
      </div>
      {complaint.history?.length > 0 && (
        <div className="mt-6 rounded-3xl border border-[var(--border)] bg-[var(--surface-soft)] p-4">
          <h4 className="text-sm font-semibold text-[var(--text)]">History</h4>
          <div className="mt-4 space-y-3">
            {complaint.history.slice(-3).reverse().map((event, index) => (
              <div key={index} className="rounded-2xl border border-[var(--border)] bg-white p-3">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">{new Date(event.timestamp).toLocaleString()}</p>
                <p className="mt-1 text-sm font-semibold text-[var(--text)]">{event.action}</p>
                {event.comment && <p className="mt-1 text-sm text-[var(--muted)]">{event.comment}</p>}
                <p className="mt-2 text-xs text-[var(--muted)]">By: {event.changedBy?.name || 'System'} ({event.changedBy?.role || 'system'})</p>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          to={`/complaint/${complaint._id}`}
          className="rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-2 text-sm font-semibold text-[var(--text)] hover:bg-[var(--surface)] transition"
        >
          View details
        </Link>
        {isAdmin && (
          <button
            onClick={() => onUpdate(complaint)}
            className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Update status
          </button>
        )}
        {!isAdmin && complaint.status === 'Pending' && (
          <button
            onClick={() => onDelete(complaint._id)}
            className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default ComplaintCard;
