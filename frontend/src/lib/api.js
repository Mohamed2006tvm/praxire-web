import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token to requests
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('praxire_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      if (
        window.location.pathname.startsWith('/founders-room') &&
        window.location.pathname !== '/founders-room/login'
      ) {
        localStorage.removeItem('praxire_token');
        window.location.href = '/founders-room/login';
      }
    }
    return Promise.reject(error);
  }
);

// ─── Auth ────────────────────────────────────────────────
export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/me'),
  register: (data) => api.post('/auth/register', data),
  changePassword: (data) => api.put('/auth/change-password', data),
};

// ─── Contacts ────────────────────────────────────────────
export const contactsAPI = {
  submit: (data) =>
    api.post('/contacts', data),
  getAll: (params) =>
    api.get('/contacts', { params }),
  markRead: (id) => api.put(`/contacts/${id}/read`),
  delete: (id) => api.delete(`/contacts/${id}`),
  exportCSV: () => api.get('/contacts/export/csv', { responseType: 'blob' }),
};

// ─── Careers ─────────────────────────────────────────────
export const careersAPI = {
  getAll: (params) => api.get('/careers', { params }),
  getAdminAll: () => api.get('/careers', { params: { includeInactive: true } }),
  getById: (id) => api.get(`/careers/${id}`),
  create: (data) => api.post('/careers', data),
  update: (id, data) => api.put(`/careers/${id}`, data),
  delete: (id) => api.delete(`/careers/${id}`),
  apply: (id, formData) =>
    api.post(`/careers/${id}/apply`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  getApplications: (params) =>
    api.get('/careers/applications/all', { params }),
  updateStatus: (id, status) =>
    api.put(`/careers/applications/${id}/status`, { status }),
};

// ─── Internships ─────────────────────────────────────────
export const internshipsAPI = {
  getAll: (params) => api.get('/internships', { params }),
  getAdminAll: () => api.get('/internships', { params: { includeInactive: true } }),
  getById: (id) => api.get(`/internships/${id}`),
  create: (data) => api.post('/internships', data),
  update: (id, data) => api.put(`/internships/${id}`, data),
  delete: (id) => api.delete(`/internships/${id}`),
  apply: (id, formData) =>
    api.post(`/internships/${id}/apply`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  getApplications: (params) =>
    api.get('/internships/applications/all', { params }),
  updateStatus: (id, status) =>
    api.put(`/internships/applications/${id}/status`, { status }),
};

// ─── Blogs ───────────────────────────────────────────────
export const blogsAPI = {
  getAll: (params) => api.get('/blogs', { params }),
  getBySlug: (slug) => api.get(`/blogs/${slug}`),
  getAdminAll: () => api.get('/blogs/admin/all'),
  create: (data) => api.post('/blogs', data),
  update: (id, data) => api.put(`/blogs/${id}`, data),
  delete: (id) => api.delete(`/blogs/${id}`),
};

// ─── Testimonials ────────────────────────────────────────
export const testimonialsAPI = {
  getAll: () => api.get('/testimonials'),
  create: (data) => api.post('/testimonials', data),
  update: (id, data) => api.put(`/testimonials/${id}`, data),
  delete: (id) => api.delete(`/testimonials/${id}`),
};

// ─── Projects ────────────────────────────────────────────
export const projectsAPI = {
  getAll: (category) => api.get('/projects', { params: category ? { category } : {} }),
  getFeatured: () => api.get('/projects/featured'),
  create: (data) => api.post('/projects', data),
  update: (id, data) => api.put(`/projects/${id}`, data),
  delete: (id) => api.delete(`/projects/${id}`),
};

// ─── Newsletter ──────────────────────────────────────────
export const newsletterAPI = {
  subscribe: (email) => api.post('/newsletter', { email }),
  unsubscribe: (email) => api.post('/newsletter/unsubscribe', { email }),
};

// ─── Analytics ───────────────────────────────────────────
export const analyticsAPI = {
  getDashboard: () => api.get('/analytics'),
};

// ─── Chat Assistant ──────────────────────────────────────
export const chatAPI = {
  sendMessage: (messages) =>
    api.post('/chat', { messages }),
};

export default api;
