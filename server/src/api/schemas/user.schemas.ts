import { z } from "zod";

export const userRegisterSchema = z.object({
  role: z.enum(["user", "admin"]),
  email: z.string().email(),
  password: z.string().refine((password: String) => password.length >= 8, {
    message: "Password must be at least 8 characters",
  }),
});

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().refine((password: String) => password.length >= 8, {
    message: "Password must be at least 8 characters",
  }),
});
