import axios from "axios";
import toast from "react-hot-toast";

// ── Dynamic API URL ───────────────────────────
// Development → Vite proxy handles it (/api/v1)
// Production  → Points to your Vercel backend URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api/v1";

console.log("API Base URL:", API_BASE_URL);

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 60000,
});

// Response interceptor for global error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.error ||
      error.response?.data?.errors?.[0]?.message ||
      error.message ||
      "An unexpected error occurred";

    if (error.response?.status !== 404) {
      toast.error(message);
    }

    return Promise.reject(error);
  }
);

// ── Module 1: Category API ─────────────────────
export const categoryAPI = {
  categorize: (data) => apiClient.post("/categorize/", data),
  batchCategorize: (products) =>
    apiClient.post("/categorize/batch", { products }),
  getHistory: (limit = 50, skip = 0) =>
    apiClient.get(`/categorize/history?limit=${limit}&skip=${skip}`),
  getById: (id) => apiClient.get(`/categorize/${id}`),
};

// ── Module 2: Proposal API ─────────────────────
export const proposalAPI = {
  create: (data) => apiClient.post("/proposals/", data),
  list: (limit = 50, skip = 0) =>
    apiClient.get(`/proposals?limit=${limit}&skip=${skip}`),
  getById: (id) => apiClient.get(`/proposals/${id}`),
};

// ── Health check ────────────────────────────────
export const healthAPI = {
  check: () => {
    const base = import.meta.env.VITE_API_BASE_URL;
    if (base) {
      // Production — call Vercel backend directly
      const healthUrl = base.replace("/api/v1", "/api/health");
      return axios.get(healthUrl);
    }
    // Development — use proxy
    return axios.get("/api/health");
  },
};

export default apiClient;