import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './slices/sessionSlice';
import projectReducer from './slices/projectsSlice';
import issueReducer from './slices/issueSlice';

const store = configureStore({
    reducer: {
        session: sessionReducer,
        projects: projectReducer,
        issue: issueReducer,
    },
});

export default store;