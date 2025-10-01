import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function nextPenny(value: number): number {
  return (Math.round(value * 100) + 1) / 100;
}
