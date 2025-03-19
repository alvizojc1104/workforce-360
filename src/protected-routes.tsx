import { ReactNode } from "react";
import { useAuth } from "./hooks/use-auth";
import { Navigate } from "react-router-dom";
interface ProtectRoutesProps {
	children: ReactNode;
}

const ProtectRoutes: React.FC<ProtectRoutesProps> = ({ children }) => {
	const { auth } = useAuth();
	if (!auth.isAuthenticated) {
		return <Navigate to={"/login"} />;
	}
	return <>{children}</>;
};

export default ProtectRoutes;
