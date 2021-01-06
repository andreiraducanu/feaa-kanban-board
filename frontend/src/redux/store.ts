import { configureStore } from '@reduxjs/toolkit';
import { authSlice, registerSlice } from './slices';

const store = configureStore({
    reducer: {
        login: authSlice.reducer,
        register: registerSlice.reducer,
    },
});

export default store;