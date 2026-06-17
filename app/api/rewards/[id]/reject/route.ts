import { NextResponse } from 'next/server'
import { getToken } from '@/lib/auth'

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const token = await getToken()
  if (!token) return NextResponse.json({ message: 'Non authentifié' }, { status: 401 })

  const { id } = await params

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rewards/${id}/reject`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!res.ok) return NextResponse.json(await res.json(), { status: res.status })
  return NextResponse.json(await res.json())
}
