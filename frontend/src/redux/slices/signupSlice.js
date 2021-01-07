import { createSlice } from '@reduxjs/toolkit';
import { login } from './loginSlice'

const initialUser = null

const signupSlice = createSlice({
    name: 'signup',
    initialState: {
        user: initialUser,
    },
    reducers: {
        signupSuccess(state) {
            console.log("signup")
        },
    },
});


export default signupSlice.reducer;

const { signupSuccess } = signupSlice.actions

// Actions

export const signup = (firstName, lastName, username, password) => async dispatch => {
    console.log("here")
    fetch(`http://localhost:8080/user/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({ firstName: firstName, lastName: lastName, username: username, password: password })
    })
        .then(res => {
            if (res.status === 200) {
                dispatch(signupSuccess())
                dispatch(login(username, password))
            }
        })
}