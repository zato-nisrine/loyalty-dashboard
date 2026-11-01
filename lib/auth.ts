import { cookies } from 'next/headers'

export async function getRestaurant() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('access_token')?.value

    if (!token) return null

    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    if (!apiUrl) return null

    const res = await fetch(`${apiUrl}/restaurants/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    })

    if (!res.ok) return null

    return await res.json()
  } catch (error) {
    console.error('Erreur getRestaurant:', error)
    return null
  }
}

export async function getToken() {
  const cookieStore = await cookies()
  return cookieStore.get('access_token')?.value
}
