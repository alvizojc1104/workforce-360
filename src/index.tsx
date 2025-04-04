import { Navigate } from "react-router-dom";
import { checkPermission } from "./features/auth/auth-permissions";
import { ROLES, SCOPES } from "./features/auth/auth-types";
import { useAuth } from "./hooks/use-auth";

export default function Index() {
	const { auth } = useAuth();

	const isSuperAdmin = checkPermission(
		auth.roles,
		ROLES.SUPER_ADMIN,
		SCOPES.GLOBAL
	);
	if (!auth.isAuthenticated) return <Navigate to="/login" />;
	if (isSuperAdmin) return <Navigate to="/dashboard" />;
	return null;
}
