import { createSlice } from '@reduxjs/toolkit';

const currentUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

const sessionSlice = createSlice({
    name: 'session',
    initialState: {
        isAuthenticated: currentUser != null,
        user: currentUser,
        jwt: '',
        errorMessage: ''
    },
    reducers: {
        loginSuccess(state, action) {
            const { user, jwt } = action.payload;
            state.user = user
            state.jwt = jwt;
            state.isAuthenticated = true;

            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('jwt', jwt);

            console.log("login")
        },
        logout(state) {
            console.log("logout")
            state.isAuthenticated = false;
            state.user = {}
            state.jwt = ''

            localStorage.removeItem('user');
            localStorage.removeItem('jwt');
        },
        fetchError(state, action) {
            state.errorMessage = action.payload.message
            console.log(state.errorMessage);
        },
    },
});


export const { loginSuccess, fetchError, logout } = sessionSlice.actions

export default sessionSlice.reducer;
