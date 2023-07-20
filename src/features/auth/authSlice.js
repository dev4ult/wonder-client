import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';
import { getCookie } from './cookieFunc';

const user = {
  w_token_id: getCookie('w_token_id'),
  w_user_id: getCookie('w_user_id'),
  w_username: getCookie('w_username'),
  w_foto: getCookie('w_foto'),
};

const initialState = {
  user: user.w_token_id ? user : null,
  // csrf_token:
  isLoading: false,
  isSuccessfull: false,
  isError: false,
  message: '',
  errorMessages: [],
};

const index = createAsyncThunk('auth/first-hit', async (_, thunkApi) => {
  try {
    return await authService.index();
  } catch (err) {
    return thunkApi.rejectWithValue(err.message || 'first hit error');
  }
});

const login = createAsyncThunk('auth/login', async (userData, thunkApi) => {
  try {
    const { email, password } = userData;

    return await authService.login(email, password);
  } catch (err) {
    return thunkApi.rejectWithValue('Email atau Password salah');
  }
});

const register = createAsyncThunk('auth/register', async (data, thunkApi) => {
  try {
    const { username, email, password } = data;

    return await authService.register(username, email, password);
  } catch (err) {
    return thunkApi.rejectWithValue(err.response.data.data || err.response.data.message);
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

export { index, login, register, logout, setUserDetail };

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

      .addCase(index.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccessfull = true;
        state.message = 'First hit';
      })

      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isSuccessfull = true;
        state.message = 'Login Berhasil!';
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccessfull = true;
        state.message = 'Registrasi Berhasil!';
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isError = true;
        state.errorMessages = [];
        for (const key in action.payload) {
          state.errorMessages.push(action.payload[key][0]);
        }
      })

      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.message = 'Logget out';
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
