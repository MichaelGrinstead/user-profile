import * as z from "zod";

export const RegistrationDataSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(6).max(100),
});

export const LoginDataSchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(6).max(100),
});
