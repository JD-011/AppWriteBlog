import {createSlice} from "@reduxjs/toolkit";
import storageServices from "../appwrite/storage.js";

const initialState =  {
    images: [],
    status: "idle",
    error: null
}

export const imageSlice = createSlice({
    name: "image",
    initialState,
    reducers: {
        getFilePreview: (state, action) => {
            const url = storageServices.getFilePreview(action.payload).href;
            state.images.push({id: action.payload, url});
        }
    },
})

export const {getFilePreview} = imageSlice.actions;

export default imageSlice.reducer;