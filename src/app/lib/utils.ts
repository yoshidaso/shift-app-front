import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const BACKEND_BASE_URL = 'http://localhost:8080'

export async function safeReadErrorMessage(response: Response): Promise<string> {
  try {
    const data = await response.json()
    if (data && typeof data === 'object' && 'message' in data) {
      return String((data as { message?: unknown }).message ?? 'Request failed')
    }
  } catch (_) {
    // ignore
  }
  return `Request failed with status ${response.status}`
}
