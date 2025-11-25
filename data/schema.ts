import { z } from 'zod';

export const productSchema = z.object({
  id: z.string(),
  sku: z.string(),
  name: z.string(),
  category: z.string(),
  price: z.number(),
  quantity: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Product = z.infer<typeof productSchema>;
