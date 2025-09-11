import { BACKEND_BASE_URL } from '../../../lib/utils'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { userName: string } }
) {
  try {
    const { userName } = params
    const { searchParams } = new URL(request.url)
    const queryString = searchParams.toString()

    const url = `${BACKEND_BASE_URL}/shifts?userName=${userName}${
      queryString ? `&${queryString}` : ''
    }`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      cache: 'no-store',
    })

    const data = await response.json().catch(() => null)

    if (!response.ok) {
      return NextResponse.json(
        { message: (data as any)?.message ?? 'Failed to fetch user shifts' },
        { status: response.status }
      )
    }

    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Failed to fetch user shifts',
        error: (error as Error).message,
      },
      { status: 500 }
    )
  }
}

export async function POST(
  request: Request,
  { params }: { params: { userName: string } }
) {
  try {
    const { userName } = params
    const body = await request.json()

    const response = await fetch(`${BACKEND_BASE_URL}/shifts/${userName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        ...body,
      }),
      cache: 'no-store',
    })

    const data = await response.json().catch(() => null)

    if (!response.ok) {
      return NextResponse.json(
        {
          message: (data as any)?.message ?? 'Failed to create user shift',
        },
        { status: response.status }
      )
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Failed to create user shift',
        error: (error as Error).message,
      },
      { status: 500 }
    )
  }
}
