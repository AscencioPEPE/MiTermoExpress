import * as z from 'zod';

export const builderGuestSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(8),
  address: z.string().min(1),
  // password: z.string().min(6),
});

export const builderLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const builderRegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().min(8),
  address: z.string().min(1),
  name: z.string().min(1),
});

export type GuestSchema = z.infer<typeof builderGuestSchema>;

export type LoginSchema = z.infer<typeof builderLoginSchema>;

export type RegisterSchema = z.infer<typeof builderRegisterSchema>;
