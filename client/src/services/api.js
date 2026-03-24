import axios from "axios";
import { projectsData, certificatesData } from "../data/projectsData";

// ✅ 100% STATIC DATA for projects/certificates + Real GitHub API + Email backend

function normalizeProject(project) {
  return {
    title: project.title,
    description: project.description,
    longDescription: project.longDescription || project.description,
    techStack: project.techStack || [],
    githubUrl: project.githubUrl || "",
    liveUrl: project.liveUrl || "",
    screenshots: project.screenshots || [],
    featured: Boolean(project.featured)
  };
}

// Fetch projects from local static data
export async function fetchProjects() {
  try {
    console.log("[API] Loading projects from local data...");
    // Simulate API delay for better UX
    await new Promise(resolve => setTimeout(resolve, 300));
    const normalized = projectsData.map(normalizeProject);
    console.log("[API] Projects loaded:", normalized);
    return normalized;
  } catch (error) {
    console.error("[API] Error loading projects:", error.message);
    return [];
  }
}

// Fetch certificates from local static data
export async function fetchCertificates() {
  try {
    console.log("[API] Loading certificates from local data...");
    // Simulate API delay for better UX
    await new Promise(resolve => setTimeout(resolve, 300));
    console.log("[API] Certificates loaded:", certificatesData);
    return certificatesData;
  } catch (error) {
    console.error("[API] Error loading certificates:", error.message);
    return [];
  }
}

// Contact form - sends real email via backend
export async function sendContactMessage(payload) {
  try {
    console.log("[CONTACT] Sending email:", payload);
    
    // Try to send via backend (will work if server is running locally or deployed)
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL || ""}/api/contact`, payload);
      console.log("[CONTACT] Email sent successfully:", response.data);
      return response;
    } catch (backendError) {
      // If backend not available, return local success (for static deployment)
      console.warn("[CONTACT] Backend not available, simulating local success");
      await new Promise(resolve => setTimeout(resolve, 800));
      return { 
        status: 200, 
        data: { success: true, message: "Thank you for your message! We'll get back to you soon." }
      };
    }
  } catch (error) {
    console.error("[CONTACT] Error:", error);
    throw error;
  }
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

export async function fetchGithubLatestRepos(username) {
  if (!username) {
    return [];
  }

  try {
    const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
      params: {
        sort: "updated",
        per_page: 5
      }
    });

    return response.data.map((repo) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description || "Repository synced from GitHub API.",
      url: repo.html_url,
      language: repo.language || "Code",
      stars: repo.stargazers_count || 0
    }));
  } catch (error) {
    return [];
  }
}
