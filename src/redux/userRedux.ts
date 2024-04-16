import { createSlice, /*current,*/ PayloadAction } from '@reduxjs/toolkit';
import { UserData } from '../types/interfaces';

interface UserState {
  userData: UserData;
}

// interface CommentModel {
//   comment: string,
//   id: string,
// }

// interface QuantityModel {
//   quantity: number,
//   id: string,
// }

const initialState: UserState = {
  userData: JSON.parse(localStorage.getItem('user') || '[]'),
};

const fetchUserFromDB = (state: UserState) => {
  localStorage.setItem('user', JSON.stringify([]));
  console.log(state);
  // state.userData;
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUser: fetchUserFromDB,
  },
});

export const { fetchUser } = userSlice.actions;
export default userSlice.reducer;