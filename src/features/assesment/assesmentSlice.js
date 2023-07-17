import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import assesmentService from './assesmentService';

const initialState = {
  allAssesments: [],
  assesment: null,
  isLoading: false,
  isSuccessfull: false,
  isError: false,
  message: '',
  errorMessages: [],
};

const getAllAssesments = createAsyncThunk('assesment/all', async (token_id, thunkApi) => {
  try {
    return await assesmentService.getAllAssesments(token_id);
  } catch (err) {
    return thunkApi.rejectWithValue(err.message);
  }
});

const getAssesmentDetail = createAsyncThunk('assesment/detail', async (data, thunkApi) => {
  try {
    const { travelspot_id, token_id } = data;
    return await assesmentService.getAssesmentDetail(travelspot_id, token_id);
  } catch (err) {
    return thunkApi.rejectWithValue(err.message);
  }
});

const addAssesment = createAsyncThunk('assesment/add', async (data, thunkApi) => {
  try {
    const { assesment_detail, travelspot_id, token_id } = data;
    return await assesmentService.addAssesment(assesment_detail, travelspot_id, token_id);
  } catch (err) {
    return thunkApi.rejectWithValue(err.response.data.data || err.response.data.message);
  }
});

const deleteAssesment = createAsyncThunk('assesment/delete', async (_, thunkApi) => {
  try {
    const { travelspot_id, token_id } = data;

    return await assesmentService.deleteAssesment(travelspot_id, token_id);
  } catch (err) {
    return thunkApi.rejectWithValue(err.message);
  }
});

const updateAssesment = createAsyncThunk('assesment/update', async (data, thunkApi) => {
  try {
    const { assesment_detail, travelspot_id, token_id } = data;
    return await assesmentService.updateAssesment(assesment_detail, travelspot_id, token_id);
  } catch (err) {
    return thunkApi.rejectWithValue(err.message);
  }
});

export { getAllAssesments, getAssesmentDetail, addAssesment, updateAssesment, deleteAssesment };

const assesmentSlice = createSlice({
  name: 'assesment',
  initialState,
  reducers: {
    reset: (state) => {
      state.allAssesments = [];
      state.isLoading = false;
      state.isSuccessfull = false;
      state.isError = false;
      state.message = '';
      state.errorMessages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAssesments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllAssesments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccessfull = true;
        state.allAssesments = action.payload.data;
      })
      .addCase(getAllAssesments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.allAssesments = [];
        state.message = action.payload;
      })
      .addCase(addAssesment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAssesment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccessfull = true;
        state.message = action.payload;
      })
      .addCase(addAssesment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.assesment = null;
        state.errorMessages = [];
        for (const key in action.payload) {
          state.errorMessages.push(action.payload[key][0]);
        }
      })
      .addCase(deleteAssesment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAssesment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccessfull = true;
        state.message = action.payload;
      })
      .addCase(deleteAssesment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.assesment = null;
        state.message = action.payload;
      })
      .addCase(updateAssesment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAssesment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccessfull = true;
        state.message = action.payload;
      })
      .addCase(updateAssesment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.assesment = null;
        state.errorMessages = [];
        for (const key in action.payload) {
          state.errorMessages.push(action.payload[key][0]);
        }
      })
      .addCase(getAssesmentDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAssesmentDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccessfull = true;
        state.assesment = action.payload.data;
      })
      .addCase(getAssesmentDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.assesment = null;
        state.message = action.payload;
      });
  },
});

export const { reset } = assesmentSlice.actions;

export default assesmentSlice.reducer;
