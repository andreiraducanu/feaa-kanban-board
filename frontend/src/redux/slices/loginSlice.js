import { createSlice } from '@reduxjs/toolkit';

const currentUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

const loginSlice = createSlice({
    name: 'user',
    initialState: {
        isAuthenticated: currentUser != null,
        user: currentUser,
        token: currentUser != null ? localStorage.getItem('jwt') : '',
        errorMessage: ''
    },
    reducers: {
        loginSuccess(state, action) {
            const { user, jwt } = action.payload;
            console.log("login")
            state.user = user
            state.token = jwt
            state.isAuthenticated = true;

            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('jwt', jwt);
        },
        loginFailure(state, action) {
            state.errorMessage = action.payload.message
            console.log(state.errorMessage);
        },
        logout(state) {
            console.log("logout")
            state.isAuthenticated = false;
            state.user = {}
            state.token = ''

            localStorage.removeItem('user');
            localStorage.removeItem('jwt');
        },
    },
});


export default loginSlice.reducer;

const { loginSuccess, loginFailure } = loginSlice.actions

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
            dispatch(loginFailure({ message: "This is an error message" }))
        })
}

export const { logout } = loginSlice.actions;