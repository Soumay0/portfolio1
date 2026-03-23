import { portfolioData } from "../data";

function ProjectsPage() {
  return (
    <section className="page">
      <article className="content-card reveal-in">
        <p className="section-tag">Project Portfolio</p>
        <h1>Selected Work</h1>
        <p>
          A mix of practical engineering and user-centered product design. Replace placeholder links
          with your live project URLs and GitHub repositories.
        </p>
      </article>

      <section className="project-grid">
        {portfolioData.projects.map((project) => (
          <article key={project.title} className="project-tile reveal-delay">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p className="project-impact">{project.impact}</p>
            <p className="project-stack">{project.stack.join(" | ")}</p>
            <a href={project.link} target="_blank" rel="noreferrer">
              Visit Project
            </a>
          </article>
        ))}
      </section>
    </section>
  );
}

export default ProjectsPage;
