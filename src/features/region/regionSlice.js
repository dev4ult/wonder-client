import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import regionService from './regionService';

const initialState = {
  provinces: [],
  cities: [],
  isLoading: false,
  isSuccessfull: false,
  isError: false,
  message: '',
};

const getProvinces = createAsyncThunk('region/province', async (_, thunkApi) => {
  try {
    return await regionService.getProvinces();
  } catch (err) {
    return thunkApi.rejectWithValue(err.message);
  }
});

const getCities = createAsyncThunk('region/cities', async (province_id, thunkApi) => {
  try {
    return await regionService.getCities(province_id);
  } catch (err) {
    return thunkApi.rejectWithValue(err.message);
  }
});

export { getProvinces, getCities };

const region = createSlice({
  name: 'region',
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
      .addCase(getProvinces.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProvinces.fulfilled, (state, action) => {
        state.isLoading = false;
        state.provinces = action.payload;
        state.isSuccessfull = true;
      })
      .addCase(getProvinces.rejected, (state, action) => {
        state.isLoading = false;
        state.provinces = [];
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getCities.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cities = action.payload;
        state.isSuccessfull = true;
      })
      .addCase(getCities.rejected, (state, action) => {
        state.isLoading = false;
        state.cities = [];
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = region.actions;

export default region.reducer;
