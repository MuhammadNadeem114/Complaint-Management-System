import { useEffect, useState } from 'react';
import { HiMoon, HiSun } from 'react-icons/hi';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const saved = localStorage.getItem('scms_theme') || 'dark';
    setTheme(saved);
    if (saved === 'light') {
      document.body.classList.add('theme-light');
    } else {
      document.body.classList.remove('theme-light');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('scms_theme', nextTheme);

    if (nextTheme === 'light') {
      document.body.classList.add('theme-light');
    } else {
      document.body.classList.remove('theme-light');
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] text-[var(--text)] shadow-lg shadow-slate-950/20 transition hover:bg-[var(--surface)]"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <HiSun className="h-5 w-5 text-[var(--text)]" /> : <HiMoon className="h-5 w-5 text-[var(--text)]" />}
    </button>
  );
};

export default ThemeToggle;
