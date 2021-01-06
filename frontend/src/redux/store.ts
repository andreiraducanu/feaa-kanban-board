import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './slices';

const store = configureStore({
    reducer: {
        user: authSlice.reducer,
    },
});

export default store;