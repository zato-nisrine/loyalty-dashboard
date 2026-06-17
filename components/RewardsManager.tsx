'use client'

import { useState } from 'react'

export default function RewardsManager({
  initialRules,
  brandColor,
  pointsPer100Fcfa,
}: {
  initialRules: any[]
  brandColor: string
  pointsPer100Fcfa: number
}) {
  const [rules, setRules] = useState(initialRules)
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [pointsRequired, setPointsRequired] = useState('')
  const [rewardDescription, setRewardDescription] = useState('')
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState('')

  const equivalentFcfa = pointsRequired
    ? Math.round((Number(pointsRequired) / pointsPer100Fcfa) * 100)
    : 0

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setCreating(true)

    const res = await fetch('/api/reward-rules', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        pointsRequired: Number(pointsRequired),
        rewardDescription,
      }),
    })

    setCreating(false)

    if (!res.ok) {
      const data = await res.json()
      setError(data.message || 'Erreur lors de la création')
      return
    }

    const newRule = await res.json()
    setRules([...rules, newRule].sort((a, b) => a.pointsRequired - b.pointsRequired))
    setName('')
    setPointsRequired('')
    setRewardDescription('')
    setShowForm(false)
  }

  async function toggleActive(rule: any) {
    const res = await fetch(`/api/reward-rules/${rule.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: !rule.isActive }),
    })
    if (!res.ok) return
    const updated = await res.json()
    setRules(rules.map((r) => (r.id === rule.id ? updated : r)))
  }

  async function deleteRule(id: string) {
    const res = await fetch(`/api/reward-rules/${id}`, { method: 'DELETE' })
    if (!res.ok) return
    setRules(rules.filter((r) => r.id !== id))
  }

  return (
    <div className="space-y-4">
      {rules.map((rule) => (
        <div key={rule.id} className="flex items-center justify-between rounded-2xl border border-stone-200 bg-white p-5">
          <div className="flex items-center gap-4">
            <span
              className="rounded-full px-3 py-1 text-sm font-semibold"
              style={{ backgroundColor: `${brandColor}1A`, color: brandColor }}
            >
              {rule.pointsRequired} pts
            </span>
            <div>
              <p className="text-sm font-medium text-stone-900">{rule.name}</p>
              <p className="text-xs text-stone-500">{rule.rewardDescription}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => toggleActive(rule)}
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                rule.isActive ? 'bg-green-100 text-green-700' : 'bg-stone-100 text-stone-500'
              }`}
            >
              {rule.isActive ? 'Active' : 'Inactive'}
            </button>
            <button
              onClick={() => deleteRule(rule.id)}
              className="text-xs font-medium text-red-600 hover:underline"
            >
              Supprimer
            </button>
          </div>
        </div>
      ))}

      {rules.length === 0 && !showForm && (
        <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-8 text-center">
          <p className="text-sm text-stone-500">Aucune récompense configurée pour le moment</p>
        </div>
      )}

      {showForm ? (
        <form onSubmit={handleCreate} className="space-y-4 rounded-2xl border border-stone-200 bg-white p-6">
          <div className="space-y-1">
            <label className="text-sm text-stone-600">Nom de la récompense</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Boisson offerte"
              className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-stone-600">Points requis</label>
            <input
              type="number"
              value={pointsRequired}
              onChange={(e) => setPointsRequired(e.target.value)}
              required
              min={1}
              placeholder="100"
              className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900"
            />
            {pointsRequired && (
              <p className="text-xs text-stone-500">
                Équivalent à environ <span className="font-medium text-stone-700">{equivalentFcfa.toLocaleString()} FCFA</span> de dépenses
              </p>
            )}
          </div>
          <div className="space-y-1">
            <label className="text-sm text-stone-600">Description</label>
            <input
              type="text"
              value={rewardDescription}
              onChange={(e) => setRewardDescription(e.target.value)}
              required
              placeholder="Une boisson au choix offerte"
              className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={creating}
              className="rounded-full px-5 py-2 text-sm font-medium text-white disabled:opacity-50"
              style={{ backgroundColor: brandColor }}
            >
              {creating ? 'Création...' : 'Créer'}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-full border border-stone-300 px-5 py-2 text-sm font-medium text-stone-700"
            >
              Annuler
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="w-full rounded-2xl border border-dashed border-stone-300 bg-white p-4 text-sm font-medium text-stone-600 hover:border-stone-400"
        >
          + Ajouter une récompense
        </button>
      )}
    </div>
  )
}
