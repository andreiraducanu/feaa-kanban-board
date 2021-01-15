import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
        "Accept": "application/json"
    }
});

API.interceptors.request.use(config => {
    const jwt = localStorage.getItem('jwt');

    const path = config.url;

    if (!(path.match('/users/login') || path.match('/users/signup'))) {
        config.headers.Authorization = `Bearer ${jwt}`
    }

    return config;
});

export default API