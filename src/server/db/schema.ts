// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
  index,
  pgEnum,
  pgTableCreator,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum('role', ['admin', 'developer', 'devops']);

export const createTable = pgTableCreator((name) => `task-manager_${name}`);

export const posts = createTable(
  "projects",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    desc: varchar("desc", { length: 256 }).notNull(),
  },
  (projects) => ({
    nameIndex: index("name_idx").on(projects.name),
  })
);

export const users = createTable(
  "users",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    surname: varchar("surname", { length: 256 }).notNull(),
    login: varchar("email", { length: 256 }).notNull(),
    password: varchar("password", { length: 256 }).notNull(),
    role: roleEnum("role").notNull(),
  }
);
