import { z } from "zod";

// Define the Zod schema for the Category model
export const categorySchema = z.object({
  id: z.string().optional(), // id is optional because it is auto-generated
  name: z.string().min(1, "Name is required"), // name is a required string
  colorHex: z.string().min(1, "ColorHex is required"), // colorHex is a required string
});

// Export the inferred type for type safety and reusability
export type CategorySchema = z.infer<typeof categorySchema>;
