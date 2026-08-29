'use client'

import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded-full border border-border-subtle px-5 py-2 text-sm font-medium text-foreground hover:border-[#C2410C] hover:text-[#C2410C]"
    >
      Déconnexion
    </button>
  )
}
