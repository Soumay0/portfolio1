import { motion } from "framer-motion";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaGithub } from "react-icons/fa";
import Modal from "./Modal";

function ProjectDetailsModal({ project, onClose }) {
  const images = project.screenshots?.length ? project.screenshots : ["/profile.jpg"];
  const [activeIndex, setActiveIndex] = useState(0);

  function previousImage() {
    setActiveIndex((value) => (value === 0 ? images.length - 1 : value - 1));
  }

  function nextImage() {
    setActiveIndex((value) => (value === images.length - 1 ? 0 : value + 1));
  }

  return (
    <Modal onClose={onClose} fullScreen>
      <div className="grid gap-6 lg:grid-cols-[1.15fr,0.85fr]">
        <div className="relative">
          <motion.img
            key={images[activeIndex]}
            src={images[activeIndex]}
            alt={`${project.title} screenshot ${activeIndex + 1}`}
            className="h-[48vh] w-full rounded-xl object-cover"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            loading="lazy"
          />
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={previousImage}
                className="absolute left-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-slate-900/80 text-slate-100"
              >
                <FaChevronLeft />
              </button>
              <button
                type="button"
                onClick={nextImage}
                className="absolute right-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-slate-900/80 text-slate-100"
              >
                <FaChevronRight />
              </button>
            </>
          )}
        </div>

        <div>
          <p className="text-sm uppercase tracking-[0.16em] text-cyan-300">Project Details</p>
          <h3 className="mt-2 text-3xl font-bold text-white">{project.title}</h3>
          <p className="mt-4 text-sm leading-7 text-subtle">{project.longDescription || project.description}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {(project.techStack || []).map((tech) => (
              <span key={`${project.title}-modal-${tech}`} className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-xs text-slate-200">
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            {project.githubUrl && (
              <a
                className="inline-flex items-center gap-2 rounded-full border border-slate-500 px-5 py-2.5 text-slate-200"
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub />
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ProjectDetailsModal;
