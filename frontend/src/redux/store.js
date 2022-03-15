import { configureStore } from "@reduxjs/toolkit";
import { loadState } from './browser-storage'




export const store = configureStore({
    devTools: true,
    reducer: {
    },
    preloadedState: loadState()
})
