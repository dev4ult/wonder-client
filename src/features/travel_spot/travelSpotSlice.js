import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import travelSpotService from './travelSpotService';

const initialState = {
  travelSpots: null,
  isLoading: false,
  isSuccessfull: false,
  isError: false,
  message: '',
};

const getAllTravelSpots = createAsyncThunk('/', async (_, thunkApi) => {
  try {
    return await travelSpotService.getAllTravelSpots();
  } catch (err) {
    return thunkApi.rejectWithValue(err.message);
  }
});

const travelSpot = createSlice({
  name: 'travel_spot',
  initialState,
  reducers: {
    reset: (state) => {
      initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTravelSpots.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTravelSpots.fulfilled, (state, action) => {
        state.isLoading = false;
        state.travelSpots = action.payload;
        state.isSuccessfull = true;
      })
      .addCase(getAllTravelSpots.rejected, (state, action) => {
        state.isLoading = false;
        state.travelSpots = null;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = travelSpot.actions;

export default travelSpot.reducer;
