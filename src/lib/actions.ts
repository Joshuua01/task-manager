"use server";
import {
  addProject,
  deleteProject,
  getProjects,
  getUserByLogin,
} from "~/server/db";
import { type z } from "zod";
import { type LoginSchema } from "./formSchema";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { type Project, type EncryptedUser } from "~/app/models";
import { NextResponse } from "next/server";

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
  cookies().set(name, value);
}

export async function getActiveProject() {
  const activeProjectId = cookies().get("activeProject")?.value;
  if (!activeProjectId) return null;
  return activeProjectId.toString();
}

export async function createProject(project: Project) {
  const projects = await getProjects();
  if (projects.some((p) => p.name === project.name)) {
    return {
      error: "Project with this name already exists",
    };
  }
  await addProject(project);
  return;
}

export async function removeProject() {
  const projectId = await getActiveProject();
  if (!projectId) return;
  await deleteProject(Number(projectId));
  await saveCookie("activeProject", "");
  redirect("/");
}
