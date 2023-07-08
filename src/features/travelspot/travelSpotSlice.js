import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import travelSpotService from './travelSpotService';

const initialState = {
  travelSpots: [],
  isLoading: false,
  isSuccessfull: false,
  isError: false,
  message: '',
};

const getTravelSpots = createAsyncThunk('travelspot/allspots', async (_, thunkApi) => {
  try {
    return await travelSpotService.getTravelSpots();
  } catch (err) {
    return thunkApi.rejectWithValue(err.message);
  }
});

const getTravelSpotDetail = createAsyncThunk('travelspot/detail', async (travelSpotId, thunkApi) => {
  try {
    return await travelSpotService.getTravelSpotDetail(travelSpotId);
  } catch (err) {
    return thunkApi.rejectWithValue(err.message);
  }
});

const newTravelSpot = createAsyncThunk('travelspot/newspot', async (data, thunkApi) => {
  try {
    const { form, token_id } = data;
    return await travelSpotService.newTravelSpot(form, token_id);
  } catch (err) {
    return thunkApi.rejectWithValue(err.message);
  }
});

export { getTravelSpots, getTravelSpotDetail, newTravelSpot };

const travelSpotSlice = createSlice({
  name: 'travelspot',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTravelSpots.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTravelSpots.fulfilled, (state, action) => {
        state.isLoading = false;
        state.travelSpots = action.payload.data;
        state.isSuccessfull = true;
      })
      .addCase(getTravelSpots.rejected, (state, action) => {
        state.isLoading = false;
        state.travelSpots = [];
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTravelSpotDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTravelSpotDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.travelSpots = action.payload.data;
        state.isSuccessfull = true;
      })
      .addCase(getTravelSpotDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.travelSpots = [];
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = travelSpotSlice.actions;

export default travelSpotSlice.reducer;
