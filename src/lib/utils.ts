import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDateRange(start: string, end?: string) {
  if (end) {
    return `${start} – ${end}`;
  }
  return start;
}