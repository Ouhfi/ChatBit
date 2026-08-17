import { z } from "zod";

export const registerSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must contain at least 2 characters")
    .max(100, "Full name is too long")
    .trim(),

  email: z
    .string()
    .email("Invalid email")
    .trim()
    .toLowerCase(),

  password: z
    .string()
    .min(6, "Password must contain at least 6 characters"),
});