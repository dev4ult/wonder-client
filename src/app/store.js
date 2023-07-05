import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import travelSpotReducer from '../features/travelspot/travelSpotSlice';
import articleReducer from '../features/article/articleSlise';

const store = configureStore({
  reducer: {
    auth: authReducer,
    travelspot: travelSpotReducer,
    article: articleReducer,
  },
});

export default store;
