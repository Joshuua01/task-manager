/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function creationDateString(date: Date) {
  const dateNow = new Date();
  const isToday = dateNow.toDateString() === date.toDateString();
  const diffInSeconds = Math.round((dateNow.getTime() - date.getTime()) / 1000);

  if (isToday) {
    if (diffInSeconds < 60) {
      return "less than a minute ago";
    }
    if (diffInSeconds < 60 * 60) {
      return Math.round(diffInSeconds / 60) + " minutes ago";
    }
    if (diffInSeconds < 60 * 60 * 24) {
      return Math.round(diffInSeconds / (60 * 60)) + " hours ago";
    }
  } else {
    return Math.round(diffInSeconds / (60 * 60 * 24)) + " days ago";
  }
}

export const prioritySort = (rowA: any, rowB: any, columnId: any): number => {
  const value = (A: string): number => {
    return A === "low" ? 1 : A === "medium" ? 2 : 3;
  };

  const Anum = value(rowA.original.priority);
  const Bnum = value(rowB.original.priority);

  if (Anum === Bnum) return 0;

  return Anum < Bnum ? 1 : -1;
};

export const statusSort = (rowA: any, rowB: any, columnId: any): number => {
  const value = (A: string): number => {
    return A === "to do" ? 1 : A === "in progress" ? 2 : 3;
  };

  const Anum = value(rowA.original.status);
  const Bnum = value(rowB.original.status);

  if (Anum === Bnum) return 0;

  return Anum < Bnum ? 1 : -1;
};
