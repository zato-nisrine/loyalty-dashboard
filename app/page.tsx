import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="mx-auto max-w-3xl px-5">

        <nav className="flex items-center justify-between py-5">
          <p className="font-[family-name:var(--font-display)] text-xl font-semibold text-stone-900">Fidele</p>
          <div className="flex items-center gap-2">
            <Link href="/login" className="rounded-full border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700">
              Se connecter
            </Link>
            <Link href="/register" className="rounded-full bg-[#C2410C] px-4 py-2 text-sm font-medium text-white">
              Demarrer gratuitement
            </Link>
          </div>
        </nav>

        <section className="py-14 text-center">
          <div className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700">
            7 jours d essai gratuit, sans carte bancaire
          </div>
          <h1 className="mx-auto max-w-xl font-[family-name:var(--font-display)] text-4xl font-semibold text-stone-900 sm:text-5xl" style={{lineHeight: '1.15'}}>
            Faites revenir vos clients, <span style={{color: '#C2410C'}}>automatiquement</span>
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm text-stone-500 sm:text-base" style={{lineHeight: '1.6'}}>
            Systeme de points, QR code, recompenses et campagnes marketing. Tout ce dont votre commerce a besoin pour fideliser, sans application a telecharger.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link href="/register" className="rounded-full bg-[#C2410C] px-7 py-3 text-sm font-medium text-white">
              Commencer gratuitement
            </Link>
            <Link href="/login" className="rounded-full border border-stone-300 px-7 py-3 text-sm font-medium text-stone-700">
              Se connecter
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-8">
            <div className="text-center">
              <p className="font-[family-name:var(--font-display)] text-2xl font-semibold text-stone-900">0 app</p>
              <p className="mt-1 text-xs text-stone-400">a telecharger pour vos clients</p>
            </div>
            <div className="text-center">
              <p className="font-[family-name:var(--font-display)] text-2xl font-semibold text-stone-900">5 min</p>
              <p className="mt-1 text-xs text-stone-400">pour demarrer</p>
            </div>
            <div className="text-center">
              <p className="font-[family-name:var(--font-display)] text-2xl font-semibold text-stone-900">7 jours</p>
              <p className="mt-1 text-xs text-stone-400">d essai gratuit</p>
            </div>
          </div>
        </section>

        <hr className="border-stone-200" />

        <section className="py-12">
          <h2 className="text-center font-[family-name:var(--font-display)] text-2xl font-semibold text-stone-900">Tout ce qu il faut, rien de superflu</h2>
          <p className="mt-2 text-center text-sm text-stone-500">Pense pour les pressings, restaurants, lavages auto, garages et bien plus.</p>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-2xl bg-white p-5">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-[#FBE9DD]">
                <span style={{color: '#C2410C', fontSize: '18px'}}>&#8981;</span>
              </div>
              <p className="text-sm font-medium text-stone-900">QR code instantane</p>
              <p className="mt-1 text-xs text-stone-500" style={{lineHeight: '1.5'}}>Le client scanne, cree sa carte, et recoit ses points en quelques secondes.</p>
            </div>
            <div className="rounded-2xl bg-white p-5">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-[#FBE9DD]">
                <span style={{color: '#C2410C', fontSize: '18px'}}>&#9733;</span>
              </div>
              <p className="text-sm font-medium text-stone-900">Points fidelite</p>
              <p className="mt-1 text-xs text-stone-500" style={{lineHeight: '1.5'}}>Vous fixez le taux et les recompenses selon vos propres regles.</p>
            </div>
            <div className="rounded-2xl bg-white p-5">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-[#FBE9DD]">
                <span style={{color: '#C2410C', fontSize: '18px'}}>&#128227;</span>
              </div>
              <p className="text-sm font-medium text-stone-900">Campagnes marketing</p>
              <p className="mt-1 text-xs text-stone-500" style={{lineHeight: '1.5'}}>Envoyez des promotions a tous vos clients en un clic.</p>
            </div>
            <div className="rounded-2xl bg-white p-5">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-[#FBE9DD]">
                <span style={{color: '#C2410C', fontSize: '18px'}}>&#127873;</span>
              </div>
              <p className="text-sm font-medium text-stone-900">Anniversaires auto</p>
              <p className="mt-1 text-xs text-stone-500" style={{lineHeight: '1.5'}}>Un message et des points offerts chaque anniversaire, sans rien faire.</p>
            </div>
          </div>
        </section>

        <hr className="border-stone-200" />

        <section className="py-12">
          <h2 className="text-center font-[family-name:var(--font-display)] text-2xl font-semibold text-stone-900">Comment ca marche</h2>
          <p className="mt-2 text-center text-sm text-stone-500">En place en moins de 5 minutes.</p>
          <div className="mx-auto mt-8 max-w-md space-y-5">
            {[
              { n: '1', t: 'Creez votre compte', d: 'Inscrivez-vous, personnalisez votre logo et votre couleur de marque.' },
              { n: '2', t: 'Affichez votre QR code en caisse', d: 'Imprimez-le ou affichez-le sur une tablette. Vos clients le scannent avec leur telephone.' },
              { n: '3', t: 'Generez un code apres chaque achat', d: 'Saisissez le montant, donnez le code au client. Les points sont credites automatiquement.' },
              { n: '4', t: 'Vos clients reviennent', d: 'Ils echangent leurs points contre des recompenses que vous avez definies.' },
            ].map((step) => (
              <div key={step.n} className="flex items-start gap-4">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white" style={{backgroundColor: '#C2410C', marginTop: '2px'}}>
                  {step.n}
                </div>
                <div>
                  <p className="text-sm font-medium text-stone-900">{step.t}</p>
                  <p className="mt-1 text-xs text-stone-500" style={{lineHeight: '1.5'}}>{step.d}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-stone-200" />

        <section className="py-12">
          <h2 className="text-center font-[family-name:var(--font-display)] text-2xl font-semibold text-stone-900">Des offres pour chaque commerce</h2>
          <p className="mt-2 text-center text-sm text-stone-500">Sans engagement. Changez de plan a tout moment.</p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-stone-200 bg-white p-6">
              <p className="text-xs text-stone-400">Starter</p>
              <p className="mt-1 font-[family-name:var(--font-display)] text-2xl font-semibold text-stone-900">5 000 <span className="text-xs font-normal text-stone-400">FCFA/mois</span></p>
              <hr className="my-4 border-stone-100" />
              {['Jusqu a 30 clients', 'QR code personnalise', 'Systeme de points', 'Recompenses'].map((f) => (
                <p key={f} className="mb-2 flex items-center gap-2 text-xs text-stone-600">
                  <span style={{color: '#16a34a'}}>&#10003;</span> {f}
                </p>
              ))}
            </div>
            <div className="rounded-2xl border-2 bg-white p-6" style={{borderColor: '#C2410C'}}>
              <span className="inline-block rounded-full bg-[#FBE9DD] px-2.5 py-0.5 text-xs font-medium text-[#9A3412] mb-2">Populaire</span>
              <p className="text-xs text-stone-400">Pro</p>
              <p className="mt-1 font-[family-name:var(--font-display)] text-2xl font-semibold text-stone-900">15 000 <span className="text-xs font-normal text-stone-400">FCFA/mois</span></p>
              <hr className="my-4 border-stone-100" />
              {['Clients illimites', 'Campagnes marketing', 'Anniversaires automatiques', 'Statistiques avancees'].map((f) => (
                <p key={f} className="mb-2 flex items-center gap-2 text-xs text-stone-600">
                  <span style={{color: '#16a34a'}}>&#10003;</span> {f}
                </p>
              ))}
            </div>
            <div className="rounded-2xl border border-stone-200 bg-white p-6">
              <p className="text-xs text-stone-400">Premium</p>
              <p className="mt-1 font-[family-name:var(--font-display)] text-2xl font-semibold text-stone-900">30 000 <span className="text-xs font-normal text-stone-400">FCFA/mois</span></p>
              <hr className="my-4 border-stone-100" />
              {['Tout le plan Pro', 'Notifications SMS', 'WhatsApp', 'Automatisations avancees'].map((f) => (
                <p key={f} className="mb-2 flex items-center gap-2 text-xs text-stone-600">
                  <span style={{color: '#16a34a'}}>&#10003;</span> {f}
                </p>
              ))}
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-stone-400">7 jours d essai gratuit sur tous les plans. Aucune carte bancaire requise.</p>
        </section>

        <section className="mb-10 rounded-2xl p-10 text-center" style={{backgroundColor: '#1C1917'}}>
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold" style={{color: '#FAF7F2'}}>Pret a fideliser vos clients ?</h2>
          <p className="mt-2 text-sm" style={{color: '#A8A29E'}}>Commencez gratuitement aujourd hui. Votre premier QR code en 5 minutes.</p>
          <Link href="/register" className="mt-6 inline-block rounded-full bg-[#C2410C] px-8 py-3 text-sm font-medium text-white">
            Creer mon compte gratuitement
          </Link>
        </section>

        <footer className="border-t border-stone-200 py-6 text-center">
          <p className="text-xs text-stone-400">Fidele — Plateforme de fidelisation pour commerces et entreprises</p>
        </footer>

      </div>
    </div>
  )
}
