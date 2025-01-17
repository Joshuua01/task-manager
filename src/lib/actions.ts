"use server";
import { jwtVerify, SignJWT } from "jose";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { type z } from "zod";
import {
  type EncryptedUser,
  Notification,
  type Project,
  type Story,
  Task,
} from "~/models";
import {
  addProject,
  createStory as createStoryDB,
  createTask as createTaskDB,
  deleteProject,
  deleteStory as deleteStoryDB,
  deleteTask as deleteTaskDB,
  editProject as editProjectDB,
  editStory as editStoryDB,
  editTask as editTaskDB,
  getAllProjects,
  getProjectById as getProjectByIdDB,
  getStoriesByProjectId as getStoriesByProjectIdDB,
  getStoryById as getStoryByIdDB,
  getTaskById as getTaskByIdDB,
  getTasksByStoryId as getTasksByStoryIdDB,
  getTasksByUserId as getTasksByUserIdDB,
  getUserById as getUserByIdDB,
  getUserByLogin,
  getUsers as getUsersDB,
  addNotification as addNotificationDB,
  getNotificationsByUserId as getNotificationsByUserIdDB,
  deleteNotification as deleteNotificationDB,
} from "~/server/db";
import { type LoginSchema } from "./formSchema";

import { notifyTaskAssignment } from "./notifications";

const secret = process.env.JWT_SECRET;
const key = new TextEncoder().encode(secret);
const oneDay = 1000 * 60 * 60 * 24;

export const login = async (formData: z.infer<typeof LoginSchema>) => {
  const login = formData.login;
  const password = formData.password;

  if (!login || !password) {
    return {
      error: "Please enter login and password",
    };
  }

  const user = await getUserByLogin(login);

  if (!user) {
    return {
      error: "No user found",
    };
  }

  const isValid = password === user.password;

  if (!isValid) {
    return {
      error: "Invalid login or password",
    };
  }

  cookies().set(
    "jwt",
    await encrypt({
      id: user.id,
      name: user.name,
      surname: user.surname,
      role: user.role,
    }),
    {
      httpOnly: true,
      expires: Date.now() + oneDay,
    },
  );
  redirect("/");
};

export const logout = async () => {
  cookies().delete("jwt");
  redirect("/");
};

export const encrypt = async (payload: EncryptedUser) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(key);
};

export const decrypt = async (token: string) => {
  const decrypted = await jwtVerify(token, key, {
    algorithms: ["HS256"],
  });
  return decrypted.payload;
};

export const refreshToken = async () => {
  const parsed = await getUserFromToken();
  if (!parsed) return;
  const response = NextResponse.next();
  response.cookies.set("jwt", await encrypt(parsed), {
    httpOnly: true,
    expires: Date.now() + oneDay,
  });
  return response;
};

export const getUserFromToken = async () => {
  const token = cookies().get("jwt")?.value;
  if (!token) {
    return null;
  }
  return (await decrypt(token)) as EncryptedUser;
};

export async function saveCookie(name: string, value: string) {
  cookies().set(name, value, {
    httpOnly: true,
    expires: Date.now() + oneDay * 7,
  });
}

export async function getUserById(userId: number) {
  return await getUserByIdDB(userId);
}

export async function getUsers() {
  return await getUsersDB();
}

export async function getActiveProject() {
  const activeProjectId = cookies().get("activeProject")?.value;
  if (!activeProjectId) return null;
  const project = await getProjectByIdDB(Number(activeProjectId));
  return project as Project;
}

export async function getProjects() {
  return await getAllProjects();
}

export async function getProjectById(projectId: number) {
  return await getProjectByIdDB(projectId);
}

export async function createProject(project: Project) {
  const projects = await getProjects();
  if (projects.some((p) => p.name === project.name)) {
    return {
      error: "Project with this name already exists",
    };
  }
  await addProject(project);
  revalidatePath("/");
}

export async function editProject(project: Project) {
  const currentProject = await getActiveProject();
  const projects = await getProjects();
  if (!currentProject) return;
  if (
    currentProject.name === project.name &&
    currentProject.description === project.description
  ) {
    return {
      error: "Values cannot be the same",
    };
  }
  if (projects.some((p) => p.name === project.name)) {
    return {
      error: "Project with this name already exists",
    };
  }
  await editProjectDB(currentProject.id, project);
  revalidatePath("/");
}

