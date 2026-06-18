'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

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
    <div className="flex min-h-screen items-center justify-center bg-[#FAF7F2] px-5">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-5">
        <div className="text-center">
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-stone-900">
            Espace administrateur
          </h1>
          <p className="mt-1 text-sm text-stone-500">Accès réservé</p>
        </div>

        <div className="space-y-3 rounded-2xl border border-stone-200 bg-white p-5">
          <div className="space-y-1">
            <label className="text-sm text-stone-600">Mot de passe admin</label>
            <input
              type="password"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              required
              className="w-full rounded-lg border border-stone-300 px-3 py-2.5 text-sm text-stone-900"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-stone-900 py-2.5 text-sm font-medium text-white disabled:opacity-50"
          >
            {loading ? 'Connexion...' : 'Accéder'}
          </button>
        </div>
      </form>
    </div>
  )
}
