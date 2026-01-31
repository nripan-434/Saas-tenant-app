import { configureStore } from "@reduxjs/toolkit";
import Auth from './features/AuthSlice'
export const store = configureStore({
    reducer:{
    auth:Auth,
    }

})