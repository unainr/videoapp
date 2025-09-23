import { z } from "zod";

export const signUpSchema = z.object({
	name: z.string().min(3).max(20),
	email: z.string().email({
		message: "Email must be a valid email address.",
	}),
	password: z.string().min(8, {
		message: "Password must be at least 8 characters.",
	}),
	confirmPassword: z.string().min(8, {
		message: "Password does not match.",
	}),
})
 .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"], 
  });

export const signInSchema = z.object({
    email: z.string().email({
		message: "Email must be a valid email address.",
	}),
	password: z.string().min(8, {
		message: "Password must be at least 8 characters.",
	}),
})