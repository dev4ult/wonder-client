import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

const initialState = {
  user: null,
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

const setLoginSession = createAsyncThunk('auth/setlogin', async (_, thunkApi) => {
  try {
    return await authService.setLoginSession();
  } catch (err) {
    return thunkApi.rejectWithValue(err.message);
  }
});

export { login, logout, setLoginSession };

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
      })
      .addCase(logout.rejected, (state, action) => {
        reset(state);
        state.user = null;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(setLoginSession.fulfilled, (state, action) => {
        if (action.payload != null) {
          state.isLoading = false;
          state.user = action.payload;
          state.isSuccessfull = true;
        } else {
          reset();
        }
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
