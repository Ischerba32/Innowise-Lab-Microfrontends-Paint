import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import AuthFormParams from '../../interfaces/authForm.interface';
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
		signIn: (state: UserState, action: PayloadAction<AuthFormParams>) => {
			state.isLoading = true;
		},
		signInSuccess: (state: UserState, action: PayloadAction<UserState>) => {
			state.uid = action.payload.uid;
			state.email = action.payload.email;
			state.isLoading = false;
			state.error = '';
		},

		signUp: (state: UserState, action: PayloadAction<AuthFormParams>) => {
			state.isLoading = true;
		},

		signUpSuccess: (state: UserState, action: PayloadAction<UserState>) => {
			state.uid = action.payload.uid;
			state.email = action.payload.email;
			state.isLoading = false;
			state.error = '';
		},

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
	signIn,
	signInSuccess,
	signUp,
	signUpSuccess,
	signOut,
	signOutSuccess,
	authError,
	clearError,
	checkAuthSuccess,
} = userSlice.actions;

export default userSlice.reducer;
