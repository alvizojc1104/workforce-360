
export type AuthState = {
	accessToken: string | null;
	refreshToken: string | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	error: string | null;
	user: JwtPayload | null;
	roles: Role[];
};
export interface Role {
	name: ROLES;
	scope: SCOPES;
}

export interface JwtPayload {
	sub: string;
	iat: number;
	refreshToken: string;
	email: string;
	roles: Role[];
	employeeId: string;
	exp: number;
}

export enum ROLES {
	SUPER_ADMIN = "SuperAdmin",
	ADMIN = "Admin",
	EMPLOYEE = "Employee",
}

export enum SCOPES {
	GLOBAL = "global",
	BRANCH = "branch",
	DEPARTMENT = "department",
	ORGANIZATION = "organization",
	OWNED = "owned",
}

export interface User extends AuthState {
	isDeleted: boolean;
	emailVerified: boolean;
	phoneNumberVerified: boolean;
	accessFailedCount: number;
	lockoutEnabled: boolean;
	lockedOut: boolean;
	id: string;
	createdAt: string;
	updatedAt: string;
	createdBy: Date;
	updatedBy: string;
	deletedBy: string;
	deletedAt: Date;
	organizationId: string;
	branchId: string;
	departmentId: string;
	userId: string;
	email: string;
	password: string;
	userName: string;
	lastLogin: Date;
	phoneNumber: string;
	lockOutStart: Date;
	lockOutEnd: Date;
	profile: Profile;
}

export interface Profile {
	isDeleted: boolean;
	id: string;
	createdAt: string;
	updatedAt: string;
	createdBy: string;
	updatedBy: string;
	deletedBy: string;
	deletedAt: Date;
	organizationId: string;
	branchId: string;
	departmentId: string;
	userId: string;
	firstName: string;
	middleName: string;
	lastName: string;
	suffix: string;
	gender: string;
	sex: string;
	profilePicture: string;
	birthDate: string;
	civilStatus: string;
	citizenship: string;
	nationality: string;
	religion: string;
	address: Address;
}

export interface Address {
	isDeleted: boolean;
	id: string;
	createdAt: string;
	updatedAt: string;
	createdBy: string;
	updatedBy: string;
	deletedBy: string;
	deletedAt: Date;
	organizationId: string;
	branchId: string;
	departmentId: string;
	userId: string;
	streetNameBuildingHouseNumber: string;
	barangay: string;
	cityOrMunicipality: string;
	province: string;
	region: string;
	postalCode: number;
}
