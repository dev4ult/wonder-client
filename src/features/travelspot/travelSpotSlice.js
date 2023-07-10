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

const getTravelSpotsByUserLike = createAsyncThunk('travelspot/allspots', async (data, thunkApi) => {
  try {
    const { user_id, token_id } = data;
    return await travelSpotService.getTravelSpotsByUserLike(user_id, token_id);
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

const addTravelSpot = createAsyncThunk('travelspot/newspot', async (data, thunkApi) => {
  try {
    const { form, token_id } = data;
    return await travelSpotService.addTravelSpot(form, token_id);
  } catch (err) {
    return thunkApi.rejectWithValue(err.message);
  }
});

const updateTravelSpot = createAsyncThunk('travelspot/updatespot', async (data, thunkApi) => {
  try {
    const { form, travelspot_id, token_id } = data;
    return await travelSpotService.addTravelSpot(form, travelspot_id, token_id);
  } catch (err) {
    return thunkApi.rejectWithValue(err.message);
  }
});

const deleteTravelSpot = createAsyncThunk('travelspot/deletespot', async (data, thunkApi) => {
  try {
    const { travelspot_id, token_id } = data;
    return await travelSpotService.deleteTravelSpot(travelspot_id, token_id);
  } catch (err) {
    return thunkApi.rejectWithValue(err.message);
  }
});

export { getTravelSpots, getTravelSpotsByUserLike, getTravelSpotDetail, addTravelSpot, updateTravelSpot, deleteTravelSpot };

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
