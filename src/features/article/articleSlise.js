import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import articleService from './articleService';

const initialState = {
  articles: [],
  isLoading: false,
  isSuccessfull: false,
  isError: false,
  message: '',
};

const getArticles = createAsyncThunk('/article/articles', async (_, thunkApi) => {
  try {
    return await articleService.getArticles();
  } catch (err) {
    return thunkApi.rejectWithValue(err.message);
  }
});

export { getArticles };

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getArticles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.articles = action.payload.data;
        state.isSuccessfull = true;
      })
      .addCase(getArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.articles = [];
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = articleSlice.actions;

export default articleSlice.reducer;
