import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../../core/api';
import { STATUS } from '../constant';

const initialState = {
  data: [],
  status: STATUS.IDLE,
  error: null,
};

export const getAllMessages = createAsyncThunk(
  'chat/getAllMessages',
  async () => {
    const res = await api.get('/messages');
    return res.data;
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    sendMessage: (state, action) => {
      state.data.push(action.payload);
    },
  },
  extraReducers: {
    [getAllMessages.pending]: (state, action) => {
      state.status = STATUS.LOADING;
    },
    [getAllMessages.fulfilled]: (state, action) => {
      state.status = STATUS.SUCCEEDED;
      state.data = action.payload;
    },
    [getAllMessages.rejected]: (state, action) => {
      state.status = STATUS.FAILED;
      state.error = action.error.message;
    },
  },
});

export default chatSlice.reducer;

export const { sendMessage } = chatSlice.actions;

export const selectAllMessages = state => state.chat.data;
