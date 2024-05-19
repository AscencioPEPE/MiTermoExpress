import * as z from 'zod';
import { OrderProductSchema } from './schema-order';

export const builderGuestSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(8),
  address: z.string().min(1),
  // password: z.string().min(6),
});

export const builderLoginSchema = z.object({
  username: z.string().email(),
  password: z.string().min(6),
});

export const builderRegisterCustomerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().min(8),
  address: z.string().min(1),
  name: z.string().min(1),
  order: z
    .object({
      status: z.enum(['Pending', 'Processing', 'Shipped', 'Delivered', '']),
      products: z.array(OrderProductSchema),
    })
    .optional(),
});

export type GuestSchema = z.infer<typeof builderGuestSchema>;

export type LoginSchema = z.infer<typeof builderLoginSchema>;

export type RegisterCustomerSchema = z.infer<typeof builderRegisterCustomerSchema>;
