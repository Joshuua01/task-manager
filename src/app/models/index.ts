import { type InferSelectModel } from "drizzle-orm";
import { type stories, type projects } from "~/server/db/schema";

export type Project = InferSelectModel<typeof projects>;

export type Story = InferSelectModel<typeof stories>;

export type EncryptedUser = {
  id: number;
  name: string;
  surname: string;
  role: string;
};
