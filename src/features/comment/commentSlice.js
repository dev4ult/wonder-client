import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import commentService from './commentService';

const initialState = {
  comments: [],
  isLoading: false,
  isSuccessfull: false,
  isError: false,
  message: '',
};

const getCommentsByPost = createAsyncThunk('comment/comments', async (data, thunkApi) => {
  try {
    const { post_type, post_id } = data;

    return await commentService.getCommentsByPost(post_type, post_id);
  } catch (err) {
    return thunkApi.rejectWithValue(err.message);
  }
});

export { getCommentsByPost };

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducer: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccessfull = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducer: (builder) => {
    builder
      .addCase(getCommentsByPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCommentsByPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = action.payload;
        state.isSuccessfull = true;
      })
      .addCase(getCommentsByPost.rejected, (state, action) => {
        state.isLoading = false;
        state.comments = [];
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = commentSlice.actions;

export default commentSlice.reducer;
