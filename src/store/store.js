import {configureStore} from "@reduxjs/toolkit";
import authReducer from './authSlice'
import postReducer from './postSlice'
import imageReducer from './imageSlice.js'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        post: postReducer,
        image: imageReducer,
    }
});