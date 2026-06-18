import { NextRequest, NextResponse } from 'next/server'
import { getAdminSecret } from '@/lib/admin-auth'

export async function POST(req: NextRequest) {
  const secret = await getAdminSecret()
  if (!secret) return NextResponse.json({ message: 'Non autorisé' }, { status: 401 })

  const body = await req.json()

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/restaurants/activate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-admin-secret': secret },
    body: JSON.stringify(body),
  })

  if (!res.ok) return NextResponse.json(await res.json(), { status: res.status })
  return NextResponse.json(await res.json())
}
