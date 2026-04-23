const DashboardCard = ({ title, value, extra }) => (
  <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
    <h3 className="text-sm uppercase tracking-[0.2em] text-slate-500">{title}</h3>
    <p className="mt-3 text-3xl font-semibold text-slate-900">{value}</p>
    {extra && <p className="mt-2 text-sm text-slate-500">{extra}</p>}
  </div>
);

export default DashboardCard;
