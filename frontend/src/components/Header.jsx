const Header = ({ title, subtitle }) => {
  return (
    <div className="mb-6 flex flex-col gap-2">
      <h1 className="text-3xl font-semibold text-slate-900">{title}</h1>
      <p className="text-slate-600">{subtitle}</p>
    </div>
  );
};

export default Header;
