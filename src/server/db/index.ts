import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";

import * as schema from "./schema";
import { eq } from "drizzle-orm";
import { type Story, type Project, Task } from "~/models";

// Use this object to send drizzle queries to your DB
export const db = drizzle(sql, { schema });

// USER
export const getUsers = async () => {
  return await db.query.users.findMany();
};

export const getUserByLogin = async (login: string) => {
  return await db.query.users.findFirst({
    where: eq(schema.users.login, login),
  });
};

export const getUserById = async (id: number) => {
  return await db.query.users.findFirst({
    where: eq(schema.users.id, id),
  });
};

// PROJECT

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

export const editProject = async (id: number, project: Project) => {
  return await db
    .update(schema.projects)
    .set(project)
    .where(eq(schema.projects.id, id));
};

// STORY

export const getStoryById = async (id: number) => {
  return await db.query.stories.findFirst({
    where: eq(schema.stories.id, id),
  });
};

export const getStoriesByProjectId = async (projectId: number) => {
  return await db.query.stories.findMany({
    where: eq(schema.stories.projectId, projectId),
  });
};

export const createStory = async (story: Story) => {
  return await db.insert(schema.stories).values(story);
};

export const deleteStory = async (storyId: number) => {
  return await db.delete(schema.stories).where(eq(schema.stories.id, storyId));
};

export const editStory = async (id: number, story: Story) => {
  return await db
    .update(schema.stories)
    .set(story)
    .where(eq(schema.stories.id, id));
};

// TASK

export const getTaskById = async (id: number) => {
  return await db.query.tasks.findFirst({
    where: eq(schema.tasks.id, id),
  });
};

export const getTasksByStoryId = async (storyId: number) => {
  return await db.query.tasks.findMany({
    where: eq(schema.tasks.storyId, storyId),
  });
};

export const createTask = async (task: Task) => {
  return await db.insert(schema.tasks).values(task);
};

export const deleteTask = async (taskId: number) => {
  return await db.delete(schema.tasks).where(eq(schema.tasks.id, taskId));
};

export const editTask = async (id: number, task: Task) => {
  return await db.update(schema.tasks).set(task).where(eq(schema.tasks.id, id));
};
