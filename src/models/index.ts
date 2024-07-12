import { type InferSelectModel } from "drizzle-orm";
import {
  type stories,
  type projects,
  tasks,
  users,
  notifications,
} from "~/server/db/schema";

export type User = InferSelectModel<typeof users>;
export type Project = InferSelectModel<typeof projects>;
export type Story = InferSelectModel<typeof stories>;
export type Task = InferSelectModel<typeof tasks>;
export type Notification = InferSelectModel<typeof notifications>;

export type EncryptedUser = {
  id: number;
  name: string;
  surname: string;
  role: string;
};

export const statusEnum = ["to do", "in progress", "done"] as const;

export const priorities = [
  {
    label: "High",
    value: "high",
  },
  {
    label: "Medium",
    value: "medium",
  },
  {
    label: "Low",
    value: "low",
  },
];

export const statuses = [
  {
    label: "Done",
    value: "done",
  },
  {
    label: "In progress",
    value: "in progress",
  },
  {
    label: "To do",
    value: "to do",
  },
];
