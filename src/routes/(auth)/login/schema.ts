import { z } from 'zod/v4';

export const loginSchema = z.object({
    email: z.email({
        error: 'Invalid email address',
    }),
    password: z
        .string({
            error: 'Password is required',
        })
        .min(1, 'Password is required'),
    redirectTo: z.string().default('/'),
});

export type LoginSchema = typeof loginSchema;
