import { useEffect, useState } from "react";
import { portfolioData } from "./data";

function App() {
  const [apiStatus, setApiStatus] = useState("checking");
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitState, setSubmitState] = useState("idle");

  useEffect(() => {
    async function checkApi() {
      try {
        const response = await fetch("/api/health");
        if (!response.ok) {
          throw new Error("API unavailable");
        }
        setApiStatus("online");
      } catch (error) {
        setApiStatus("offline");
      }
    }

    checkApi();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitState("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState)
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setSubmitState("success");
      setFormState({ name: "", email: "", message: "" });
    } catch (error) {
      setSubmitState("error");
    }
  }

  return (
    <div className="page-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="topbar">
        <div className="brand">{portfolioData.name}</div>
        <nav>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-text reveal">
            <p className="eyebrow">{portfolioData.location}</p>
            <h1>
              {portfolioData.role}
              <span>{portfolioData.name}</span>
            </h1>
            <p>{portfolioData.tagline}</p>
            <div className="cta-row">
              <a href="#contact" className="btn btn-primary">
                Hire Me
              </a>
              <a href="/resume.pdf" className="btn btn-ghost" target="_blank" rel="noreferrer">
                View Resume
              </a>
            </div>
          </div>

          <div className="hero-card reveal-delay">
            <img src="/profile.jpg" alt="Portrait of Souma" />
            <p>API status: <strong>{apiStatus}</strong></p>
          </div>
        </section>

        <section id="about" className="panel reveal">
          <h2>About</h2>
          <p>{portfolioData.summary}</p>
        </section>

        <section className="panel reveal-delay">
          <h2>Skills</h2>
          <div className="chip-grid">
            {portfolioData.skills.map((skill) => (
              <span key={skill} className="chip">
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section id="projects" className="panel reveal">
          <h2>Projects</h2>
          <div className="card-grid">
            {portfolioData.projects.map((project) => (
              <article className="project-card" key={project.title}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <p className="stack">{project.stack.join(" | ")}</p>
                <a href={project.link} target="_blank" rel="noreferrer">
                  Open Project
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="panel reveal-delay">
          <h2>Experience</h2>
          {portfolioData.experience.map((item) => (
            <article key={item.company} className="experience-item">
              <h3>{item.role}</h3>
              <p className="meta">
                {item.company} | {item.period}
              </p>
              <ul>
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section id="contact" className="panel reveal">
          <h2>Contact</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <label>
              Name
              <input
                type="text"
                value={formState.name}
                onChange={(event) => setFormState({ ...formState, name: event.target.value })}
                required
              />
            </label>
            <label>
              Email
              <input
                type="email"
                value={formState.email}
                onChange={(event) => setFormState({ ...formState, email: event.target.value })}
                required
              />
            </label>
            <label>
              Message
              <textarea
                value={formState.message}
                onChange={(event) => setFormState({ ...formState, message: event.target.value })}
                rows={4}
                required
              />
            </label>
            <button type="submit" className="btn btn-primary" disabled={submitState === "loading"}>
              {submitState === "loading" ? "Sending..." : "Send Message"}
            </button>
            {submitState === "success" && <p className="status success">Message sent successfully.</p>}
            {submitState === "error" && <p className="status error">Something went wrong. Try again.</p>}
          </form>
        </section>
      </main>

      <footer>
        <p>
          {portfolioData.name} | <a href={portfolioData.links.github}>GitHub</a> |{" "}
          <a href={portfolioData.links.linkedin}>LinkedIn</a> | {portfolioData.email}
        </p>
      </footer>
    </div>
  );
}

export default App;
