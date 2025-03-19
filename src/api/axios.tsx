import axios from "axios";
import { store } from "@/store";
import { login } from "@/features/auth/auth-slice";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

if (!BACKEND_URL) {
	throw new Error("An error occurred while getting backend URL.");
}

const api = axios.create({
	baseURL: BACKEND_URL,
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${localStorage.getItem("authToken")}`,
	},
	withCredentials: true,
});

const refreshToken = async () => {
	try {
		const response = await axios.post(
			`${BACKEND_URL}/auth/refresh`,
			{
				refreshToken: localStorage.getItem("refreshToken"),
			},
			{ withCredentials: true }
		);
		return response.data;
	} catch (error) {
		console.error("Failed to refresh token", error);
		throw error;
	}
};

api.interceptors.request.use(
	(config) => {
		try {
			const token = localStorage.getItem("authToken");
			config.headers.Authorization = `Bearer ${token}`;
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

export default api;
