import { cookies } from 'next/headers'

export async function getRestaurant() {
  const cookieStore = await cookies()
  const token = cookieStore.get('access_token')?.value

  if (!token) return null

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/restaurants/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  })

  if (!res.ok) return null

  return res.json()
}

export async function getToken() {
  const cookieStore = await cookies()
  return cookieStore.get('access_token')?.value
}
