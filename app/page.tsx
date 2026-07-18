import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <header className="flex items-center justify-between px-5 py-5 sm:px-10">
        <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-stone-900">Fidèle</p>
        <Link href="/login" className="text-sm font-medium text-stone-700">
          Se connecter
        </Link>
      </header>

      <section className="px-5 py-10 text-center sm:py-16">
        <h1 className="mx-auto max-w-xl font-[family-name:var(--font-display)] text-3xl font-semibold text-stone-900 sm:text-4xl">
          Fidélisez vos clients, automatiquement
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm text-stone-500 sm:text-base">
          Système de points, codes de validation, récompenses. Tout ce qu'il faut pour faire revenir vos
          clients, sans application à installer.
        </p>
        <Link
          href="/register"
          className="mt-6 inline-block rounded-full bg-[#C2410C] px-7 py-3 text-sm font-medium text-white"
        >
          Commencer gratuitement — 7 jours d'essai
        </Link>
      </section>

      <section className="mx-auto grid max-w-3xl grid-cols-1 gap-4 px-5 sm:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 text-center">
          <p className="font-[family-name:var(--font-display)] text-base font-semibold text-stone-900">
            Points fidélité
          </p>
          <p className="mt-2 text-sm text-stone-500">
            Vos clients gagnent des points à chaque achat, selon vos propres règles.
          </p>
        </div>
        <div className="rounded-2xl bg-white p-6 text-center">
          <p className="font-[family-name:var(--font-display)] text-base font-semibold text-stone-900">
            QR code instantané
          </p>
          <p className="mt-2 text-sm text-stone-500">
            Le client scanne, crée sa carte, et reçoit un code de validation après chaque achat.
          </p>
        </div>
        <div className="rounded-2xl bg-white p-6 text-center">
          <p className="font-[family-name:var(--font-display)] text-base font-semibold text-stone-900">
            Récompenses
          </p>
          <p className="mt-2 text-sm text-stone-500">
            Vous définissez les paliers et les récompenses, vous gardez le contrôle.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-16">
        <h2 className="text-center font-[family-name:var(--font-display)] text-xl font-semibold text-stone-900">
          Des offres pour chaque taille de commerce
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-stone-200 bg-white p-6">
            <p className="text-xs text-stone-500">Starter</p>
            <p className="mt-1 text-2xl font-semibold text-stone-900">
              5 000 <span className="text-xs font-normal text-stone-500">FCFA/mois</span>
            </p>
            <p className="mt-3 text-sm text-stone-600">Jusqu'à 30 clients, QR code, points fidélité</p>
          </div>

          <div className="rounded-2xl border-2 border-[#C2410C] bg-white p-6">
            <span className="inline-block rounded-md bg-[#FBE9DD] px-2.5 py-0.5 text-xs font-medium text-[#9A3412]">
              Populaire
            </span>
            <p className="mt-2 text-xs text-stone-500">Pro</p>
            <p className="mt-1 text-2xl font-semibold text-stone-900">
              15 000 <span className="text-xs font-normal text-stone-500">FCFA/mois</span>
            </p>
            <p className="mt-3 text-sm text-stone-600">Clients illimités, campagnes marketing</p>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-6">
            <p className="text-xs text-stone-500">Premium</p>
            <p className="mt-1 text-2xl font-semibold text-stone-900">
              30 000 <span className="text-xs font-normal text-stone-500">FCFA/mois</span>
            </p>
            <p className="mt-3 text-sm text-stone-600">SMS, WhatsApp, automatisations avancées</p>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-stone-500">
          7 jours d'essai gratuit sur tous les plans, sans engagement.
        </p>
      </section>

      <footer className="border-t border-stone-200 px-5 py-6 text-center text-xs text-stone-400">
        Fidèle — plateforme de fidélisation pour commerces et commerces
      </footer>
    </div>
  )
}
