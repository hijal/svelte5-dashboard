import { z } from 'zod/v4';

export const loginSchema = z.object({
    email: z
        .email({
            error: 'Invalid email address',
        })
        .default(''),
    password: z
        .string({
            error: 'Password is required',
        })
        .default(''),
});

export type LoginSchema = typeof loginSchema;