export async function removeProject() {
  const project = await getActiveProject();
  if (!project) return;
  await deleteProject(Number(project.id));
  await saveCookie("activeProject", "");
  redirect("/");
}

export async function getStoriesByProjectId(projectId: number | undefined) {
  if (projectId === undefined) {
    return;
  }
  return (await getStoriesByProjectIdDB(projectId)) as Story[];
}

export async function getStoryById(storyId: number | undefined) {
  if (storyId === undefined) {
    return;
  }
  return (await getStoryByIdDB(storyId)) as Story;
}

export async function createStory(story: Story) {
  const stories = await getStoriesByProjectId(story.projectId);
  if (stories?.some((s) => s.name === story.name)) {
    return {
      error: "Story with this name already exists",
    };
  }

  const project = await getActiveProject();
  const currentUser = await getUserFromToken();

  story.projectId = Number(project?.id);
  story.ownerId = Number(currentUser?.id);

  await createStoryDB(story);
  revalidatePath("/");
}

export async function deleteStory(storyId: number) {
  await deleteStoryDB(storyId);
  revalidatePath("/");
}

export async function changeStoryStatus(
  storyId: number,
  status: "to do" | "in progress" | "done",
) {
  const story = await getStoryById(storyId);
  if (!story) return;
  story.status = status;
  await editStoryDB(storyId, story);
  revalidatePath("/");
}

export async function editStory(
  story: Story,
  editedStoryId: number | undefined,
) {
  if (!editedStoryId) return;
  const fetchStory = await getStoryById(editedStoryId);
  if (!fetchStory) return;
  if (
    fetchStory.name != story.name ||
    fetchStory.description != story.description ||
    fetchStory.priority != story.priority ||
    fetchStory.status != story.status
  ) {
    await editStoryDB(editedStoryId, story);
    revalidatePath("/");
  } else {
    return {
      error: "Values cannot be the same",
    };
  }
}

export const getTaskById = async (id: number) => {
  return await getTaskByIdDB(id);
};

export const getTasksByStoryId = async (storyId: number) => {
  return await getTasksByStoryIdDB(storyId);
};

export const getTasksByUserId = async (userId: number) => {
  return (await getTasksByUserIdDB(userId)) as Task[];
};

export const createTask = async (task: Task) => {
  const tasks = await getTasksByStoryId(task.storyId);
  if (tasks?.some((t) => t.name === task.name)) {
    return {
      error: "Task with this name already exists",
    };
  }
  const currentUser = await getUserFromToken();
  if (!currentUser) return;
  task.ownerId = currentUser?.id;
  await createTaskDB(task);
  revalidatePath(`/story/${task.storyId}`);
};

export const deleteTask = async (taskId: number) => {
  const task = await getTaskById(taskId);
  if (!task) return;
  await deleteTaskDB(taskId);
  revalidatePath(`/story/${task.storyId}`);
};

export const editTask = async (task: Task) => {
  const fetchTask = await getTaskById(task.id);
  if (!fetchTask) return;
  if (
    fetchTask.name != task.name ||
    fetchTask.description != task.description ||
    fetchTask.status != task.status ||
    fetchTask.priority != task.priority ||
    fetchTask.expectedTime != task.expectedTime ||
    fetchTask.assigneeId != task.assigneeId
  ) {
    await editTaskDB(task.id, task);
    if (fetchTask.assigneeId !== task.assigneeId) {
      notifyTaskAssignment(task);
    }
    revalidatePath(`/task/${task.id}`);
    revalidatePath("/");
  } else {
    return {
      error: "Values cannot be the same",
    };
  }
};

export const addNotification = async (notification: Notification) => {
  await addNotificationDB(notification);
};

export const getNotificationsByUserId = async (userId: number) => {
  return await getNotificationsByUserIdDB(userId);
};

export const deleteNotification = async (notificationId: number) => {
  await deleteNotificationDB(notificationId);
};
