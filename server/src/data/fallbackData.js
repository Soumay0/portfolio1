const fallbackProjects = [
  {
    title: "MedConnect",
    description:
      "Full-stack medical appointment booking website where patients can search doctors, create accounts, and manage appointments with secure validation.",
    techStack: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    githubUrl: "https://github.com/Soumay0",
    liveUrl: "https://github.com/Soumay0",
    featured: true
  },
  {
    title: "CPU Scheduling Simulator",
    description:
      "Simulator implementing FCFS, SJF, Priority, and Round Robin algorithms with process queue handling and comparative metrics.",
    techStack: ["C", "C++"],
    githubUrl: "https://github.com/Soumay0",
    liveUrl: "https://github.com/Soumay0",
    featured: true
  },
  {
    title: "Uni-Portal",
    description:
      "MERN-based university event management platform with role-based access for users, proposers, and administrators, advanced filtering, and secure JWT authentication.",
    techStack: ["React", "Tailwind CSS", "Framer Motion", "Node.js", "Express", "MongoDB", "JWT"],
    githubUrl: "https://github.com/Soumay0",
    liveUrl: "https://github.com/Soumay0",
    featured: true
  },
  {
    title: "Student Management API",
    description:
      "RESTful API for student records management with CRUD operations, validation, and scalable backend architecture for academic workflows.",
    techStack: ["Node.js", "Express", "MongoDB", "REST API"],
    githubUrl: "https://github.com/Soumay0",
    liveUrl: "https://github.com/Soumay0",
    featured: true
  }
];

const fallbackCertificates = [
  {
    title: "Introduction to Hardware and Operating Systems",
    issuer: "Coursera",
    date: "Sept 2024",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "The Bits and Bytes of Computer Networking",
    issuer: "Coursera",
    date: "Oct 2024",
    imageUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80"
  }
];

module.exports = {
  fallbackProjects,
  fallbackCertificates
};
