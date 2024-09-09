import { z } from "zod";

// Define the Zod schema for the User model
export const userSchema = z.object({
  id: z.string().optional(), // id auto-generated
  name: z.string().min(2, "Name must be at least 2 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .nullable(),
  email: z.string().email("Invalid email address"),
  isVerified: z.boolean().optional(),
});

export const loginUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

// Define the Zod schema for the JWT response
export const jwtResponseSchema = z.object({
  token: z.string().min(1, "JWT token is required"),
});

export const partialUserSchema = userSchema.partial();

export type UserSchema = z.infer<typeof userSchema>;
export type LoginUserSchema = z.infer<typeof loginUserSchema>;
export type JwtResponseSchema = z.infer<typeof jwtResponseSchema>;
export type PartialUserSchema = z.infer<typeof partialUserSchema>;
