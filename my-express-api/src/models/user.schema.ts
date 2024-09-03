import { z } from "zod";

// Define the Zod schema for the User model
export const userSchema = z.object({
  id: z.number().optional(), // id auto-generated
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
});

export type UserSchema = z.infer<typeof userSchema>;
