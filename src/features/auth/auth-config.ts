import { z } from "zod";

export const loginSchema = z.object({
	emailOrUserName: z.string(),
	password: z.string(),
});

export const SignupSchema = z
	.object({
		email: z.string().email({message: "Invalid email address"}).min(1, { message: "Email is required." }),
		password: z
			.string()
			.min(8, { message: "Password must be at least 8 characters" })
			.refine((val) => /[0-9]/.test(val), {
				message: "At least 1 number",
			})
			.refine((val) => /[a-z]/.test(val), {
				message: "At least 1 lowercase letter",
			})
			.refine((val) => /[A-Z]/.test(val), {
				message: "At least 1 uppercase letter",
			})
			.refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
				message: "At least 1 special character",
			}),
		confirmPassword: z
			.string()
			.min(8, { message: "Password must be at least 8 characters" }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Password do not match.",
		path: ["confirmPassword"],
	});
