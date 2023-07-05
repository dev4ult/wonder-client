import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import travelSpotReducer from '../features/travel_spot/travelSpotSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    travelSpot: travelSpotReducer,
  },
});

export default store;
