import { NextResponse } from 'next/server'

const BACKEND_BASE_URL = 'http://localhost:8080'

export async function GET() {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/users`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      cache: 'no-store',
    })

    const data = await response.json().catch(() => null)

    if (!response.ok) {
      return NextResponse.json(
        { message: (data as any)?.message ?? 'Failed to fetch users' },
        { status: response.status }
      )
    }

    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch users', error: (error as Error).message },
      { status: 500 }
    )
  }
}
