import { z } from "zod";

export const QuerySchema = z.object({
  query: z.string().nullish().optional(),
  pageIndex: z.string().nullish().default("0").transform(Number).optional(),
});

export type QueryType = z.infer<typeof QuerySchema>;
