import { NavLink, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { portfolioData } from "../data";

function Layout() {
  const navItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/projects", label: "Projects" },
    { to: "/certificates", label: "Certificates" },
    { to: "/contact", label: "Contact" }
  ];

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    hover: {
      scale: 1.05,
      textShadow: "0 0 10px rgba(34, 211, 238, 0.6)"
    }
  };

  const navContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    hover: {
      scale: 1.08,
      color: "rgba(34, 211, 238, 1)",
      textShadow: "0 0 12px rgba(34, 211, 238, 0.6)",
      transition: { duration: 0.2 }
    }
  };

  const underlineVariants = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <div className="site-shell">
      <div className="grain" />
      <div className="glow glow-a" />
      <div className="glow glow-b" />

      <motion.header
        className="site-header"
        initial="hidden"
        animate="visible"
        variants={headerVariants}
      >
        <motion.div
          variants={logoVariants}
          whileHover="hover"
        >
          <p className="logo-mark">{portfolioData.name}</p>
          <p className="logo-sub">{portfolioData.role}</p>
        </motion.div>

        <motion.nav
          className="nav-links"
          initial="hidden"
          animate="visible"
          variants={navContainerVariants}
        >
          {navItems.map((item) => (
            <motion.div
              key={item.to}
              variants={navItemVariants}
              whileHover="hover"
              className="relative"
            >
              <NavLink
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) => `
                  relative text-sm md:text-base transition-colors
                  ${isActive ? "text-cyan-300 dark:text-cyan-400" : "text-slate-400 hover:text-slate-200"}
                `}
              >
                {item.label}
                {({ isActive }) => (
                  isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-cyan-400 to-transparent"
                      variants={underlineVariants}
                      initial="hidden"
                      animate="visible"
                    />
                  )
                )}
              </NavLink>
            </motion.div>
          ))}
        </motion.nav>
      </motion.header>

      <main className="main-content">
        <Outlet />
      </main>

      <motion.footer
        className="site-footer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <p>
          {portfolioData.name} | {portfolioData.location} | {portfolioData.email}
        </p>
        <p>
          <motion.a
            href={portfolioData.links.github}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.1, color: "rgba(34, 211, 238, 1)" }}
            className="transition-colors"
          >
            GitHub
          </motion.a>
          <span> | </span>
          <motion.a
            href={portfolioData.links.linkedin}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.1, color: "rgba(34, 211, 238, 1)" }}
            className="transition-colors"
          >
            LinkedIn
          </motion.a>
          <span> | </span>
          <motion.a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.1, color: "rgba(34, 211, 238, 1)" }}
            className="transition-colors"
          >
            Resume
          </motion.a>
        </p>
      </motion.footer>
    </div>
  );
}

export default Layout;
