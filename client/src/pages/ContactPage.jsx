import { useEffect, useState } from "react";
import { portfolioData } from "../data";

function ContactPage() {
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
    <section className="page contact-page">
      <article className="content-card reveal-in">
        <p className="section-tag">Let us connect</p>
        <h1>Contact</h1>
        <p>
          API status: <strong>{apiStatus}</strong>
        </p>
        <p>
          Reach me directly at <a href={`mailto:${portfolioData.email}`}>{portfolioData.email}</a>
        </p>
      </article>

      <form onSubmit={handleSubmit} className="contact-card reveal-delay">
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
            rows={5}
            required
          />
        </label>

        <button type="submit" className="btn btn-solid" disabled={submitState === "loading"}>
          {submitState === "loading" ? "Sending..." : "Send Message"}
        </button>

        {submitState === "success" && <p className="status-good">Message sent successfully.</p>}
        {submitState === "error" && <p className="status-bad">Unable to send right now.</p>}
      </form>
    </section>
  );
}

export default ContactPage;
