import { createSlice, /*current,*/ PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '../types/interfaces';

const userData = JSON.parse(localStorage.getItem('userData') || '[]');

const initialState: UserState = {
  token: userData.token,
  isAuthenticated: userData.isAuthenticated,
  isAdmin: userData.isAdmin,
  errorMessage: null,
  email: userData.email,
  _id: userData._id,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<UserState>) => {
      state.token = action.payload.token;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.isAdmin = action.payload.isAdmin;
      state.email = action.payload.email;
      state._id = action.payload._id;
      state.errorMessage = null;

      localStorage.setItem('userData', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.isAdmin = false;
      state.email = null;
      state._id = null;
      state.errorMessage = null;
      
      localStorage.removeItem('userData');
    },
    setLoginError: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
    clearLoginError: (state) => {
      state.errorMessage = null;
    },
  },
});

export const { loginSuccess, logout, setLoginError, clearLoginError } = userSlice.actions;
export default userSlice.reducer;