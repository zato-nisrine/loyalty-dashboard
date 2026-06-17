'use client'

import { useState } from 'react'

const TYPE_LABELS: Record<string, string> = {
  new_product: 'Nouveau produit',
  promotion: 'Promotion',
  event: 'Événement',
  happy_hour: 'Happy hour',
}

export default function CampaignsManager({ initialCampaigns, brandColor }: { initialCampaigns: any[]; brandColor: string }) {
  const [campaigns, setCampaigns] = useState(initialCampaigns)
  const [type, setType] = useState('promotion')
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [successCount, setSuccessCount] = useState<number | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccessCount(null)
    setSending(true)

    const res = await fetch('/api/campaigns', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, title, message }),
    })

    setSending(false)

    if (!res.ok) {
      const data = await res.json()
      setError(data.message || "Erreur lors de l'envoi")
      return
    }

    const campaign = await res.json()
    setCampaigns([campaign, ...campaigns])
    setSuccessCount(campaign.sentTo)
    setTitle('')
    setMessage('')
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-stone-200 bg-white p-6">
        <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-stone-900">
          Nouvelle campagne
        </h2>

        <div className="space-y-1">
          <label className="text-sm text-stone-600">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900"
          >
            <option value="promotion">Promotion</option>
            <option value="new_product">Nouveau produit</option>
            <option value="event">Événement</option>
            <option value="happy_hour">Happy hour</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-sm text-stone-600">Titre</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="-20% ce week-end"
            className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-stone-600">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={3}
            placeholder="Profitez de -20% sur toute la carte ce week-end !"
            className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {successCount !== null && (
          <p className="text-sm font-medium text-green-700">Envoyée à {successCount} client(s)</p>
        )}

        <button
          type="submit"
          disabled={sending}
          className="rounded-full px-5 py-2 text-sm font-medium text-white disabled:opacity-50"
          style={{ backgroundColor: brandColor }}
        >
          {sending ? 'Envoi...' : 'Envoyer la campagne'}
        </button>
      </form>

      <div className="space-y-3">
        <h2 className="font-[family-name:var(--font-display)] text-base font-semibold text-stone-900">
          Historique
        </h2>
        {campaigns.length === 0 && (
          <p className="text-sm text-stone-500">Aucune campagne envoyée pour le moment</p>
        )}
        {campaigns.map((c) => (
          <div key={c.id} className="rounded-2xl border border-stone-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <span
                className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                style={{ backgroundColor: `${brandColor}1A`, color: brandColor }}
              >
                {TYPE_LABELS[c.type] || c.type}
              </span>
              <span className="text-xs text-stone-400">
                {new Date(c.createdAt).toLocaleDateString('fr-FR')}
              </span>
            </div>
            <p className="mt-2 text-sm font-medium text-stone-900">{c.title}</p>
            <p className="text-sm text-stone-500">{c.message}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
