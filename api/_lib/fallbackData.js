const fallbackProjects = [
  {
    title: "Realtime Dev Collaboration Hub",
    description:
      "A collaborative coding platform with live cursors, synchronized edits, and role-based workspaces.",
    techStack: ["React", "Node.js", "Socket.IO", "MongoDB"],
    githubUrl: "https://github.com/Soumay0",
    liveUrl: "https://example.com/dev-collab",
    featured: true
  },
  {
    title: "AI Resume Optimizer",
    description:
      "A resume enhancement tool that analyzes role keywords and generates targeted bullet rewrites.",
    techStack: ["React", "Express", "MongoDB", "OpenAI API"],
    githubUrl: "https://github.com/Soumay0",
    liveUrl: "https://example.com/resume-optimizer",
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
