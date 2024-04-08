import { z } from "zod";

export const WardSchema = z.object({ name: z.string(), stake: z.string() });

export type WardType = z.infer<typeof WardSchema>;
