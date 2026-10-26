'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import LoynivaLogo from '@/components/LoynivaLogo'

const BUSINESS_TYPES = [
  { value: 'restaurant', label: 'Restaurant / Café' },
  { value: 'coiffeur', label: 'Coiffure & Beauté' },
  { value: 'tailleur', label: 'Couture & Tailleur' },
  { value: 'lavage', label: 'Lavage automobile' },
  { value: 'pressing', label: 'Pressing & Nettoyage' },
  { value: 'autre', label: 'Autre commerce' },
]

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [businessType, setBusinessType] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, businessType }),
    })

    setLoading(false)

    if (!res.ok) {
      const data = await res.json()
      setError(data.message || "Erreur lors de l'inscription")
      return
    }

    router.push('/dashboard')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F5F8FC] px-4 py-12 dark:bg-[#091420]">
      <div className="mb-6 flex flex-col items-center text-center">
        <Link href="/" className="transition-opacity hover:opacity-90">
          <LoynivaLogo size="lg" showTagline={true} />
        </Link>
      </div>

      <div className="w-full max-w-md rounded-2xl border border-[#D8E0E8] bg-white p-8 shadow-sm dark:border-white/10 dark:bg-[#102A43]">
        <div className="mb-6">
          <h1 className="font-display text-2xl font-bold tracking-tight text-[#102A43] dark:text-white">
            Créer un compte LOYNIVA
          </h1>
          <p className="mt-1 text-sm text-[#5B7286] dark:text-[#8FA6BA]">
            7 jours d'essai gratuit • Sans carte bancaire
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#243746] dark:text-[#D8E0E8]">
              Nom de votre commerce
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Ex : Café de la Paix"
              className="w-full rounded-xl border border-[#D8E0E8] bg-[#F5F8FC] px-3.5 py-2.5 text-sm text-[#243746] outline-none transition-all focus:border-[#4F9DCE] focus:bg-white focus:ring-2 focus:ring-[#4F9DCE]/20 dark:border-white/10 dark:bg-[#173859] dark:text-white"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#243746] dark:text-[#D8E0E8]">
              Activité principale
            </label>
            <select
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              required
              className="w-full rounded-xl border border-[#D8E0E8] bg-[#F5F8FC] px-3.5 py-2.5 text-sm text-[#243746] outline-none transition-all focus:border-[#4F9DCE] focus:bg-white focus:ring-2 focus:ring-[#4F9DCE]/20 dark:border-white/10 dark:bg-[#173859] dark:text-white"
            >
              <option value="" disabled>
                Sélectionnez votre type d'activité
              </option>
              {BUSINESS_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#243746] dark:text-[#D8E0E8]">
              Email professionnel
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="contact@moncommerce.com"
              className="w-full rounded-xl border border-[#D8E0E8] bg-[#F5F8FC] px-3.5 py-2.5 text-sm text-[#243746] outline-none transition-all focus:border-[#4F9DCE] focus:bg-white focus:ring-2 focus:ring-[#4F9DCE]/20 dark:border-white/10 dark:bg-[#173859] dark:text-white"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#243746] dark:text-[#D8E0E8]">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder="Au moins 6 caractères"
              className="w-full rounded-xl border border-[#D8E0E8] bg-[#F5F8FC] px-3.5 py-2.5 text-sm text-[#243746] outline-none transition-all focus:border-[#4F9DCE] focus:bg-white focus:ring-2 focus:ring-[#4F9DCE]/20 dark:border-white/10 dark:bg-[#173859] dark:text-white"
            />
          </div>

          {error && (
            <div className="rounded-xl border border-[#C43D4D]/20 bg-[#C43D4D]/10 p-3 text-sm text-[#C43D4D] font-medium">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#102A43] py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#1A3E61] transition-all disabled:opacity-50"
          >
            {loading ? 'Création du compte...' : 'Commencer gratuitement'}
          </button>
        </form>

        <div className="mt-6 border-t border-[#D8E0E8] pt-5 text-center text-sm text-[#5B7286] dark:border-white/10 dark:text-[#8FA6BA]">
          Vous avez déjà un compte ?{' '}
          <Link href="/login" className="font-semibold text-[#4F9DCE] hover:underline">
            Se connecter
          </Link>
        </div>
      </div>

      <p className="mt-8 text-center text-xs text-[#5B7286] dark:text-[#8FA6BA]">
        LOYNIVA — Chaque visite compte.
      </p>
    </div>
  )
}
