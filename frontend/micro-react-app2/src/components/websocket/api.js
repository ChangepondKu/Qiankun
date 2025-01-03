import axios from 'axios';

const API_URL = 'http://localhost:7878/api';

// Configure axios with auth token
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const productAPI = {
    create: (data) => api.post('/products', JSON.stringify(data)), // Convert data to JSON
    update: (id, data) => api.put(`/products/${id}`, JSON.stringify(data)), // Convert data to JSON
    delete: (id) => api.delete(`/products/${id}`),
    getAll: () => api.get('/products'),
  };
  