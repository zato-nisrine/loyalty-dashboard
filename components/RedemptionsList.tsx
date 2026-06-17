'use client'

import { useState } from 'react'

export default function RedemptionsList({ initialRedemptions, brandColor }: { initialRedemptions: any[]; brandColor: string }) {
  const [redemptions, setRedemptions] = useState(initialRedemptions)
  const [processing, setProcessing] = useState<string | null>(null)

  async function handleAction(id: string, action: 'confirm' | 'reject') {
    setProcessing(id)
    const res = await fetch(`/api/rewards/${id}/${action}`, { method: 'PATCH' })
    setProcessing(null)
    if (!res.ok) return
    setRedemptions(redemptions.filter((r) => r.id !== id))
  }

  if (redemptions.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-8 text-center">
        <p className="text-sm text-stone-500">Aucune demande en attente</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {redemptions.map((r) => (
        <div key={r.id} className="flex items-center justify-between rounded-2xl border border-stone-200 bg-white p-5">
          <div>
            <p className="text-sm font-medium text-stone-900">{r.loyaltyCard.client.name}</p>
            <p className="text-xs text-stone-500">{r.loyaltyCard.client.phone}</p>
            <p className="mt-2 text-sm text-stone-700">
              {r.rewardRule.name} — {r.rewardRule.rewardDescription}
            </p>
            <span
              className="mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold"
              style={{ backgroundColor: `${brandColor}1A`, color: brandColor }}
            >
              {r.pointsSpent} pts
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleAction(r.id, 'confirm')}
              disabled={processing === r.id}
              className="rounded-full px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
              style={{ backgroundColor: brandColor }}
            >
              Confirmer
            </button>
            <button
              onClick={() => handleAction(r.id, 'reject')}
              disabled={processing === r.id}
              className="rounded-full border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 disabled:opacity-50"
            >
              Refuser
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
