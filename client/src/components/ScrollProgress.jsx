import { useEffect, useState } from "react";

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const next = height <= 0 ? 0 : (window.scrollY / height) * 100;
      setProgress(next);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed left-0 top-0 z-70 h-1 w-full bg-transparent">
      <div className="h-full bg-cyan-300 transition-[width] duration-150" style={{ width: `${progress}%` }} />
    </div>
  );
}

export default ScrollProgress;
