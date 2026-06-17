'use client'

import { useState, useEffect } from 'react'

export default function CodeGenerator({ brandColor }: { brandColor: string }) {
  const [phone, setPhone] = useState('')
  const [client, setClient] = useState<any>(null)
  const [searchError, setSearchError] = useState('')
  const [searching, setSearching] = useState(false)

  const [amount, setAmount] = useState('')
  const [generating, setGenerating] = useState(false)
  const [code, setCode] = useState<any>(null)
  const [codeError, setCodeError] = useState('')
  const [secondsLeft, setSecondsLeft] = useState(0)

  useEffect(() => {
    if (!code) return
    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.floor((new Date(code.expiresAt).getTime() - Date.now()) / 1000))
      setSecondsLeft(remaining)
      if (remaining === 0) clearInterval(interval)
    }, 1000)
    return () => clearInterval(interval)
  }, [code])

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setSearchError('')
    setClient(null)
    setCode(null)
    setSearching(true)

    const res = await fetch(`/api/loyalty-cards/search?phone=${encodeURIComponent(phone)}`)
    setSearching(false)

    if (!res.ok) {
      const data = await res.json()
      setSearchError(data.message || 'Client introuvable')
      return
    }

    setClient(await res.json())
  }

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault()
    setCodeError('')
    setGenerating(true)

    const res = await fetch('/api/validation-codes/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ loyaltyCardId: client.id, amountFcfa: Number(amount) }),
    })

    setGenerating(false)

    if (!res.ok) {
      const data = await res.json()
      setCodeError(data.message || 'Erreur lors de la génération du code')
      return
    }

    setCode(await res.json())
  }

  function reset() {
    setPhone('')
    setClient(null)
    setAmount('')
    setCode(null)
    setSearchError('')
    setCodeError('')
  }

  if (code) {
    const minutes = Math.floor(secondsLeft / 60)
    const seconds = secondsLeft % 60

    return (
      <div className="rounded-2xl border border-stone-200 bg-white p-8 text-center">
        <p className="text-sm text-stone-500">Code à donner à {client.client.name}</p>
        <p
          className="my-6 font-[family-name:var(--font-display)] text-5xl font-bold tracking-widest"
          style={{ color: brandColor }}
        >
          {code.code}
        </p>
        <p className="text-sm text-stone-600">
          Montant : <span className="font-medium text-stone-900">{code.amountFcfa.toLocaleString()} FCFA</span>
        </p>
        <p className="text-sm text-stone-600">
          Points à créditer : <span className="font-medium text-stone-900">{code.pointsToCredit} pts</span>
        </p>

        <div className="mt-6">
          {secondsLeft > 0 ? (
            <p className="text-sm font-medium text-stone-500">
              Expire dans {minutes}:{seconds.toString().padStart(2, '0')}
            </p>
          ) : (
            <p className="text-sm font-medium text-red-600">Ce code a expiré</p>
          )}
        </div>

        <button
          onClick={reset}
          className="mt-6 rounded-full border border-stone-300 px-6 py-2 text-sm font-medium text-stone-700 hover:border-stone-400"
        >
          Générer un nouveau code
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-stone-200 bg-white p-6">
        <h2 className="mb-4 font-[family-name:var(--font-display)] text-lg font-semibold text-stone-900">
          1. Trouver le client
        </h2>
        <form onSubmit={handleSearch} className="flex gap-3">
          <input
            type="tel"
            placeholder="Numéro de téléphone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="flex-1 rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900"
          />
          <button
            type="submit"
            disabled={searching}
            className="rounded-full px-5 py-2 text-sm font-medium text-white disabled:opacity-50"
            style={{ backgroundColor: brandColor }}
          >
            {searching ? 'Recherche...' : 'Rechercher'}
          </button>
        </form>
        {searchError && <p className="mt-3 text-sm text-red-600">{searchError}</p>}
        {client && (
          <div className="mt-4 flex items-center justify-between rounded-lg bg-stone-50 px-4 py-3">
            <div>
              <p className="text-sm font-medium text-stone-900">{client.client.name}</p>
              <p className="text-xs text-stone-500">{client.client.phone}</p>
            </div>
            <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: `${brandColor}1A`, color: brandColor }}>
              {client.pointsBalance} pts
            </span>
          </div>
        )}
      </div>

      {client && (
        <div className="rounded-2xl border border-stone-200 bg-white p-6">
          <h2 className="mb-4 font-[family-name:var(--font-display)] text-lg font-semibold text-stone-900">
            2. Montant de l'achat
          </h2>
          <form onSubmit={handleGenerate} className="flex gap-3">
            <input
              type="number"
              placeholder="Montant en FCFA"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              min={1}
              className="flex-1 rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900"
            />
            <button
              type="submit"
              disabled={generating}
              className="rounded-full px-5 py-2 text-sm font-medium text-white disabled:opacity-50"
              style={{ backgroundColor: brandColor }}
            >
              {generating ? 'Génération...' : 'Générer le code'}
            </button>
          </form>
          {codeError && <p className="mt-3 text-sm text-red-600">{codeError}</p>}
        </div>
      )}
    </div>
  )
}
