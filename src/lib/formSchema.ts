import { z } from "zod";

export const LoginSchema = z.object({
  login: z.string().min(1, {
    message: "Please enter your login!",
  }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters long",
  }),
});

export const CreateProjectSchema = z.object({
  name: z.string().min(1, {
    message: "Please enter a name for your project!",
  }),
  description: z.string().min(1, {
    message: "Please enter a description for your project!",
  }),
});
