import { z } from 'zod';

export const FunctionalAreaSchema = z.object({
  id: z.number().optional(),
  code: z.string()
    .min(2, 'Code must be exactly 2 characters')
    .max(2, 'Code must be exactly 2 characters')
    .regex(/^[A-Z]{2}$/, 'Code must contain only uppercase letters'),
  name: z.string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters'),
  description: z.string()
    .min(1, 'Description is required')
    .max(255, 'Description must be less than 255 characters')
});

export type FunctionalAreaFormData = z.infer<typeof FunctionalAreaSchema>;