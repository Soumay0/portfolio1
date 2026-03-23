import { FiMoon, FiSun } from "react-icons/fi";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "certificates", label: "Certificates" },
  { id: "contact", label: "Contact" }
];

function Navbar({ theme, onThemeToggle, onNavClick }) {
  const isLight = theme === "light";

  return (
    <header
      className={`sticky top-0 z-30 flex items-center justify-between gap-3 border-b py-4 backdrop-blur md:py-5 ${
        isLight ? "border-slate-300 bg-white/85" : "border-slate-800/70 bg-[#05060f]/85"
      }`}
    >
      <p className="text-sm font-medium uppercase tracking-[0.16em] text-cyan-200">Portfolio</p>
      <nav className="hidden items-center gap-2 md:flex">
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            onClick={() => onNavClick(section.id)}
            className={`rounded-full px-3 py-1.5 text-sm transition hover:text-cyan-200 ${
              isLight ? "text-slate-700 hover:bg-slate-200" : "text-slate-300 hover:bg-slate-800/80"
            }`}
          >
            {section.label}
          </button>
        ))}
      </nav>
      <button
        type="button"
        onClick={onThemeToggle}
        className={`inline-flex h-9 w-9 items-center justify-center rounded-full border hover:border-cyan-300 hover:text-cyan-200 ${
          isLight ? "border-slate-300 text-slate-700" : "border-slate-700 text-slate-100"
        }`}
        aria-label="Toggle theme"
      >
        {theme === "dark" ? <FiSun /> : <FiMoon />}
      </button>
    </header>
  );
}

export default Navbar;
