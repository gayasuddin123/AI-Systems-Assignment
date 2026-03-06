import axios from "axios";
import toast from "react-hot-toast";

const API_BASE = "/api/v1";

const apiClient = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
  timeout: 60000, // AI calls can take time
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
  check: () => axios.get("/api/health"),
};

export default apiClient;