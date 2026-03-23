import { memo } from "react";
import { FaNodeJs, FaReact } from "react-icons/fa";
import { SiExpress, SiJavascript, SiMongodb, SiTailwindcss } from "react-icons/si";

const iconMap = {
  React: FaReact,
  Node: FaNodeJs,
  JavaScript: SiJavascript,
  MongoDB: SiMongodb,
  Express: SiExpress,
  Tailwind: SiTailwindcss
};

function TechStackIcons({ stack }) {
  return (
    <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-6">
      {stack.map((item) => {
        const Icon = iconMap[item];

        return (
          <div key={item} className="flex flex-col items-center rounded-xl border border-slate-700 bg-slate-900/60 p-3">
            {Icon ? <Icon className="text-xl text-cyan-300" /> : <span className="text-xl text-cyan-300">*</span>}
            <span className="mt-2 text-xs text-slate-300">{item}</span>
          </div>
        );
      })}
    </div>
  );
}

export default memo(TechStackIcons);
