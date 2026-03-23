import { Link } from "react-router-dom";
import { portfolioData } from "../data";

function HomePage() {
  return (
    <section className="page page-home">
      <div className="hero-grid">
        <article className="hero-copy reveal-in">
          <p className="section-tag">{portfolioData.location}</p>
          <h1>
            Building digital products with intent,
            <span> speed, and strong engineering craft.</span>
          </h1>
          <p>{portfolioData.tagline}</p>
          <div className="btn-row">
            <Link className="btn btn-solid" to="/projects">
              Explore Projects
            </Link>
            <a className="btn btn-outline" href="/resume.pdf" target="_blank" rel="noreferrer">
              View CV
            </a>
          </div>
        </article>

        <article className="hero-panel reveal-delay">
          <img src="/profile.jpg" alt="Souma portrait" />
          <div className="panel-caption">
            <p>{portfolioData.shortIntro}</p>
          </div>
        </article>
      </div>

      <section className="metrics-grid">
        {portfolioData.metrics.map((metric) => (
          <article key={metric.label} className="metric-card reveal-in">
            <h3>{metric.value}</h3>
            <p>{metric.label}</p>
          </article>
        ))}
      </section>

      <section className="story-card reveal-delay">
        <h2>What drives my work</h2>
        <p>{portfolioData.focusStatement}</p>
        <ul>
          {portfolioData.coreStrengths.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </section>
  );
}

export default HomePage;
