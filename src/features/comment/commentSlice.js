import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import commentService from './commentService';

const initialState = {
  isLoading: false,
  isSuccessfull: false,
  isError: false,
  message: '',
};

const commentAPost = createAsyncThunk('comment/post', async (data, thunkApi) => {
  try {
    const { comment, post_type, post_id, token_id } = data;

    return await commentService.commentAPost(comment, post_type, post_id, token_id);
  } catch (err) {
    return thunkApi.rejectWithValue(err.message);
  }
});

export { commentAPost };

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(commentAPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(commentAPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccessfull = true;
        state.message = action.payload;
      })
      .addCase(commentAPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = commentSlice.actions;

export default commentSlice.reducer;
