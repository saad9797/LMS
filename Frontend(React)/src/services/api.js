import axios from 'axios';

// Create an axios instance pointing at your Railway backend
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,  // reads from your .env
    headers: { 'Content-Type': 'application/json' },
});

// Optional: auto-refresh logic on 401 errors
api.interceptors.response.use(
    res => res,
    async err => {
        const originalReq = err.config;
        if (
            err.response?.status === 401 &&
            !originalReq._retry &&
            localStorage.getItem('refresh_token')
        ) {
            originalReq._retry = true;
            const { data } = await api.post('/token/refresh/', {
                refresh: localStorage.getItem('refresh_token'),
            });
            sessionStorage.setItem('access_token', data.access);
            api.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
            originalReq.headers['Authorization'] = `Bearer ${data.access}`;
            return api(originalReq);
        }
        return Promise.reject(err);
    }
);

export default api;
