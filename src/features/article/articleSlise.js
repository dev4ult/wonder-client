import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import articleService from './articleService';

const initialState = {};

const getArticles = createAsyncThunk('/article/articles', async (_, thunkApi) => {
  try {
    return await articleService.getArticles();
  } catch (err) {
    return thunkApi.rejectWithValue(err.message);
  }
});

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {},
});

export const { reset } = articleSlice.actions;

export default articleSlice.reducer;
