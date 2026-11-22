export async function getRestaurantClient() {
  try {
    const res = await fetch('/api/auth/me', { cache: 'no-store' })
    if (!res.ok) return null
    const data = await res.json()
    return data.authenticated ? data.restaurant : null
  } catch (error) {
    console.error('Erreur getRestaurantClient:', error)
    return null
  }
}

