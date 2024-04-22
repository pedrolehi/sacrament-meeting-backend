import { z } from "zod";
import { UserSchema } from "./User.schema";

export const WardSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  stake: z.string(),
  users: UserSchema.partial().array().optional(),
});
export type WardType = z.infer<typeof WardSchema>;
