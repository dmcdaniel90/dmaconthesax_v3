import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function upperFirst(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function splitWordsAndCapitalize(str: string) {
  return str
    .split("-")
    .map((word) => upperFirst(word))
    .join(" ")
}

export function composeDateString(numMonth: number | string, day: number, year: number) {
  const fullDate = new Date(year, Number(numMonth) - 1, day);

  return fullDate.toLocaleDateString("en-GB")
}
