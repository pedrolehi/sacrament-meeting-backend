import { z } from "zod";

export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  role: z.string().optional(),
  password: z.string(),
  wardId: z.string().uuid(),
});
export type UserType = z.infer<typeof UserSchema>;
