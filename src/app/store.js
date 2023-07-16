import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import travelSpotReducer from '../features/travelspot/travelSpotSlice';
import articleReducer from '../features/article/articleSlice';
import regionReducer from '../features/region/regionSlice';
import userReducer from '../features/user/userSlice';
import commentReducer from '../features/comment/commentSlice';
import likeReducer from '../features/like/likeSlice';
import assesmentReducer from '../features/assesment/assesmentSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    travelspot: travelSpotReducer,
    article: articleReducer,
    region: regionReducer,
    user: userReducer,
    comment: commentReducer,
    like: likeReducer,
    assesmentReducer: assesmentReducer,
  },
});

export default store;
