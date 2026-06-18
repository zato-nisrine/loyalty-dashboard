import { cookies } from 'next/headers'

export async function getAdminSecret(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get('admin_secret')?.value || null
}

export async function checkAdminAuth(): Promise<boolean> {
  const secret = await getAdminSecret()
  return secret === process.env.ADMIN_SECRET
}
