'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import LoynivaLogo from '@/components/LoynivaLogo'

export default function AdminLoginPage() {
  const router = useRouter()
  const [secret, setSecret] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret }),
    })

    setLoading(false)

    if (!res.ok) {
      setError('Mot de passe incorrect')
      return
    }

    router.push('/admin/dashboard')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F5F8FC] px-5 dark:bg-[#091420]">
      <div className="mb-6">
        <LoynivaLogo size="md" showTagline={false} />
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-5 rounded-2xl border border-[#D8E0E8] bg-white p-7 shadow-sm dark:border-white/10 dark:bg-[#102A43]">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-[#102A43] dark:text-white">
            Espace administrateur
          </h1>
          <p className="mt-1 text-xs text-[#5B7286] dark:text-[#8FA6BA]">Accès réservé LOYNIVA</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#243746] dark:text-[#D8E0E8]">
              Mot de passe admin
            </label>
            <input
              type="password"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full rounded-xl border border-[#D8E0E8] bg-[#F5F8FC] px-3.5 py-2.5 text-sm text-[#243746] outline-none transition-all focus:border-[#4F9DCE] focus:bg-white focus:ring-2 focus:ring-[#4F9DCE]/20 dark:border-white/10 dark:bg-[#173859] dark:text-white"
            />
          </div>

          {error && <p className="text-xs font-semibold text-[#C43D4D]">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#102A43] py-3 text-sm font-semibold text-white hover:bg-[#1A3E61] transition-all disabled:opacity-50"
          >
            {loading ? 'Connexion...' : 'Accéder au panel'}
          </button>
        </div>
      </form>
    </div>
  )
}
