import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";

import * as schema from "./schema";
import { eq } from "drizzle-orm";

// Use this object to send drizzle queries to your DB
export const db = drizzle(sql, { schema });

export const getProjects = async () => {
  return await db.query.posts.findMany();
};

export const getUserByLogin = async (login: string) => {
  return await db.query.users.findFirst({
    where: eq(schema.users.login, login),
  });
};
