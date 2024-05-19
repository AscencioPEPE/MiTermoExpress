import * as z from 'zod';

export const OrderProductSchema = z.object({
  name: z.string(),
  price: z.number(),
  variant: z.string(),
  quantity: z.number(),
});
