import { NextResponse } from 'next/server'
import { getAdminSecret } from '@/lib/admin-auth'

export async function GET() {
  const secret = await getAdminSecret()
  if (!secret) return NextResponse.json({ message: 'Non autorisé' }, { status: 401 })

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/restaurants`, {
    headers: { 'x-admin-secret': secret },
    cache: 'no-store',
  })

  if (!res.ok) return NextResponse.json(await res.json(), { status: res.status })
  return NextResponse.json(await res.json())
}
