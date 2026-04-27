const DashboardCard = ({ title, value, extra }) => (
  <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)]/95 p-6 shadow-2xl shadow-slate-950/40 backdrop-blur-xl transition hover:-translate-y-1 hover:border-[var(--accent)]/50">
    <div className="flex items-center justify-between gap-4">
      <h3 className="text-sm uppercase tracking-[0.25em] text-[var(--muted)]">{title}</h3>
      <div className="h-12 w-12 rounded-3xl bg-gradient-to-br from-cyan-500 to-indigo-500 p-3 text-white shadow-lg shadow-cyan-500/20" />
    </div>
    <p className="mt-5 text-4xl font-semibold text-[var(--text)] drop-shadow-sm">{value}</p>
    {extra && <p className="mt-3 text-sm text-[var(--muted)]">{extra}</p>}
  </div>
);

export default DashboardCard;
