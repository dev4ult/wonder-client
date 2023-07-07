import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';
import { getCookie } from './cookieFunc';

const user = {
  w_token_id: getCookie('w_token_id'),
  w_user_id: getCookie('w_user_id'),
  w_username: getCookie('w_username'),
};

const initialState = {
  user: user.w_token_id ? user : null,
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
    return thunkApi.rejectWithValue('Email atau Password salah');
  }
});

const logout = createAsyncThunk('auth/logout', async (_, thunkApi) => {
  try {
    return await authService.logout();
  } catch (err) {
    return thunkApi.rejectWithValue(err.message);
  }
});

const setUserDetail = createAsyncThunk('auth/profile', async (userData, thunkApi) => {
  try {
    const { token_id, user_id } = userData;

    return await authService.setUserDetail(token_id, user_id);
  } catch (err) {
    return thunkApi.rejectWithValue(err.message);
  }
});

export { login, logout, setUserDetail };

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
        state.user = null;
        state.message = 'logget out';
      })
      .addCase(logout.rejected, (state, action) => {
        reset(state);
        state.user = null;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(setUserDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isSuccessfull = true;
      })
      .addCase(setUserDetail.rejected, (state, action) => {
        reset(state);
        state.user = null;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
