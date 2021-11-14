import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth/authSlice';
import chatReducer from './chat/chatSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
  },
});
