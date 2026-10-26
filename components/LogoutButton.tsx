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
      className="rounded-xl border border-border-subtle bg-surface px-4 py-2.5 text-sm font-semibold text-text-main transition-colors hover:border-[#C43D4D] hover:text-[#C43D4D] dark:text-[#D8E0E8]"
    >
      Déconnexion
    </button>
  )
}
