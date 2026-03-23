import { portfolioData } from "../data";

function AboutPage() {
  return (
    <section className="page">
      <article className="content-card reveal-in">
        <p className="section-tag">About Me</p>
        <h1>{portfolioData.name}</h1>
        <p>{portfolioData.summary}</p>
      </article>

      <section className="timeline-grid">
        {portfolioData.journey.map((item) => (
          <article key={item.title} className="timeline-card reveal-delay">
            <p className="timeline-year">{item.period}</p>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </section>

      <section className="content-card reveal-in">
        <h2>Skills Snapshot</h2>
        <div className="chip-wrap">
          {portfolioData.skills.map((skill) => (
            <span key={skill} className="chip-pill">
              {skill}
            </span>
          ))}
        </div>
      </section>
    </section>
  );
}

export default AboutPage;
