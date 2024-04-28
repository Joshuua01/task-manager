import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";

import * as schema from "./schema";
import { eq } from "drizzle-orm";
import { type Project } from "~/app/models";

// Use this object to send drizzle queries to your DB
export const db = drizzle(sql, { schema });

export const getProjects = async () => {
  return await db.query.projects.findMany();
};

export const getUserByLogin = async (login: string) => {
  return await db.query.users.findFirst({
    where: eq(schema.users.login, login),
  });
};

export const addProject = async (project: Project) => {
  return await db.insert(schema.projects).values(project);
};
