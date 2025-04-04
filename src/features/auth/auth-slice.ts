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
		roles: [],
		employeeId: "",
		exp: 0,
		iat: 0,
		sub: "",
		refreshToken: "",
	},
	roles: [],
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
			state.accessToken = action.payload.accessToken;
			state.refreshToken = action.payload.refreshToken;
			state.isAuthenticated = true;
			state.user = action.payload.user;
			state.isLoading = false;
		},
		logout: (state) => {
			state.isLoading = true;
			state.accessToken = null;
			state.refreshToken = null;
			state.isAuthenticated = false;
			state.user = {
				email: "",
				roles: [],
				employeeId: "",
				exp: 0,
				iat: 0,
				sub: "",
				refreshToken: "",
			};
			state.isLoading = false;
		},
		updateTokens: (state, action: PayloadAction<AuthState>) => {
			state.accessToken = action.payload.accessToken;
			state.refreshToken = action.payload.refreshToken;
		},
	},
});

export const { login, logout } = authenticationSlice.actions;
export default authenticationSlice.reducer;
