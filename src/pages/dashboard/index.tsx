import { checkPermission } from "@/features/auth/auth-permissions";
import { ROLES, SCOPES } from "@/features/auth/auth-types";
import { useAuth } from "@/hooks/use-auth";

export default function Dashboard() {
	const { auth } = useAuth();

	const isSuperAdmin = checkPermission(
		auth.roles,
		ROLES.SUPER_ADMIN,
		SCOPES.GLOBAL
	);

	return (
		<div>
			<pre>{JSON.stringify(auth.roles, null, 2)}</pre>
			<h1>Is super admin? : {isSuperAdmin ? "YES" : "NO"} </h1>
		</div>
	);
}
