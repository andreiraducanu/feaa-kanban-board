import axios from 'axios';
import store from './redux/store';
import {
    loginSuccessAction,
    fetchErrorAction,
    createProjectAction
} from './redux/actions';

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

export const login = (username, password) => async dispatch => {
    API.post('/user/login', {
        username: username,
        password: password
    }).then(res => {
        dispatch(loginSuccessAction(res.data))
    }).catch(err => {
        dispatch(fetchError({ message: "This is an error message from login" }))
    })
};

export const signup = (firstName, lastName, username, password) => async dispatch => {
    API.post('/user/signup', {
        username: username,
        password: password,
        firstname: firstName,
        lastname: lastName
    }).then(res => {
        dispatch(login(username, password))
    }).catch(err => {
        dispatch(fetchError({ message: "This is an error message from signup" }))
    })
}

// Actions
export const createProject = (name, description, username) => async dispatch => {
    API.post('/projects', {
        name: name,
        description: description,
        ownerUsername: username
    }).then(res => {
        dispatch(createProjectAction(res.data))
    }).catch(err => {
        dispatch(fetchError({ message: "This is an error message from addProject" }))
    })
}