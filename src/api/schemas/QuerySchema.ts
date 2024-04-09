import { z } from "zod";

export const QuerySchema = z.object({
  query: z.string().nullish(),
  pageIndex: z.string().nullish().default("0").transform(Number),
});

export type QueryType = z.infer<typeof QuerySchema>;
