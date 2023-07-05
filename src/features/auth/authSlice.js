import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  isLoading: false,
  isSuccessfull: false,
  isError: false,
  message: '',
};

const login = createAsyncThunk('auth/login', async (userData, thunkApi) => {
  try {
    const { email, password } = userData;

    return await authService.login(email, password);
  } catch (err) {
    return thunkApi.rejectWithValue(err.message);
  }
});

const logout = createAsyncThunk('auth/logout', async (_, thunkApi) => {
  try {
    return await authService.logout();
  } catch (err) {
    return thunkApi.rejectWithValue(err.message);
  }
});

export { login, logout };

const authSlice = createSlice({
  name: 'auth',
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
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isSuccessfull = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        reset(state);
        localStorage.removeItem('user');
      })
      .addCase(logout.rejected, (state, action) => {
        reset(state);
        state.user = null;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
