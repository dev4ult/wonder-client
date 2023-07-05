import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import travelSpotReducer from '../features/travelspot/travelSpotSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    travelspot: travelSpotReducer,
  },
});

export default store;
