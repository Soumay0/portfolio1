const fallbackProjects = [
  {
    title: "Portfolio Website",
    description:
      "A modern developer portfolio with API-driven sections, smooth animations, and production-ready deployment.",
    techStack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    githubUrl: "https://github.com/Soumay0/portfolio1",
    liveUrl: "https://github.com/Soumay0/portfolio1",
    featured: true
  },
  {
    title: "GitHub Projects Showcase",
    description:
      "A dynamic portfolio projects section that automatically syncs repositories via the GitHub API.",
    techStack: ["React", "Axios", "GitHub API"],
    githubUrl: "https://github.com/Soumay0",
    liveUrl: "https://github.com/Soumay0",
    featured: true
  }
];

const fallbackCertificates = [
  {
    title: "Full Stack Web Development",
    issuer: "Udemy",
    date: "2025",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "JavaScript Advanced Concepts",
    issuer: "Frontend Masters",
    date: "2025",
    imageUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "MongoDB Associate",
    issuer: "MongoDB University",
    date: "2024",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80"
  }
];

module.exports = {
  fallbackProjects,
  fallbackCertificates
};
