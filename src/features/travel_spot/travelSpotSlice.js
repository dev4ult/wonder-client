import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import travelSpotService from './travelSpotService';

const getAllTravelSpots = createAsyncThunk('/', async (_, thunkApi) => {
  try {
    return await travelSpotService.getAllTravelSpots();
  } catch (err) {
    return thunkApi.rejectWithValue(err.message);
  }
});

const initialState = {
  travelSpots: null,
  isLoading: false,
  isSuccessfull: false,
  isError: false,
  message: '',
};

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
      .addCase(getAllPlaces.isLoading, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPlaces.isSuccessfull, (state, action) => {
        state.isLoading = false;
        state.travelSpots = action.payload;
        state.isSuccessfull = true;
      })
      .addCase(getAllPlaces.isError, (state, action) => {
        state.isLoading = false;
        state.travelSpots = null;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = travelSpot.actions;

export default travelSpot.reducer;
