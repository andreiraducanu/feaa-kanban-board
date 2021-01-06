import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login } from './authSlice'

const initialUser = null

const registerSlice = createSlice({
    name: 'register',
    initialState: {
        user: initialUser,
    },
    reducers: {
        registerSuccess(state) {
            console.log("register")
        },
    },
});


export default registerSlice

const { registerSuccess } = registerSlice.actions

// Actions

export const register = (firstName: string, lastName: string, username: string, password: string) => async dispatch => {
    fetch(`http://localhost:8080/user/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({ firstName: firstName, lastName: lastName, username: username, password: password })
    })
        .then(res => {
            if (res.status === 200) {
                dispatch(registerSuccess())
                dispatch(login(username, password))
            }
        })
}