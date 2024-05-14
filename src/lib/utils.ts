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
