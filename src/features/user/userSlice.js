import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from './userService';

const initialState = {
  users: [],
  admin: null,
  isLoading: false,
  isSuccessfull: false,
  isError: false,
  message: '',
  errorMessages: [],
};

const getAdmins = createAsyncThunk('user/admins', async (token_id, thunkApi) => {
  try {
    return await userService.getAdmins(token_id);
  } catch (err) {
    return thunkApi.rejectWithValue(err.message);
  }
});

const getAdminDetail = createAsyncThunk('user/admin-detail', async (data, thunkApi) => {
  try {
    const { token_id, admin_id } = data;
    return await userService.getAdminDetail(admin_id, token_id);
  } catch (err) {
    return thunkApi.rejectWithValue(err.message);
  }
});

const addAdmin = createAsyncThunk('user/add-admin', async (data, thunkApi) => {
  try {
    const { admin_detail, token_id } = data;
    return await userService.addAdmin(admin_detail, token_id);
  } catch (err) {
    return thunkApi.rejectWithValue(err.response.data.data);
  }
});

const deleteAdmin = createAsyncThunk('user/delete-admin', async (data, thunkApi) => {
  try {
    const { admin_id, token_id } = data;
    return await userService.deleteAdmin(admin_id, token_id);
  } catch (err) {
    return thunkApi.rejectWithValue(err.message);
  }
});

const updateAdmin = createAsyncThunk('user/update-admin', async (data, thunkApi) => {
  try {
    const { admin_detail, admin_id, token_id } = data;
    return await userService.updateAdmin(admin_detail, admin_id, token_id);
  } catch (err) {
    return thunkApi.rejectWithValue(err.response.data.data);
  }
});

export { getAdmins, getAdminDetail, addAdmin, deleteAdmin, updateAdmin };

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
      })
      .addCase(getAdminDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAdminDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.admin = action.payload;
        state.isSuccessfull = true;
      })
      .addCase(getAdminDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.admin = null;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccessfull = true;
        state.message = action.payload;
      })
      .addCase(addAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessages = [];
        for (const key in action.payload) {
          state.errorMessages.push(action.payload[key][0]);
        }
      })
      .addCase(deleteAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccessfull = true;
        state.message = action.payload;
      })
      .addCase(deleteAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccessfull = true;
        state.message = action.payload;
      })
      .addCase(updateAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessages = [];
        for (const key in action.payload) {
          state.errorMessages.push(action.payload[key][0]);
        }
      });
  },
});

export const { reset } = userSlice.actions;

export default userSlice.reducer;
