import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import criteriaService from './criteriaService';

const initialState = {
  allCriterias: [],
  criteria: null,
  isLoading: false,
  isSuccessfull: false,
  isError: false,
  message: '',
};

const getAllCriterias = createAsyncThunk('criteria/all', async (token_id, thunkApi) => {
  try {
    return await criteriaService.getAllCriterias(token_id);
  } catch (err) {
    return thunkApi.rejectWithValue(err.message);
  }
});

const getCriteriaDetail = createAsyncThunk('criteria/detail', async (data, thunkApi) => {
  try {
    const { criteria_id, token_id } = data;
    return await criteriaService.getCriteriaDetail(criteria_id, token_id);
  } catch (err) {
    return thunkApi.rejectWithValue(err.message);
  }
});

const updateCriteria = createAsyncThunk('criteria/update', async (data, thunkApi) => {
  try {
    const { criteria_detail, criteria_id, token_id } = data;
    return await criteriaService.updateCriteria(criteria_detail, criteria_id, token_id);
  } catch (err) {
    return thunkApi.rejectWithValue(err.message);
  }
});

export { getAllCriterias, getCriteriaDetail, updateCriteria };

const criteriaSlice = createSlice({
  name: 'criteria',
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
      .addCase(getAllCriterias.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCriterias.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccessfull = true;
        state.allCriterias = action.payload.data;
      })
      .addCase(getAllCriterias.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.allCriterias = [];
        state.message = action.payload;
      })
      .addCase(getCriteriaDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCriteriaDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccessfull = true;
        state.criteria = action.payload.data;
      })
      .addCase(getCriteriaDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.criteria = null;
        state.message = action.payload;
      })
      .addCase(updateCriteria.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCriteria.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccessfull = true;
        state.message = action.payload;
      })
      .addCase(updateCriteria.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.criteria = null;
        state.message = action.payload;
      });
  },
});

export const { reset } = criteriaSlice.actions;

export default criteriaSlice.reducer;
