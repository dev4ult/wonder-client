import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import articleService from './articleService';

const initialState = {
  articles: [],
  isLoading: false,
  isSuccessfull: false,
  isError: false,
  message: '',
};

const getArticles = createAsyncThunk('article/allarticle', async (_, thunkApi) => {
  try {
    return await articleService.getArticles();
  } catch (err) {
    return thunkApi.rejectWithValue(err.message);
  }
});

const getArticlesFromUser = createAsyncThunk('article/myarticle', async (data, thunkApi) => {
  try {
    const { user_id, token_id } = data;
    return await articleService.getArticlesFromUser(user_id, token_id);
  } catch (err) {
    return thunkApi.rejectWithValue(err.message);
  }
});

export { getArticles, getArticlesFromUser };

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
