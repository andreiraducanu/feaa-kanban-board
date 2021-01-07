import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './slices/sessionSlice';
import projectReducer from './slices/projectSlice';
import issueReducer from './slices/issueSlice';

const store = configureStore({
    reducer: {
        session: sessionReducer,
        project: projectReducer,
        issue: issueReducer,
    },
});

export default store;