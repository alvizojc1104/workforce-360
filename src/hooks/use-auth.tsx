import { publicApi, api } from "@/api/axios";
import { AuthActionTypes } from "@/features/auth/auth-actions";
import { loginSchema } from "@/features/auth/auth-config";
import { AuthState, JwtPayload } from "@/features/auth/auth-types";
import { RootState } from "@/store";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { jwtDecode } from "jwt-decode";

const userLogin = async (data: z.infer<typeof loginSchema>) => {
	const response = await publicApi.post(`/account/auth/login`, data);
	return response.data;
};

const handleLogout = async () => {
	try {
		const refreshToken = localStorage.getItem("refreshToken");
		await api.post("/account/auth/logout", {
			refreshToken: refreshToken,
		});

		localStorage.removeItem("authToken");
		localStorage.removeItem("refreshToken");
	} catch (error) {
		console.error(error);
	}
};

export const useAuth = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const auth = useSelector((state: RootState) => state.auth);

	const login = useMutation({
		mutationKey: ["login"],
		mutationFn: userLogin,
		onSuccess: (data) => {
			if (data?.accessToken) {
				const decodedJWT: JwtPayload = jwtDecode(data.accessToken);

				const payload: JwtPayload = {
					email: decodedJWT.email,
					roles: decodedJWT.roles,
					employeeId: decodedJWT.employeeId,
					exp: decodedJWT.exp,
					iat: decodedJWT.iat,
					sub: decodedJWT.sub,
					refreshToken: decodedJWT.refreshToken,
				};
				console.log(payload);
				loginPayload({
					...payload,
					accessToken: data.accessToken,
				});
				navigate("/dashboard");
			} else {
				console.error("Access token is null");
			}
		},
		onError: (error) => {
			console.error(error);
		},
	});

	const logout = useMutation({
		mutationKey: ["logout"],
		mutationFn: () => handleLogout(),
		onSuccess() {
			dispatch({ type: AuthActionTypes.LOGOUT });
			navigate("/login");
		},
		onError(error) {
			console.error(error.message);
			navigate("/login");
		},
	});

	const loginPayload = (payload: Partial<AuthState>) => {
		dispatch({ type: AuthActionTypes.LOGIN, payload });
	};

	return { auth, login, logout };
};
