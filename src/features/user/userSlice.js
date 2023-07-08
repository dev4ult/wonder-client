import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from './userService';

const initialState = {
  users: [],
  isLoading: false,
  isSuccessfull: false,
  isError: false,
  message: '',
};

const getAdmins = createAsyncThunk('user/admins', async (token_id, thunkApi) => {
  try {
    return userService.getAdmins(token_id);
  } catch (err) {
    return thunkApi.rejectWithValue(err.message);
  }
});

export { getAdmins };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccessfull = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdmins.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(getAdmins.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
        state.isSuccessfull = true;
      })
      .addCase(getAdmins.rejected, (state, action) => {
        state.isLoading = false;
        state.users = [];
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = userSlice.actions;

export default userSlice.reducer;
