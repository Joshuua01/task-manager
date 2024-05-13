// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
  index,
  pgEnum,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["admin", "developer", "devops"]);
export const priorityEnum = pgEnum("priority", ["low", "medium", "high"]);
export const statusEnum = pgEnum("status", ["to do", "in progress", "done"]);

export const createTable = pgTableCreator((name) => `task-manager_${name}`);

export const projects = createTable(
  "projects",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull().unique(),
    description: varchar("description", { length: 256 }).notNull(),
  },
  (projects) => ({
    nameIndex: index("name_idx").on(projects.name),
  }),
);

export const users = createTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  surname: varchar("surname", { length: 256 }).notNull(),
  login: varchar("login", { length: 256 }).notNull(),
  password: varchar("password", { length: 256 }).notNull(),
  role: roleEnum("role").notNull(),
});

export const stories = createTable("stories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  description: varchar("description", { length: 256 }).notNull(),
  priority: priorityEnum("priority").notNull().default("medium"),
  status: statusEnum("status").notNull().default("to do"),
  creationDate: timestamp("creation_date").notNull().defaultNow(),
  projectId: serial("project_id")
    .references(() => projects.id)
    .notNull(),
  ownerId: serial("owner_id")
    .references(() => users.id)
    .notNull(),
});
