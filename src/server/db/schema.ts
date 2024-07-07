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
  description: varchar("description", { length: 1024 }).notNull(),
});

export const stories = createTable("stories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  description: varchar("description", { length: 1024 }).notNull(),
  priority: priorityEnum("priority").notNull().default("medium"),
  status: statusEnum("status").notNull().default("to do"),
  creationDate: timestamp("creation_date").notNull().defaultNow(),
  projectId: integer("project_id").notNull(),
  ownerId: integer("owner_id").notNull(),
});

export const tasks = createTable("tasks", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  description: varchar("description", { length: 1024 }).notNull(),
  priority: priorityEnum("priority").notNull().default("medium"),
  status: statusEnum("status").notNull().default("to do"),
  expectedTime: integer("expected_time").notNull(),
  creationDate: timestamp("creation_date").notNull().defaultNow(),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  storyId: integer("story_id").notNull(),
  ownerId: integer("owner_id").notNull(),
  assigneeId: integer("assignee_id"),
});

const usersRelations = relations(users, ({ many }) => ({
  owner: many(stories, { relationName: "owner" }),
  asiggnee: many(stories, { relationName: "assignee" }),
  tasks: many(tasks),
}));

const projectRelations = relations(projects, ({ many }) => ({
  stories: many(stories),
}));

const storiesRelations = relations(stories, ({ one, many }) => ({
  projects: one(projects, {
    fields: [stories.projectId],
    references: [projects.id],
  }),
  users: one(users, {
    fields: [stories.ownerId],
    references: [users.id],
  }),
  tasks: many(tasks),
}));

const tasksRelations = relations(tasks, ({ one, many }) => ({
  stories: one(stories, {
    fields: [tasks.storyId],
    references: [stories.id],
  }),
  users: one(users, {
    fields: [tasks.ownerId],
    references: [users.id],
  }),
  assignee: one(users, {
    fields: [tasks.assigneeId],
    references: [users.id],
  }),
}));
