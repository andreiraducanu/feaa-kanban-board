import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './slices/loginSlice';
import signupReducer from './slices/signupSlice';
import projectReducer from './slices/projectSlice';
import issueReducer from './slices/issueSlice';

const store = configureStore({
    reducer: {
        login: loginReducer,
        signup: signupReducer,
        project: projectReducer,
        issue: issueReducer,
    },
});

export default store;