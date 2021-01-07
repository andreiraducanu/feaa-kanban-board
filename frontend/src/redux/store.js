import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './slices/loginSlice';
import signupReducer from './slices/signupSlice';
import projectReducer from './slices/projectSlice';

const store = configureStore({
    reducer: {
        login: loginReducer,
        signup: signupReducer,
        project: projectReducer,
    },
});

export default store;