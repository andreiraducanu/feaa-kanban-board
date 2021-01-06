import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
    name: 'user',
    initialState: {
        user: {},
        token: '',
        errorMessage: ''
    },
    reducers: {
        loginSuccess(state, action) {
            console.log("login")
            state.user = action.payload.user
            state.token = action.payload.jwt
        },
        logoutSuccess(state) {
            console.log("logout")
            state.user = {}
            state.token = ''
        },

        loginFailure(state, action) {
            state.errorMessage = action.payload.message
            console.log(state.errorMessage);
        },
    },
});


export default loginSlice.reducer;

const { loginSuccess, logoutSuccess, loginFailure } = loginSlice.actions

// Actions
export const login = (username, password) => async dispatch => {
    fetch(`http://localhost:8080/user/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({ username: username, password: password })
    })
        .then(res => res.json())
        .then(data => {
            dispatch(loginSuccess(data))
        })
        .catch(err => {
            dispatch(loginFailure({ message: err.message }))
        })
}

// mai trebuie lucrat
export const logout = () => async dispatch => {
    console.log('logout');
    dispatch(logoutSuccess())
}