const BASE_URL = '/api/users'

export type CreateUserRequest = {
  Name: string
  Email: string
}

export async function fetchUsers(): Promise<unknown> {
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

export async function createUser(
  userData: CreateUserRequest
): Promise<unknown> {
  const response = await fetch(`${BASE_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(userData),
    cache: 'no-store',
  })

  if (!response.ok) {
    const message = await safeReadErrorMessage(response)
    throw new Error(message)
  }

  return response.json()
}

async function safeReadErrorMessage(response: Response): Promise<string> {
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
