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
    reducers: {
        removeData: (state) => {
            state.posts = [];
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPosts.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                if(action.payload){
                    state.status = 'succeeded'
                    state.posts = action.payload
                }else {
                    state.status = 'idle'
                }
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export const {removeData} = postSlice.actions;

export default postSlice.reducer;