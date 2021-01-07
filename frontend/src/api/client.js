import axios from 'axios';
import store from '../redux/store';
import {
    loginSuccessAction,
    fetchErrorAction,
    createProjectAction
} from '../redux/actions';

const API = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
        "Accept": "application/json"
    }
});

API.interceptors.request.use(config => {
    const jwt = store.getState().session.jwt;

    const path = config.url;

    if (!(path.match('/user/login') || path.match('/user/signup'))) {
        config.headers.Authorization = `Bearer ${jwt}`
    }

    return config;
});

export default API