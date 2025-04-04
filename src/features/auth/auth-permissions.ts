import { Role, ROLES, SCOPES } from "./auth-types";

export function checkPermission(
	userRoles: Role[],
	requiredRole: ROLES,
	requiredScope: SCOPES
): boolean {
	return userRoles.some(
		(role) =>
			role.name === requiredRole &&
			(role.scope === requiredScope || role.scope === SCOPES.GLOBAL)
	);
}
