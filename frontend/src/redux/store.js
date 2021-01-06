import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './slices/loginSlice';
import signupReducer from './slices/signupSlice';

const store = configureStore({
    reducer: {
        login: loginReducer,
        signup: signupReducer,
    },
});

export default store;