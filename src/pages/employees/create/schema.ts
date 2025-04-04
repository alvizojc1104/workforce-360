import { z } from "zod";

export const createProfileSchema = z.object({
	email: z.string().email({ message: "Invalid email" }),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters" })
		.regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
		.regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
		.regex(/[0-9]/, { message: "Password must contain at least one number" })
		.regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" }),
	phoneNumber: z.string().min(3, { message: "Required" }).max(20),
	employeeNumber: z.number().min(1, { message: "Required" }),
	firstName: z.string().min(3, { message: "Required" }).max(20),
	middleName: z.string().min(3, { message: "Required" }).max(20),
	lastName: z.string().min(3, { message: "Required" }).max(20),
	suffix: z.string().min(3, { message: "Required" }).max(20),
	gender: z.string().min(3, { message: "Required" }).max(20),
	sex: z.string().min(3, { message: "Required" }).max(20),
	profilePicture: z.string().optional(),
	birthDate: z.string().min(3, { message: "Required" }).max(20),
	civilStatus: z.string().min(3, { message: "Required" }).max(20),
	citizenship: z.string().min(3, { message: "Required" }).max(20),
	nationality: z.string().min(3, { message: "Required" }).max(20),
	religion: z.string().min(3, { message: "Required" }).max(20),
	userId: z.string().min(3, { message: "Required" }).max(20),
	address: z.object({
		streetNameBuildingHouseNumber: z
			.string()
			.min(3, { message: "Required" })
			.max(20),
		barangay: z.string().min(3, { message: "Required" }).max(20),
		cityOrMunicipality: z.string().min(3, { message: "Required" }).max(20),
		province: z.string().min(3, { message: "Required" }).max(20),
		region: z.string().min(3, { message: "Required" }).max(20),
		postalCode: z.string().regex(/^\d{4}$/, {
			message: "Invalid postal code, must be a 4-digit number",
		}),
	}),
});

export type TCreateProfile = z.infer<typeof createProfileSchema>;
