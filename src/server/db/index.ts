import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";

import * as schema from "./schema";
import { eq } from "drizzle-orm";
import { type Project } from "~/app/models";

// Use this object to send drizzle queries to your DB
export const db = drizzle(sql, { schema });

export const getAllProjects = async () => {
  return await db.query.projects.findMany();
};

export const getProjectById = async (id: number) => {
  return await db.query.projects.findFirst({
    where: eq(schema.projects.id, id),
  });
};

export const addProject = async (project: Project) => {
  return await db.insert(schema.projects).values(project);
};

export const deleteProject = async (id: number) => {
  return await db.delete(schema.projects).where(eq(schema.projects.id, id));
};

export const getUserByLogin = async (login: string) => {
  return await db.query.users.findFirst({
    where: eq(schema.users.login, login),
  });
};
