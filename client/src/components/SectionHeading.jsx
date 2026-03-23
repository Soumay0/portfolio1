import { memo } from "react";

function SectionHeading({ label, title, description }) {
  return (
    <div>
      <p className="text-sm uppercase tracking-[0.16em] text-cyan-300">{label}</p>
      <h2 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
      <p className="mt-3 max-w-2xl text-subtle">{description}</p>
    </div>
  );
}

export default memo(SectionHeading);
