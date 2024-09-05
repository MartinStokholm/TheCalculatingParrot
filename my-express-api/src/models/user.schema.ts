import { z } from "zod";

// Define the Zod schema for the User model
export const userSchema = z.object({
  id: z.number().optional(), // id auto-generated
  name: z.string().min(2, "Name must be at least 2 characters").nullable(),
  email: z.string().email("Invalid email address"),
});

export const partialUserSchema = userSchema.partial();

export type UserSchema = z.infer<typeof userSchema>;
export type PartialUserSchema = z.infer<typeof partialUserSchema>;
