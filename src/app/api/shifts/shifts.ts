const BASE_URL = '/api/shifts'
import { safeReadErrorMessage } from '../../lib/utils'

export type CreateShiftRequest = {
  UserName: string
  StartTime: string
  EndTime: string
  WorkContent: string
  Issues: string
}

export async function fetchShifts(): Promise<unknown> {
  const response = await fetch(`${BASE_URL}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    const message = await safeReadErrorMessage(response)
    throw new Error(message)
  }

  return response.json()
}

export async function createShift(
  shiftData: CreateShiftRequest,
  { params }: { params: { userName: string } }
): Promise<unknown> {
  const { userName } = params
  const response = await fetch(`${BASE_URL}/${userName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(shiftData),
    cache: 'no-store',
  })

  if (!response.ok) {
    const message = await safeReadErrorMessage(response)
    throw new Error(message)
  }

  return response.json()
}
