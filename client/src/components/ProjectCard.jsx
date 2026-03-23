import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import Card from "./Card";

function ProjectCard({ project }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      <Card className="flex h-full flex-col p-5">
        <h3 className="text-xl font-semibold text-white">{project.title}</h3>
        <p className="mt-3 text-sm text-subtle">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {(project.techStack || []).map((tech) => (
            <span key={`${project.title}-${tech}`} className="rounded-full border border-slate-700 bg-slate-900/70 px-2.5 py-1 text-xs text-slate-300">
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-5 flex items-center gap-4 text-sm">
          <a className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200" href={project.githubUrl} target="_blank" rel="noreferrer">
            <FaGithub />
            GitHub
          </a>
          <a className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200" href={project.liveUrl} target="_blank" rel="noreferrer">
            <FaExternalLinkAlt />
            Live Demo
          </a>
        </div>
      </Card>
    </motion.div>
  );
}

export default ProjectCard;
