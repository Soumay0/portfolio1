function Footer({ name, role }) {
  return (
    <footer className="mt-8 border-t border-slate-800/80 py-6 text-center text-sm text-slate-400">
      <p>{name} | {role}</p>
      <p className="mt-1">Built with React, Tailwind, Express, MongoDB, and Framer Motion</p>
    </footer>
  );
}

export default Footer;
