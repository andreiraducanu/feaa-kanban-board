import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './slices/sessionSlice';
import projectsReducer from './slices/projectsSlice';
import issueReducer from './slices/issueSlice';

const store = configureStore({
    reducer: {
        session: sessionReducer,
        projects: projectsReducer,
        issue: issueReducer,
    },
});

export default store;