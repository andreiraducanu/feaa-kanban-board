import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface LoginPayload {
    username: string,
    password: string,
}

const userSlice = createSlice({
    name: 'auth',
    initialState: {
        loggedIn: false,
    },
    reducers: {
        login(state, action: PayloadAction<LoginPayload>) {
            const { username, password } = action.payload;

            state.loggedIn = true;
        },
        logout(state, action) {
            state.loggedIn = false;
        }
    },
});

export default userSlice;