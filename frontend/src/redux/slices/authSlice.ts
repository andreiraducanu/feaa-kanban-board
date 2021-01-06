import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialUser = null

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: initialUser,
    },
    reducers: {
        loginSuccess(state, action) {
            console.log("login")
            state.user = action.payload
            localStorage.setItem('user', JSON.stringify(action.payload))

        },
        logoutSuccess(state, action) {
            state.user = null
            localStorage.removeItem('user')
        }
    },
});


export default userSlice

const { loginSuccess, logoutSuccess } = userSlice.actions

// Actions

export const login = (username: string, password: string) => async dispatch => {
    //dispatch(loginSuccess({ username }));

    console.log('test');

    fetch(`http://localhost:8080/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({ username: username, password: password })
    })
        .then(res => res.json())
        .then(data => {
            localStorage.setItem("token", data.token)
            dispatch(loginSuccess(data.user))
        })
}