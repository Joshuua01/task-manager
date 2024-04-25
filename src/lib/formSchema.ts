import { z } from "zod";

export const LoginSchema = z.object({
  login: z.string().min(1, {
    message: "Please enter your login!",
  }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters long",
  }),
});
