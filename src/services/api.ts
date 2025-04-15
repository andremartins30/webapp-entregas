import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://10.120.0.14:3333',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
