import axios from "axios";
import { store } from "@/store";
import { login, logout } from "@/features/auth/auth-slice";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

if (!BACKEND_URL) {
	throw new Error("An error occurred while getting backend URL.");
}

export const api = axios.create({
	baseURL: BACKEND_URL,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
});

api.interceptors.request.use((config) => {
	const state = store.getState();
	const token = state.auth.accessToken; // Assuming 'auth' slice has 'accessToken'
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export const publicApi = axios.create({
	baseURL: BACKEND_URL,
});

const refreshToken = async () => {
	try {
		const state = store.getState();
		const refreshToken = state.auth.refreshToken;
		const response = await axios.post(
			`${BACKEND_URL}/account/auth/refresh`,
			{
				refreshToken: refreshToken,
			},
			{ withCredentials: true }
		);
		return response.data;
	} catch (error) {
		if (
			axios.isAxiosError(error) &&
			error.response &&
			error.response.status === 401
		) {
			// If refresh token is invalid or expired, log out the user
			store.dispatch(logout());
			window.location.href = "/login";
		}
		console.error("Failed to refresh token", error);
		throw error;
	}
};

api.interceptors.request.use(
	(config) => {
		try {
			const state = store.getState();
			const token = state.auth.accessToken;
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
		} catch (error) {
			console.error(error);
		}
		return config;
	},
	(error) => Promise.reject(error)
);

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			try {
				const tokens = await refreshToken();
				localStorage.setItem("authToken", tokens.accessToken);
				localStorage.setItem("refreshToken", tokens.refreshToken);
				originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;

				store.dispatch(
					login({
						accessToken: tokens.accessToken,
						refreshToken: tokens.refreshToken,
						user: tokens.user,
						roles: tokens.roles,
					})
				);
				return api(originalRequest);
			} catch (refreshError) {
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	}
);
