import { useQuery } from "@tanstack/react-query";
import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import Loading from "./loading";
import api from "./services/axios";

interface ProtectRoutesProps {
	children: ReactNode;
}

const handleAuthenticate = () => {
	const response = api.get("/auth/me");
	return response;
};

const ProtectRoutes: React.FC<ProtectRoutesProps> = ({ children }) => {
	const authenticate = useQuery({
		queryKey: ["authenticate"],
		queryFn: handleAuthenticate,
	});

	if (authenticate.isError) {
		return <Navigate to="/login" />;
	}

	if (authenticate.isLoading) {
		return <Loading />;
	}

	return <>{children}</>;
};

export default ProtectRoutes;
