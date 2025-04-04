export interface User {
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

export interface Employee {
	branchId: string | null;
	commencementDate: string;
	createdAt: string;
	createdBy: string | null;
	deletedAt: string | null;
	deletedBy: string | null;
	departmentId: string | null;
	employeeNumber: string;
	employmentCondition: string;
	employmentStatus: string;
	employmentType: string;
	id: string;
	isDeleted: boolean;
	leaveCredits: number;
	organizationId: string | null;
	updatedAt: string;
	updatedBy: string | null;
	user: User;
	roles: Role[];
}

export interface Role {
	isDeleted: boolean;
	scope: string;
	id: string;
	createdAt: Date;
	updatedAt: Date;
	createdBy: string;
	updatedBy: string;
	deletedBy: string;
	deletedAt: Date;
	organizationId: string;
	branchId: string;
	departmentId: string;
	userId: string;
	name: string;
	description: string;
}
