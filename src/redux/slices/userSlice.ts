import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import UserState from '../../interfaces/user.interface';

const userSlice = createSlice({
	name: 'user',
	initialState: {
		uid: '',
		email: '',
		isLoading: false,
		error: '',
	},
	reducers: {
		signOut: (state: UserState) => {
			state.isLoading = true;
		},

		signOutSuccess: (state: UserState) => {
			state.isLoading = false;
			state.uid = '';
			state.email = '';
			state.error = '';
		},

		authError: (state: UserState, action: PayloadAction<Error>) => {
			state.error = action.payload.message;
		},

		clearError: (state: UserState) => {
			state.error = '';
		},

		checkAuthSuccess: (state: UserState, action: PayloadAction<UserState>) => {
			state.uid = action.payload.uid;
			state.email = action.payload.email;
			state.isLoading = false;
			state.error = '';
		},
	},
});

export const {
	signOut,
	signOutSuccess,
	authError,
	clearError,
	checkAuthSuccess,
} = userSlice.actions;

export default userSlice.reducer;
