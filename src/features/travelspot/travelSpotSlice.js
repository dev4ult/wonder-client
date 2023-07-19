import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import travelSpotService from './travelSpotService';

const initialState = {
  travelSpots: [],
  travelSpot: null,
  isLoading: false,
  isSuccessfull: false,
  isError: false,
  message: '',
  errorMessages: [],
};

const getTravelSpots = createAsyncThunk('travelspot/all-spots', async (token_id = '', thunkApi) => {
  try {
    if (token_id != '') {
      const token = token_id.split('|')[1];
      return await travelSpotService.getTravelSpots(token);
    } else {
      return await travelSpotService.getTravelSpots();
    }
  } catch (err) {
    return thunkApi.rejectWithValue(err.message);
  }
});

const getTravelSpotsAdmin = createAsyncThunk('travelspot/all-spots-admin', async (token_id, thunkApi) => {
  try {
    return await travelSpotService.getTravelSpotsAdmin(token_id);
  } catch (err) {
    return thunkApi.rejectWithValue(err.message);
  }
});

const getTravelSpotsByUserLike = createAsyncThunk('travelspot/all-spots-liked', async (data, thunkApi) => {
  try {
    const { user_id, token_id } = data;
    return await travelSpotService.getTravelSpotsByUserLike(user_id, token_id);
  } catch (err) {
    return thunkApi.rejectWithValue(err.message);
  }
});

const getTravelSpotDetail = createAsyncThunk('travelspot/detail', async (data, thunkApi) => {
  try {
    const { travelspot_id } = data;
    if (data.hasOwnProperty('token_id')) {
      const { token_id } = data;
      const token = token_id.split('|')[1];
      return await travelSpotService.getTravelSpotDetail(travelspot_id, token);
    } else {
      return await travelSpotService.getTravelSpotDetail(travelspot_id);
    }
  } catch (err) {
    return thunkApi.rejectWithValue(err.message);
  }
});

const getTravelSpotDetailAdmin = createAsyncThunk('travelspot/detail-admin', async (data, thunkApi) => {
  try {
    const { travelspot_id, token_id } = data;
    return await travelSpotService.getTravelSpotDetailAdmin(travelspot_id, token_id);
  } catch (err) {
    return thunkApi.rejectWithValue(err.message);
  }
});

const addTravelSpot = createAsyncThunk('travelspot/new-spot', async (data, thunkApi) => {
  try {
    const { form, token_id } = data;
    return await travelSpotService.addTravelSpot(form, token_id);
  } catch (err) {
    return thunkApi.rejectWithValue(err.response.data.data || err.response.data.message);
  }
});

const updateTravelSpot = createAsyncThunk('travelspot/update-spot', async (data, thunkApi) => {
  try {
    const { form, travelspot_id, token_id } = data;
    return await travelSpotService.updateTravelSpot(form, travelspot_id, token_id);
  } catch (err) {
    return thunkApi.rejectWithValue(err.response.data.data || err.response.data.message);
  }
});

const deleteTravelSpot = createAsyncThunk('travelspot/delete-spot', async (data, thunkApi) => {
  try {
    const { travelspot_id, token_id } = data;
    return await travelSpotService.deleteTravelSpot(travelspot_id, token_id);
  } catch (err) {
    return thunkApi.rejectWithValue(err.message);
  }
});

export { getTravelSpots, getTravelSpotsAdmin, getTravelSpotsByUserLike, getTravelSpotDetail, getTravelSpotDetailAdmin, addTravelSpot, updateTravelSpot, deleteTravelSpot };

const travelSpotSlice = createSlice({
  name: 'travelspot',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccessfull = false;
      state.isError = false;
      state.message = '';
      state.errorMessages = [];
    },
    resetInitial: (state) => initialState,
    resetSpot: (state) => {
      state.travelSpot = null;
      state.isLoading = false;
      state.isSuccessfull = false;
      state.isError = false;
      state.message = '';
      state.errorMessages = [];
    },
    resetSpots: (state) => {
      state.travelSpots = [];
      state.isLoading = false;
      state.isSuccessfull = false;
      state.isError = false;
      state.message = '';
      state.errorMessages = [];
    },
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

      .addCase(getTravelSpotsAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTravelSpotsAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.travelSpots = action.payload.data;
        state.isSuccessfull = true;
      })
      .addCase(getTravelSpotsAdmin.rejected, (state, action) => {
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
        state.travelSpot = action.payload.data;
        state.isSuccessfull = true;
      })
      .addCase(getTravelSpotDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.travelSpot = null;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(addTravelSpot.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTravelSpot.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        state.isSuccessfull = true;
      })
      .addCase(addTravelSpot.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        if (typeof action.payload == 'string') {
          state.message = action.payload;
        } else {
          state.errorMessages = [];
          for (const key in action.payload) {
            state.errorMessages.push(action.payload[key][0]);
          }
        }
      })

      .addCase(updateTravelSpot.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTravelSpot.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        state.isSuccessfull = true;
      })
      .addCase(updateTravelSpot.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        if (typeof action.payload == 'string') {
          state.message = action.payload;
        } else {
          state.errorMessages = [];
          for (const key in action.payload) {
            state.errorMessages.push(action.payload[key][0]);
          }
        }
      })
      .addCase(deleteTravelSpot.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTravelSpot.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        state.isSuccessfull = true;
      })
      .addCase(deleteTravelSpot.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTravelSpotDetailAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTravelSpotDetailAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.travelSpot = action.payload.data;
        state.isSuccessfull = true;
      })
      .addCase(getTravelSpotDetailAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.travelSpot = null;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, resetInitial, resetSpot, resetSpots } = travelSpotSlice.actions;

export default travelSpotSlice.reducer;
