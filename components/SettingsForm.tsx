'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SettingsForm({ restaurant }: { restaurant: any }) {
  const router = useRouter()
  const [logoPreview, setLogoPreview] = useState(restaurant.logoUrl)
  const [brandColor, setBrandColor] = useState(restaurant.brandColor)
  const [uploading, setUploading] = useState(false)
  const [savingColor, setSavingColor] = useState(false)
  const [message, setMessage] = useState('')

  async function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setMessage('')

    const formData = new FormData()
    formData.append('file', file)

    const res = await fetch('/api/restaurants/logo', {
      method: 'POST',
      body: formData,
    })

    setUploading(false)

    if (!res.ok) {
      setMessage('Erreur lors du téléversement du logo')
      return
    }

    const data = await res.json()
    setLogoPreview(data.logoUrl)
    router.refresh()
  }

  async function handleColorSave() {
    setSavingColor(true)
    setMessage('')

    const res = await fetch('/api/restaurants/branding', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ brandColor }),
    })

    setSavingColor(false)

    if (!res.ok) {
      setMessage('Erreur lors de la mise à jour de la couleur')
      return
    }

    setMessage('Couleur mise à jour')
    router.refresh()
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-stone-200 bg-white p-6">
        <h2 className="mb-4 font-[family-name:var(--font-display)] text-lg font-semibold text-stone-900">
          Logo
        </h2>
        <div className="flex items-center gap-5">
          <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-stone-200 bg-stone-50">
            {logoPreview ? (
              <img src={logoPreview} alt="Logo du restaurant" className="h-full w-full object-cover" />
            ) : (
              <span className="text-xs text-stone-400">Aucun logo</span>
            )}
          </div>
          <label className="cursor-pointer rounded-full border border-stone-300 px-5 py-2 text-sm font-medium text-stone-700 hover:border-stone-400">
            {uploading ? 'Téléversement...' : 'Choisir une image'}
            <input type="file" accept="image/*" onChange={handleLogoChange} disabled={uploading} className="hidden" />
          </label>
        </div>
      </div>

      <div className="rounded-2xl border border-stone-200 bg-white p-6">
        <h2 className="mb-4 font-[family-name:var(--font-display)] text-lg font-semibold text-stone-900">
          Couleur de marque
        </h2>
        <div className="flex items-center gap-4">
          <input
            type="color"
            value={brandColor}
            onChange={(e) => setBrandColor(e.target.value)}
            className="h-12 w-12 cursor-pointer rounded-lg border border-stone-200"
          />
          <input
            type="text"
            value={brandColor}
            onChange={(e) => setBrandColor(e.target.value)}
            className="w-32 rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900"
          />
          <button
            onClick={handleColorSave}
            disabled={savingColor}
            className="rounded-full px-5 py-2 text-sm font-medium text-white disabled:opacity-50"
            style={{ backgroundColor: brandColor }}
          >
            {savingColor ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </div>
        <p className="mt-3 text-xs text-stone-500">
          Cette couleur sera utilisée sur votre dashboard et sur la carte de fidélité de vos clients.
        </p>
      </div>

      {message && <p className="text-sm text-stone-600">{message}</p>}
    </div>
  )
}
