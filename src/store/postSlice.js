import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import dbServices from "../appwrite/CRUD.js";

const initialState =  {
    posts: [],
    status: "idle",
    error: null
}

export const getPosts = createAsyncThunk('post/getPosts', async () => {
    return await dbServices.getPosts()
})


export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPosts.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.posts = action.payload
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export default postSlice.reducer;