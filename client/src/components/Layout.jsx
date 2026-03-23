import { NavLink, Outlet } from "react-router-dom";
import { portfolioData } from "../data";

function Layout() {
  const navItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/projects", label: "Projects" },
    { to: "/certificates", label: "Certificates" },
    { to: "/contact", label: "Contact" }
  ];

  return (
    <div className="site-shell">
      <div className="grain" />
      <div className="glow glow-a" />
      <div className="glow glow-b" />

      <header className="site-header">
        <div>
          <p className="logo-mark">{portfolioData.name}</p>
          <p className="logo-sub">{portfolioData.role}</p>
        </div>

        <nav className="nav-links">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === "/"}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="site-footer">
        <p>
          {portfolioData.name} | {portfolioData.location} | {portfolioData.email}
        </p>
        <p>
          <a href={portfolioData.links.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <span> | </span>
          <a href={portfolioData.links.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <span> | </span>
          <a href="/resume.pdf" target="_blank" rel="noreferrer">
            Resume
          </a>
        </p>
      </footer>
    </div>
  );
}

export default Layout;
