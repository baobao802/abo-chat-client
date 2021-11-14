import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import localStore from '../../utils/localStore';
import { STATUS } from '../constant';

const initialState = {
  data: null,
  status: STATUS.IDLE,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }) => {
    try {
      const res = await axios.post('http://localhost:8080/api/v1/auth/login', {
        email,
        password,
      });

      return res.data;
    } catch (error) {
      const message = error?.response?.data?.message;
      return message;
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginFake: (state, action) => {
      state.data = action.payload;
      localStore.setItem('sender', action.payload);
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.status = STATUS.LOADING;
    },
    [login.fulfilled]: (state, action) => {
      state.status = STATUS.SUCCEEDED;
      state.data = action.payload;
      localStorage.setItem('auth', JSON.stringify(action.payload));
    },
    [login.rejected]: (state, action) => {
      state.status = STATUS.FAILED;
      state.error = action.payload;
    },
  },
});

export default authSlice.reducer;

export const { loginFake } = authSlice.actions;

export const selectUserLoggedIn = state => state.auth.data;
