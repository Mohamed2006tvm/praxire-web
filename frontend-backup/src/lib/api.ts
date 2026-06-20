import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

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
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        localStorage.removeItem('praxire_token');
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// ─── Auth ────────────────────────────────────────────────
export const authAPI = {
  login: (data: { email: string; password: string }) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/me'),
  register: (data: { name: string; email: string; password: string; role?: string }) => api.post('/auth/register', data),
  changePassword: (data: { currentPassword: string; newPassword: string }) => api.put('/auth/change-password', data),
};

// ─── Contacts ────────────────────────────────────────────
export const contactsAPI = {
  submit: (data: { name: string; email: string; phone?: string; companyName?: string; message: string }) =>
    api.post('/contacts', data),
  getAll: (params?: { page?: number; limit?: number; search?: string }) =>
    api.get('/contacts', { params }),
  markRead: (id: string) => api.put(`/contacts/${id}/read`),
  delete: (id: string) => api.delete(`/contacts/${id}`),
  exportCSV: () => api.get('/contacts/export/csv', { responseType: 'blob' }),
};

// ─── Careers ─────────────────────────────────────────────
export const careersAPI = {
  getAll: () => api.get('/careers'),
  getById: (id: string) => api.get(`/careers/${id}`),
  create: (data: Record<string, unknown>) => api.post('/careers', data),
  update: (id: string, data: Record<string, unknown>) => api.put(`/careers/${id}`, data),
  delete: (id: string) => api.delete(`/careers/${id}`),
  apply: (id: string, formData: FormData) =>
    api.post(`/careers/${id}/apply`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  getApplications: (params?: { status?: string; page?: number }) =>
    api.get('/careers/applications/all', { params }),
  updateStatus: (id: string, status: string) =>
    api.put(`/careers/applications/${id}/status`, { status }),
};

// ─── Internships ─────────────────────────────────────────
export const internshipsAPI = {
  getAll: () => api.get('/internships'),
  create: (data: Record<string, unknown>) => api.post('/internships', data),
  update: (id: string, data: Record<string, unknown>) => api.put(`/internships/${id}`, data),
  delete: (id: string) => api.delete(`/internships/${id}`),
  apply: (id: string, formData: FormData) =>
    api.post(`/internships/${id}/apply`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  getApplications: (params?: { status?: string; page?: number }) =>
    api.get('/internships/applications/all', { params }),
  updateStatus: (id: string, status: string) =>
    api.put(`/internships/applications/${id}/status`, { status }),
};

// ─── Blogs ───────────────────────────────────────────────
export const blogsAPI = {
  getAll: (params?: { category?: string; page?: number }) => api.get('/blogs', { params }),
  getBySlug: (slug: string) => api.get(`/blogs/${slug}`),
  getAdminAll: () => api.get('/blogs/admin/all'),
  create: (data: Record<string, unknown>) => api.post('/blogs', data),
  update: (id: string, data: Record<string, unknown>) => api.put(`/blogs/${id}`, data),
  delete: (id: string) => api.delete(`/blogs/${id}`),
};

// ─── Testimonials ────────────────────────────────────────
export const testimonialsAPI = {
  getAll: () => api.get('/testimonials'),
  create: (data: Record<string, unknown>) => api.post('/testimonials', data),
  update: (id: string, data: Record<string, unknown>) => api.put(`/testimonials/${id}`, data),
  delete: (id: string) => api.delete(`/testimonials/${id}`),
};

// ─── Projects ────────────────────────────────────────────
export const projectsAPI = {
  getAll: (category?: string) => api.get('/projects', { params: category ? { category } : {} }),
  getFeatured: () => api.get('/projects/featured'),
  create: (data: Record<string, unknown>) => api.post('/projects', data),
  update: (id: string, data: Record<string, unknown>) => api.put(`/projects/${id}`, data),
  delete: (id: string) => api.delete(`/projects/${id}`),
};

// ─── Newsletter ──────────────────────────────────────────
export const newsletterAPI = {
  subscribe: (email: string) => api.post('/newsletter', { email }),
  unsubscribe: (email: string) => api.post('/newsletter/unsubscribe', { email }),
};

// ─── Analytics ───────────────────────────────────────────
export const analyticsAPI = {
  getDashboard: () => api.get('/analytics'),
};

export default api;
