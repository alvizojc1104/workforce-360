export type AuthState = {
	accessToken: string | null;
	refreshToken: string | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	error: string | null;
	user: {
		id: string;
		email: string;
	};
};

export type AuthTokens = {
	accessToken: string;
	refreshToken: string;
};
