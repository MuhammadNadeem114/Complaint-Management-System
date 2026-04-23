const ComplaintCard = ({ complaint, onDelete, onUpdate, isAdmin }) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{complaint.title}</h3>
          <p className="text-sm text-slate-500">{complaint.category} • {complaint.priority}</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-600">
          {complaint.status}
        </span>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-700">{complaint.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        <p className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">Submitted by {complaint.userId?.name || 'you'}</p>
        <p className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">{new Date(complaint.createdAt).toLocaleString()}</p>
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        {isAdmin && (
          <button
            onClick={() => onUpdate(complaint)}
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600"
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
