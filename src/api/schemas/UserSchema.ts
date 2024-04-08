import { z } from "zod";

export const UserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  role: z.string().optional(),
  password: z.string().min(8, "Password must have at least 8 characters."),
  wardId: z.string().uuid(),
});

export type UserType = z.infer<typeof UserSchema>;
