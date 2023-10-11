import { z } from "zod";

export const postValidator = z.object({
  author: z.string(),
  category: z.string(),
  title: z.string(),
  content: z.string(),
  tags: z.array(z.string()).optional(),
});
