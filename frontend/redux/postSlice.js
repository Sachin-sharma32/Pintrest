import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    posts: [],
    error: "",
};

export const fetchPosts = createAsyncThunk("post/fetchPosts", async () => {
    const response = await axios.get("http://localhost:8000/api/posts");
    return response.data.data.posts;
});

const postSlice = createSlice({
    name: "post",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.posts = action.payload;
            state.loading = false;
            state.error = null;
            console.log(state.posts);
        });
        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.loading = false;
            state.posts = [];
            state.error = action.error;
        });
    },
});

export default postSlice.reducer
