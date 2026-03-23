import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || ""
});

function normalizeProject(project) {
  return {
    title: project.title,
    description: project.description,
    techStack: project.techStack || [],
    githubUrl: project.githubUrl || "#",
    liveUrl: project.liveUrl || "#"
  };
}

export async function fetchProjects() {
  const response = await api.get("/api/projects");
  return (response.data?.data || []).map(normalizeProject);
}

export async function fetchCertificates() {
  const response = await api.get("/api/certificates");
  return response.data?.data || [];
}

export async function sendContactMessage(payload) {
  return api.post("/api/contact", payload);
}

export async function fetchGithubProjects(username) {
  if (!username) {
    return [];
  }

  try {
    const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
      params: {
        sort: "updated",
        per_page: 4
      }
    });

    return response.data.map((repo) => ({
      title: repo.name,
      description: repo.description || "GitHub repository synced automatically.",
      techStack: [repo.language].filter(Boolean),
      githubUrl: repo.html_url,
      liveUrl: repo.homepage || repo.html_url
    }));
  } catch (error) {
    return [];
  }
}
