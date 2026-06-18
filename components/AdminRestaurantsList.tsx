'use client'

import { useState } from 'react'

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  trial: { label: 'Essai', color: 'bg-amber-100 text-amber-700' },
  active: { label: 'Actif', color: 'bg-green-100 text-green-700' },
  expired: { label: 'Expiré', color: 'bg-red-100 text-red-700' },
}

const PLAN_PRICES: Record<string, number> = {
  starter: 5000,
  pro: 15000,
  premium: 30000,
}

export default function AdminRestaurantsList({ initialRestaurants }: { initialRestaurants: any[] }) {
  const [restaurants, setRestaurants] = useState(initialRestaurants)
  const [activating, setActivating] = useState<string | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<Record<string, string>>({})

  async function handleActivate(restaurantId: string) {
    const plan = selectedPlan[restaurantId] || 'starter'
    setActivating(restaurantId)

    const res = await fetch('/api/admin/restaurants/activate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ restaurantId, plan }),
    })

    setActivating(null)

    if (!res.ok) return

    const updated = await res.json()
    setRestaurants(restaurants.map((r) =>
      r.id === restaurantId
        ? { ...r, plan: updated.plan, subscriptionStatus: updated.subscriptionStatus, subscriptionExpiresAt: updated.subscriptionExpiresAt }
        : r
    ))
  }

  return (
    <div className="space-y-4">
      {restaurants.map((r) => {
        const status = STATUS_LABELS[r.subscriptionStatus] || STATUS_LABELS.expired
        const expiresDate = new Date(r.subscriptionExpiresAt)
        const daysLeft = Math.ceil((expiresDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))

        return (
          <div key={r.id} className="rounded-2xl border border-stone-200 bg-white p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-stone-900">{r.name}</p>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${status.color}`}>
                    {status.label}
                  </span>
                  <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-medium text-stone-600 capitalize">
                    {r.plan} — {PLAN_PRICES[r.plan]?.toLocaleString('fr-FR')} FCFA
                  </span>
                </div>
                <p className="mt-1 text-sm text-stone-500">{r.email}</p>
                <p className="mt-1 text-xs text-stone-400">
                  Inscrit le {new Date(r.createdAt).toLocaleDateString('fr-FR')} —{' '}
                  {r.subscriptionStatus === 'active'
                    ? `Expire le ${expiresDate.toLocaleDateString('fr-FR')}`
                    : r.subscriptionStatus === 'trial'
                    ? daysLeft > 0
                      ? `Essai — ${daysLeft} jour(s) restant(s)`
                      : 'Essai expiré'
                    : `Expiré le ${expiresDate.toLocaleDateString('fr-FR')}`}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={selectedPlan[r.id] || r.plan}
                  onChange={(e) => setSelectedPlan({ ...selectedPlan, [r.id]: e.target.value })}
                  className="rounded-lg border border-stone-300 px-2 py-1.5 text-xs text-stone-900"
                >
                  <option value="starter">Starter</option>
                  <option value="pro">Pro</option>
                  <option value="premium">Premium</option>
                </select>
                <button
                  onClick={() => handleActivate(r.id)}
                  disabled={activating === r.id}
                  className="rounded-full bg-stone-900 px-4 py-1.5 text-xs font-medium text-white disabled:opacity-50"
                >
                  {activating === r.id ? '...' : 'Activer'}
                </button>
              </div>
            </div>
          </div>
        )
      })}

      {restaurants.length === 0 && (
        <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-8 text-center">
          <p className="text-sm text-stone-500">Aucun restaurant inscrit pour le moment</p>
        </div>
      )}
    </div>
  )
}
