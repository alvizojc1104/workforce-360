import { AuthActionTypes } from "@/features/auth/auth-actions";
import { AuthState } from "@/features/auth/auth-types";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";

export const useAuth = () => {
	const dispatch = useDispatch();
	const auth = useSelector((state: RootState) => state.auth);

	const login = (
		payload: Omit<AuthState, "isLoading" | "error" | "isAuthenticated">
	) => {
		dispatch({ type: AuthActionTypes.LOGIN, payload });
	};

	const logout = () => {
		dispatch({ type: AuthActionTypes.LOGOUT });
	};

	return { auth, login, logout };
};
