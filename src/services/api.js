import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to add the auth token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Authentication services
export const authService = {
  register: async (userData) => {
    const response = await api.post("/auth/register", userData);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data;
  },
  login: async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data;
  },
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
  getCurrentUser: async () => {
    const response = await api.get("/auth/me");
    return response.data;
  },
};

// User services
export const userService = {
  updateProfile: async (userId, userData) => {
    const response = await api.put(`/users/${userId}`, userData);
    return response.data;
  },
  updatePassword: async (passwordData) => {
    const response = await api.put("/users/updatepassword", passwordData);
    return response.data;
  },
};

// Provider services
export const providerService = {
  getProviders: async (params = {}) => {
    const response = await api.get("/providers", { params });
    return response.data;
  },
  getProvider: async (id) => {
    const response = await api.get(`/providers/${id}`);
    return response.data;
  },
  createProvider: async (providerData) => {
    const response = await api.post("/providers", providerData);
    return response.data;
  },
  updateProvider: async (id, providerData) => {
    const response = await api.put(`/providers/${id}`, providerData);
    return response.data;
  },
};

// Service services
export const serviceService = {
  getServices: async (params = {}) => {
    const response = await api.get("/services", { params });
    return response.data;
  },
  getService: async (id) => {
    const response = await api.get(`/services/${id}`);
    return response.data;
  },
  createService: async (serviceData) => {
    const response = await api.post("/services", serviceData);
    return response.data;
  },
  updateService: async (id, serviceData) => {
    const response = await api.put(`/services/${id}`, serviceData);
    return response.data;
  },
  deleteService: async (id) => {
    const response = await api.delete(`/services/${id}`);
    return response.data;
  },
};

// Booking services
export const bookingService = {
  getBookings: async () => {
    const response = await api.get("/bookings");
    return response.data;
  },
  getBooking: async (id) => {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
  },
  createBooking: async (bookingData) => {
    const response = await api.post("/bookings", bookingData);
    return response.data;
  },
  updateBooking: async (id, bookingData) => {
    const response = await api.put(`/bookings/${id}`, bookingData);
    return response.data;
  },
  deleteBooking: async (id) => {
    const response = await api.delete(`/bookings/${id}`);
    return response.data;
  },
};

// Review services
export const reviewService = {
  getReviews: async (params = {}) => {
    const response = await api.get("/reviews", { params });
    return response.data;
  },
  getReview: async (id) => {
    const response = await api.get(`/reviews/${id}`);
    return response.data;
  },
  createReview: async (reviewData) => {
    const response = await api.post("/reviews", reviewData);
    return response.data;
  },
  updateReview: async (id, reviewData) => {
    const response = await api.put(`/reviews/${id}`, reviewData);
    return response.data;
  },
  deleteReview: async (id) => {
    const response = await api.delete(`/reviews/${id}`);
    return response.data;
  },
};

// Category services
export const categoryService = {
  getCategories: async () => {
    const response = await api.get("/categories");
    return response.data;
  },
  getCategory: async (id) => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  },
};

export default api;
