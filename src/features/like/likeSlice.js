import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import likeService from './likeService';

const initialState = {
  isLoading: false,
  isSuccessfull: false,
  isError: false,
  message: '',
};

const likeAPost = createAsyncThunk('like/post', async (data, thunkApi) => {
  try {
    const { like, post_type, post_id, token_id } = data;

    return await likeService.likeAPost(like, post_type, post_id, token_id);
  } catch (err) {
    return thunkApi.rejectWithValue(err.message);
  }
});

export { likeAPost };

const likeSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(likeAPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(likeAPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccessfull = true;
        state.message = action.payload;
      })
      .addCase(likeAPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = likeSlice.actions;

export default likeSlice.reducer;
