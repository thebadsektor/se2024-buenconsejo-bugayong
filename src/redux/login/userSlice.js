import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const token = localStorage.getItem('accessToken')
  ? localStorage.getItem('accessToken')
  : null;
const initialState = {
  accessToken: token,
  error: '',
  authStatus: token ? 'loggedin' : 'loggedout',
};
const url = 'http://127.0.0.1:3000/api/v1/authentication';

export const fetchUserToken = createAsyncThunk(
  'token/fetchUserToken',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(url, {
        username: credentials.username,
        password: credentials.password,
      });
      localStorage.setItem('accessToken', data.token);
      return data;
    } catch (error) {
      if (error.response && error.response.data.errors) {
        return rejectWithValue(error.response.data.errors);
      }
      return rejectWithValue(error.message);
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('accessToken');
      return {
        ...state,
        accessToken: null,
        error: '',
        authStatus: 'loggedout',
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUserToken.fulfilled, (state, { payload }) => {
        const newState = {
          ...state,
          accessToken: payload.data,
          authStatus: 'loggedin',
        };
        return newState;
      })
      .addCase(fetchUserToken.rejected, (state, { payload }) => {
        const newState = { ...state, authStatus: 'loggedout', error: payload };
        return newState;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
