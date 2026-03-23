import { portfolioData } from "../data";

function CertificatesPage() {
  return (
    <section className="page">
      <article className="content-card reveal-in">
        <p className="section-tag">Proof Of Learning</p>
        <h1>Certificates</h1>
        <p>
          A curated list of credentials and training milestones. Add your actual certificate URLs for
          verification.
        </p>
      </article>

      <section className="certificate-grid">
        {portfolioData.certificates.map((certificate) => (
          <article key={certificate.title} className="certificate-card reveal-delay">
            <p className="certificate-org">{certificate.issuer}</p>
            <h3>{certificate.title}</h3>
            <p>{certificate.date}</p>
            <a href={certificate.link} target="_blank" rel="noreferrer">
              Open Certificate
            </a>
          </article>
        ))}
      </section>
    </section>
  );
}

export default CertificatesPage;
