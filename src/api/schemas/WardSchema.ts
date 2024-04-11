import { z } from "zod";

export const WardSchema = z.object({ name: z.string(), stake: z.string() });
export type WardType = z.infer<typeof WardSchema>;

export const WardIdSchema = z.object({ wardId: z.string().uuid() });
export type WardIdType = z.infer<typeof WardIdSchema>;

export const WardUpdateSchema = z.object({
  name: z.string().optional(),
  stake: z.string().optional(),
});
export type WardUpdateType = z.infer<typeof WardUpdateSchema>;
