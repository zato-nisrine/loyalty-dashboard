import { NextRequest, NextResponse } from 'next/server'
import { getToken } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const token = await getToken()
  if (!token) return NextResponse.json({ message: 'Non authentifié' }, { status: 401 })

  const formData = await req.formData()

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/restaurants/me/logo`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  })

  if (!res.ok) {
    const error = await res.json()
    return NextResponse.json(error, { status: res.status })
  }

  return NextResponse.json(await res.json())
}
