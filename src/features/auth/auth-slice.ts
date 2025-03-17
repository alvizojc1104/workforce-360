import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "./auth-types";

const initialState: AuthState = {
	accessToken: null,
	refreshToken: null,
	isAuthenticated: false,
	isLoading: false,
	error: null,
	user: {
		email: "",
		id: "",
	},
};
const authenticationSlice = createSlice({
	name: "auth",
	initialState: initialState,
	reducers: {
		login: (
			state,
			action: PayloadAction<
				Omit<AuthState, "isLoading" | "error" | "isAuthenticated">
			>
		) => {
			state.isLoading = true;
			state.user = action.payload.user;
			state.accessToken = action.payload.accessToken;
			state.refreshToken = action.payload.refreshToken;
			state.isAuthenticated = true;
			state.error = null;
			state.isLoading = false;
		},
		logout: (state) => {
			state.isLoading = true;
			state.accessToken = null;
			state.refreshToken = null;
			state.isAuthenticated = false;
			state.user = {
				email: "",
				id: "",
			};
			state.isLoading = false;
		},
	},
});

export const { login, logout } = authenticationSlice.actions;
export default authenticationSlice.reducer;
