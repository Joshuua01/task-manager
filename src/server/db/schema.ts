// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations } from "drizzle-orm";
import {
  integer,
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

export const users = createTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  surname: varchar("surname", { length: 256 }).notNull(),
  login: varchar("login", { length: 256 }).notNull(),
  password: varchar("password", { length: 256 }).notNull(),
  role: roleEnum("role").notNull(),
});

export const projects = createTable("projects", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull().unique(),
  description: varchar("description", { length: 256 }).notNull(),
});

export const stories = createTable("stories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  description: varchar("description", { length: 256 }).notNull(),
  priority: priorityEnum("priority").notNull().default("medium"),
  status: statusEnum("status").notNull().default("to do"),
  creationDate: timestamp("creation_date").notNull().defaultNow(),
  projectId: integer("project_id").notNull(),
  ownerId: integer("owner_id").notNull(),
});

const usersRelations = relations(users, ({ many }) => ({
  stories: many(stories),
}));

const projectRelations = relations(projects, ({ many }) => ({
  stories: many(stories),
}));

const storiesRelations = relations(stories, ({ one }) => ({
  projects: one(projects, {
    fields: [stories.projectId],
    references: [projects.id],
  }),
  users: one(users, {
    fields: [stories.ownerId],
    references: [users.id],
  }),
}));
