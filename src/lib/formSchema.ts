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

export const StorySchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, {
    message: "Please enter a name for your story!",
  }),
  description: z.string().min(1, {
    message: "Please enter a description for your story!",
  }),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  status: z.enum(["to do", "in progress", "done"]).default("to do"),
  creationDate: z.date().optional(),
  projectId: z.number().optional(),
  ownerId: z.number().optional(),
});

export const TaskSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, {
    message: "Please enter a name for your task!",
  }),
  description: z.string().min(1, {
    message: "Please enter a description for your task!",
  }),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  status: z.enum(["to do", "in progress", "done"]).default("to do"),
  expectedTime: z.coerce.number().int().min(1, {
    message: "Please enter a valid number of days!",
  }),
  creationDate: z.date().optional(),
  startDate: z.date().nullable().optional(),
  endDate: z.date().nullable().optional(),
  storyId: z.number().optional(),
  ownerId: z.number().optional(),
  assigneeId: z.number().optional(),
});
