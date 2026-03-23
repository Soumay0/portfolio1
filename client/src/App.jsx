import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import Card from "./components/Card";
import CertificateCard from "./components/CertificateCard";
import CustomCursor from "./components/CustomCursor";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import Navbar from "./components/Navbar";
import ProjectCard from "./components/ProjectCard";
import ProjectDetailsModal from "./components/ProjectDetailsModal";
import ScrollProgress from "./components/ScrollProgress";
import SectionHeading from "./components/SectionHeading";
import SkeletonCard from "./components/SkeletonCard";
import TechStackIcons from "./components/TechStackIcons";
import Toast from "./components/Toast";
import TypingText from "./components/TypingText";
import { profile } from "./config/siteConfig";
import { fetchCertificates, fetchGithubLatestRepos, fetchProjects, sendContactMessage } from "./services/api";

const allowedProjects = new Set([
  "medconnect",
  "medconnect - medical appointment booking website",
  "cpu schedular simulator",
  "cpu scheduling simulator",
  "uniportal",
  "uni-portal",
  "student management api"
]);

function App() {
  const [theme, setTheme] = useState("dark");
  const [projects, setProjects] = useState([]);
  const [githubRepos, setGithubRepos] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [isProjectsLoading, setIsProjectsLoading] = useState(true);
  const [isCertificatesLoading, setIsCertificatesLoading] = useState(true);
  const [isGithubLoading, setIsGithubLoading] = useState(true);
  const [projectFilter, setProjectFilter] = useState("All");
  const [projectSearch, setProjectSearch] = useState("");
  const [activeProject, setActiveProject] = useState(null);
  const [activeCertificate, setActiveCertificate] = useState(null);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [contactState, setContactState] = useState("idle");
  const [toast, setToast] = useState(null);

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timer = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    async function loadProjects() {
      setIsProjectsLoading(true);
      try {
        const apiProjects = await fetchProjects();
        const curatedProjects = apiProjects.filter((project) =>
          allowedProjects.has(project.title.toLowerCase())
        );
        setProjects(curatedProjects);
      } catch (error) {
        setProjects([]);
      } finally {
        setIsProjectsLoading(false);
      }
    }

    async function loadGithubRepos() {
      setIsGithubLoading(true);
      try {
        const repos = await fetchGithubLatestRepos(profile.githubUsername);
        setGithubRepos(repos);
      } catch (error) {
        setGithubRepos([]);
      } finally {
        setIsGithubLoading(false);
      }
    }

    async function loadCertificates() {
      setIsCertificatesLoading(true);
      try {
        const data = await fetchCertificates();
        setCertificates(data);
      } catch (error) {
        setCertificates([]);
      } finally {
        setIsCertificatesLoading(false);
      }
    }

    loadProjects();
    loadGithubRepos();
    loadCertificates();
  }, []);

  const projectFilters = useMemo(() => {
    const stack = new Set();
    projects.forEach((project) => {
      (project.techStack || []).forEach((item) => stack.add(item));
    });
    return ["All", ...Array.from(stack).sort((a, b) => a.localeCompare(b))];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects
      .filter((project) => (projectFilter === "All" ? true : (project.techStack || []).includes(projectFilter)))
      .filter((project) => {
        const query = projectSearch.trim().toLowerCase();
        if (!query) {
          return true;
        }

        return (
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          (project.techStack || []).some((item) => item.toLowerCase().includes(query))
        );
      });
  }, [projectFilter, projectSearch, projects]);

  const featuredProject = useMemo(
    () => projects.find((project) => project.featured) || projects[0] || null,
    [projects]
  );

  const projectList = useMemo(
    () => filteredProjects.filter((project) => project.title !== featuredProject?.title),
    [featuredProject?.title, filteredProjects]
  );

  async function handleContactSubmit(event) {
    event.preventDefault();
    setContactState("loading");

    try {
      await sendContactMessage(contactForm);
      setContactState("success");
      setContactForm({ name: "", email: "", message: "" });
      setToast({ type: "success", message: "Email sent successfully." });
    } catch (error) {
      setContactState("error");
      setToast({ type: "error", message: "Failed to send email. Please try again." });
    }
  }

  const handleNavClick = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const sectionAnimation = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-space text-slate-100 transition-colors duration-300">
      <ScrollProgress />
      <CustomCursor theme={theme} />
      <Toast toast={toast} onClose={() => setToast(null)} />
      <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <Navbar theme={theme} onThemeToggle={() => setTheme(theme === "dark" ? "light" : "dark")} onNavClick={handleNavClick} />

        <motion.section
          id="home"
          className="grid min-h-[84vh] items-center gap-8 pt-16 md:grid-cols-[1.2fr,0.8fr]"
          initial="hidden"
          animate="visible"
          variants={sectionAnimation}
          transition={{ duration: 0.6 }}
        >
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.2em] text-cyan-300">{profile.location}</p>
            <h1 className="mb-4 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              {profile.name}
              <span className="mt-2 block text-cyan-300">
                <TypingText texts={[profile.role, "React Engineer", "Backend API Builder"]} />
              </span>
            </h1>
            <p className="max-w-xl text-base text-slate-300 sm:text-lg">{profile.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                className="rounded-full border border-cyan-400/50 bg-cyan-400/10 px-6 py-3 text-sm font-medium text-cyan-200 hover:bg-cyan-400/20"
                onClick={() => handleNavClick("projects")}
              >
                Explore Work
              </button>
              <button
                type="button"
                className="rounded-full border border-slate-500/50 px-6 py-3 text-sm font-medium text-slate-200 hover:border-slate-300"
                onClick={() => handleNavClick("contact")}
              >
                Let&apos;s Collaborate
              </button>
            </div>
          </div>

          <Card className="p-6">
            <img
              src="/profile.jpg"
              alt={`${profile.name} profile`}
              className="mb-4 h-72 w-full rounded-xl bg-slate-950/70 p-2 object-contain"
            />
            <p className="text-sm uppercase tracking-[0.18em] text-cyan-200/80">Focus</p>
            <h3 className="mt-2 text-2xl font-medium text-white">Building modern full-stack products</h3>
            <p className="mt-3 text-sm text-slate-300">{profile.bio}</p>
            <TechStackIcons stack={profile.primaryStack} />
          </Card>
        </motion.section>

        <motion.section
          id="about"
          className="py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionAnimation}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading
            label="About"
            title="Engineering polished products with clean architecture"
            description={profile.about}
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-white">Skills</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <span key={skill} className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-xs text-slate-200">
                    {skill}
                  </span>
                ))}
              </div>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-white">Tech Stack</h3>
              <TechStackIcons stack={profile.techIcons} />
            </Card>
          </div>
        </motion.section>

        <motion.section
          id="projects"
          className="py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={sectionAnimation}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading
            label="Projects"
            title="Production projects with strong engineering fundamentals"
            description="Filter by tech stack, search quickly, and open each project for full architecture details and screenshots."
          />
          <div className="mt-6 flex flex-wrap gap-3">
            <input
              type="text"
              value={projectSearch}
              onChange={(event) => setProjectSearch(event.target.value)}
              placeholder="Search projects"
              className="min-w-55 rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2 text-sm text-white outline-none ring-cyan-400 focus:ring"
            />
            {projectFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setProjectFilter(filter)}
                className={`rounded-full border px-3 py-1 text-xs transition ${
                  projectFilter === filter
                    ? "border-cyan-400 bg-cyan-500/20 text-cyan-200"
                    : "border-slate-600 bg-slate-900/60 text-slate-300 hover:border-slate-400"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {!isProjectsLoading && featuredProject && (
            <div className="mt-8">
              <p className="mb-3 text-xs uppercase tracking-[0.16em] text-cyan-300">Featured Project</p>
              <ProjectCard project={featuredProject} onOpen={setActiveProject} />
            </div>
          )}

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {isProjectsLoading &&
              Array.from({ length: 4 }).map((_, index) => <SkeletonCard key={`project-skeleton-${index}`} />)}

            {!isProjectsLoading &&
              projectList.map((project) => (
                <ProjectCard key={project.title} project={project} onOpen={setActiveProject} />
              ))}
          </div>

          <div className="mt-10">
            <p className="mb-3 text-xs uppercase tracking-[0.16em] text-cyan-300">Latest GitHub Repositories</p>
            <div className="grid gap-3 md:grid-cols-2">
              {isGithubLoading &&
                Array.from({ length: 2 }).map((_, index) => (
                  <SkeletonCard key={`repo-skeleton-${index}`} className="h-36" />
                ))}

              {!isGithubLoading &&
                githubRepos.map((repo) => (
                  <Card key={repo.id} className="p-4">
                    <h4 className="text-lg font-semibold text-white">{repo.name}</h4>
                    <p className="mt-2 text-sm text-subtle">{repo.description}</p>
                    <div className="mt-3 flex items-center justify-between text-xs text-slate-300">
                      <span>{repo.language}</span>
                      <span>{repo.stars} stars</span>
                    </div>
                    <a
                      className="mt-3 inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-200"
                      href={repo.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View Repository
                    </a>
                  </Card>
                ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          id="certificates"
          className="py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={sectionAnimation}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading
            label="Certificates"
            title="Continuous learning and verified milestones"
            description="Tap any certificate to view it in full size."
          />
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {isCertificatesLoading &&
              Array.from({ length: 3 }).map((_, index) => (
                <SkeletonCard key={`certificate-skeleton-${index}`} className="h-64" />
              ))}

            {!isCertificatesLoading &&
              certificates.map((certificate) => (
                <CertificateCard
                  key={`${certificate.title}-${certificate.date}`}
                  certificate={certificate}
                  onOpen={() => setActiveCertificate(certificate)}
                />
              ))}
          </div>
        </motion.section>

        <motion.section
          id="contact"
          className="py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={sectionAnimation}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading
            label="Contact"
            title="Let&apos;s build something impactful"
            description="Share your idea, product stage, or role requirements and I will get back quickly."
          />

          <div className="mt-8 grid gap-5 md:grid-cols-[1.1fr,0.9fr]">
            <Card className="p-6">
              <form className="space-y-4" onSubmit={handleContactSubmit}>
                <input
                  className="w-full rounded-lg border border-slate-700 bg-slate-900/90 px-4 py-3 text-sm text-white outline-none ring-cyan-400 transition focus:ring"
                  type="text"
                  placeholder="Name"
                  value={contactForm.name}
                  onChange={(event) => setContactForm({ ...contactForm, name: event.target.value })}
                  required
                />
                <input
                  className="w-full rounded-lg border border-slate-700 bg-slate-900/90 px-4 py-3 text-sm text-white outline-none ring-cyan-400 transition focus:ring"
                  type="email"
                  placeholder="Email"
                  value={contactForm.email}
                  onChange={(event) => setContactForm({ ...contactForm, email: event.target.value })}
                  required
                />
                <textarea
                  className="h-32 w-full rounded-lg border border-slate-700 bg-slate-900/90 px-4 py-3 text-sm text-white outline-none ring-cyan-400 transition focus:ring"
                  placeholder="Message"
                  value={contactForm.message}
                  onChange={(event) => setContactForm({ ...contactForm, message: event.target.value })}
                  required
                />
                <button
                  type="submit"
                  disabled={contactState === "loading"}
                  className="rounded-full border border-cyan-400/50 bg-cyan-500/20 px-6 py-3 text-sm font-medium text-cyan-100 transition hover:bg-cyan-500/30 disabled:opacity-60"
                >
                  {contactState === "loading" ? "Sending..." : "Send Message"}
                </button>
              </form>
            </Card>

            <Card className="space-y-4 p-6">
              <a
                className="flex items-center gap-3 text-slate-200 hover:text-cyan-200"
                href={`mailto:${profile.email}`}
              >
                <FaEnvelope />
                {profile.email}
              </a>
              <a className="flex items-center gap-3 text-slate-200 hover:text-cyan-200" href={profile.social.github} target="_blank" rel="noreferrer">
                <FaGithub />
                GitHub
              </a>
              <a className="flex items-center gap-3 text-slate-200 hover:text-cyan-200" href={profile.social.linkedin} target="_blank" rel="noreferrer">
                <FaLinkedin />
                LinkedIn
              </a>
            </Card>
          </div>
        </motion.section>

        <Footer name={profile.name} role={profile.role} />
      </div>

      <AnimatePresence>
        {activeProject && (
          <ProjectDetailsModal project={activeProject} onClose={() => setActiveProject(null)} />
        )}

        {activeCertificate && (
          <Modal onClose={() => setActiveCertificate(null)}>
            <motion.img
              src={activeCertificate.imageUrl}
              alt={activeCertificate.title}
              className="max-h-[75vh] w-full rounded-lg object-contain"
              loading="lazy"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
            />
            <div className="mt-4">
              <h3 className="text-xl font-semibold text-white">{activeCertificate.title}</h3>
              <p className="mt-1 text-sm text-slate-300">
                {activeCertificate.issuer} | {activeCertificate.date}
              </p>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
