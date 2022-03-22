import { configureStore } from "@reduxjs/toolkit";
import { loadState } from './browser-storage'
import authReducer from '../redux/features/auth/authSlice'




export const store = configureStore({
    devTools: true,
    reducer: {
        auth: authReducer,
    },
    preloadedState: loadState()
})
