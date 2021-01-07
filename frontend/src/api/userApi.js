import {
    loginSuccessAction,
    fetchErrorAction,
} from '../redux/actions';

import API from './client'

export const login = (username, password) => async dispatch => {
    API.post('/user/login', {
        username: username,
        password: password
    }).then(res => {
        dispatch(loginSuccessAction(res.data))
    }).catch(err => {
        dispatch(fetchErrorAction({ message: "This is an error message from login" }))
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
        dispatch(fetchErrorAction({ message: "This is an error message from signup" }))
    })
}