import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import travelSpotService from './travelSpotService';

const initialState = {
  travelSpots: [],
  isLoading: false,
  isSuccessfull: false,
  isError: false,
  message: '',
};

const getTravelSpots = createAsyncThunk('/', async (_, thunkApi) => {
  try {
    return await travelSpotService.getTravelSpots();
  } catch (err) {
    return thunkApi.rejectWithValue(err.message);
  }
});

export { getTravelSpots };

const travelSpot = createSlice({
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
        state.travelSpots = action.payload;
        state.isSuccessfull = true;
      })
      .addCase(getTravelSpots.rejected, (state, action) => {
        state.isLoading = false;
        state.travelSpots = [];
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = travelSpot.actions;

export default travelSpot.reducer;
