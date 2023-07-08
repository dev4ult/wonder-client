import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import travelSpotReducer from '../features/travelspot/travelSpotSlice';
import articleReducer from '../features/article/articleSlise';
import regionReducer from '../features/region/regionSlice';
import userReducer from '../features/user/userSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    travelspot: travelSpotReducer,
    article: articleReducer,
    region: regionReducer,
    user: userReducer,
  },
});

export default store;
