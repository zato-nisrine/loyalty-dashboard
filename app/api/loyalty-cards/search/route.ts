import { NextRequest, NextResponse } from 'next/server'
import { getToken } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const token = await getToken()
  if (!token) return NextResponse.json({ message: 'Non authentifié' }, { status: 401 })

  const pseudo = req.nextUrl.searchParams.get('pseudo')

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/loyalty-cards/search?pseudo=${pseudo}`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!res.ok) {
    const error = await res.json()
    return NextResponse.json(error, { status: res.status })
  }

  return NextResponse.json(await res.json())
}
