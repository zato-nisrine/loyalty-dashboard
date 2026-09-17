import Link from 'next/link'

const DARK = {
  bg: '#050505',
  surface: '#131316',
  surfaceMuted: '#1C1C21',
  border: 'rgba(255, 255, 255, 0.08)',
  text: '#F5F5F4',
  textMuted: '#9CA3AF',
  accent: '#C2410C',
  accentLight: 'rgba(194, 65, 12, 0.18)',
}

function HeroCard({ variant }: { variant: 'front' | 'back' }) {
  const isFront = variant === 'front'
  return (
    <div
      className={isFront ? 'hero-card-float' : 'hero-card-float-2'}
      style={{
        position: 'absolute',
        inset: 0,
        borderRadius: 20,
        background: '#0a0a0a',
        border: '1px solid rgba(255,255,255,0.08)',
        padding: 20,
        boxShadow: isFront
          ? '0 30px 60px -15px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)'
          : '0 20px 40px -10px rgba(0,0,0,0.5)',
        zIndex: isFront ? 2 : 1,
        opacity: isFront ? 1 : 0.55,
      }}
    >
      <div
        className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-30 blur-3xl"
        style={{ background: DARK.accent }}
      />
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="flex items-center justify-between">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold text-white"
            style={{ backgroundColor: DARK.accent }}
          >
            F
          </div>
          <p className="text-[10px] uppercase tracking-widest text-gray-500">Carte de fidélité</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Solde</p>
          <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-white tracking-tight">
            2 450 <span className="text-xs font-semibold text-gray-400">pts</span>
          </p>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[9px] uppercase tracking-widest text-gray-500">Titulaire</p>
            <p className="text-xs font-semibold text-white">CLIENT DEMO</p>
          </div>
          <p className="font-[family-name:var(--font-display)] text-sm font-bold text-white">Fidele</p>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div style={{ background: DARK.bg, color: DARK.text, minHeight: '100vh' }}>
      <div className="mx-auto max-w-5xl px-5">

        <nav className="flex items-center justify-between py-6">
          <p className="font-[family-name:var(--font-display)] text-xl font-semibold text-white">Fidele</p>
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="rounded-full border px-4 py-2 text-sm font-medium text-white"
              style={{ borderColor: DARK.border }}
            >
              Se connecter
            </Link>
            <Link
              href="/register"
              className="rounded-full px-4 py-2 text-sm font-medium text-white"
              style={{ backgroundColor: DARK.accent }}
            >
              Demarrer gratuitement
            </Link>
          </div>
        </nav>

        <section className="relative grid gap-10 py-14 lg:grid-cols-2 lg:items-center lg:py-20">
          <div className="relative z-10">
            <div
              className="mb-5 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium"
              style={{ backgroundColor: DARK.accentLight, color: '#FB923C' }}
            >
              7 jours d'essai gratuit, sans carte bancaire
            </div>
            <h1
              className="font-[family-name:var(--font-display)] text-4xl font-semibold text-white sm:text-5xl"
              style={{ lineHeight: '1.15' }}
            >
              Faites revenir vos clients, <span style={{ color: DARK.accent }}>automatiquement</span>
            </h1>
            <p className="mt-4 max-w-md text-sm sm:text-base" style={{ color: DARK.textMuted, lineHeight: '1.6' }}>
              Systeme de points, QR code, recompenses et campagnes marketing. Tout ce dont votre commerce a besoin
              pour fideliser, sans application a telecharger.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/register"
                className="rounded-full px-7 py-3 text-sm font-medium text-white"
                style={{ backgroundColor: DARK.accent }}
              >
                Commencer gratuitement
              </Link>
              <Link
                href="/login"
                className="rounded-full border px-7 py-3 text-sm font-medium text-white"
                style={{ borderColor: DARK.border }}
              >
                Se connecter
              </Link>
            </div>
          </div>

          <div className="relative mx-auto h-72 w-full max-w-sm lg:h-80">
            <svg
              className="pointer-events-none absolute -left-10 -top-6 h-32 w-32 opacity-40"
              viewBox="0 0 120 120"
              fill="none"
            >
              <path
                className="path-draw"
                d="M5 60 C 30 10, 70 100, 115 40"
                stroke={DARK.accent}
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <svg
              className="sparkle-pulse pointer-events-none absolute right-4 top-2 h-6 w-6"
              viewBox="0 0 24 24"
              fill={DARK.accent}
            >
              <path d="M12 2 14 9 21 12 14 15 12 22 10 15 3 12 10 9Z" />
            </svg>
            <div
              className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl"
              style={{ background: DARK.accent }}
            />
            <div className="absolute left-1/2 top-1/2 aspect-[1.586/1] w-56 -translate-x-1/2 -translate-y-1/2">
              <HeroCard variant="back" />
              <HeroCard variant="front" />
            </div>
          </div>
        </section>

        <div
          className="mb-14 flex flex-wrap justify-center gap-8 rounded-2xl px-8 py-6"
          style={{ backgroundColor: DARK.surface, border: `1px solid ${DARK.border}` }}
        >
          <div className="text-center">
            <p className="font-[family-name:var(--font-display)] text-2xl font-semibold text-white">0 app</p>
            <p className="mt-1 text-xs" style={{ color: DARK.textMuted }}>a telecharger pour vos clients</p>
          </div>
          <div className="text-center">
            <p className="font-[family-name:var(--font-display)] text-2xl font-semibold text-white">5 min</p>
            <p className="mt-1 text-xs" style={{ color: DARK.textMuted }}>pour demarrer</p>
          </div>
          <div className="text-center">
            <p className="font-[family-name:var(--font-display)] text-2xl font-semibold text-white">7 jours</p>
            <p className="mt-1 text-xs" style={{ color: DARK.textMuted }}>d'essai gratuit</p>
          </div>
        </div>

        <hr style={{ borderColor: DARK.border }} />

        <section className="py-14">
          <h2 className="text-center font-[family-name:var(--font-display)] text-2xl font-semibold text-white">
            Tout ce qu'il faut, rien de superflu
          </h2>
          <p className="mt-2 text-center text-sm" style={{ color: DARK.textMuted }}>
            Pense pour les pressings, restaurants, lavages auto, garages et bien plus.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { icon: '\u2999', title: 'QR code instantane', desc: 'Le client scanne, cree sa carte, et recoit ses points en quelques secondes.' },
              { icon: '\u2605', title: 'Points fidelite', desc: 'Vous fixez le taux et les recompenses selon vos propres regles.' },
              { icon: '\uD83D\uDCE3', title: 'Campagnes marketing', desc: 'Envoyez des promotions a tous vos clients en un clic.' },
              { icon: '\uD83C\uDF81', title: 'Anniversaires auto', desc: 'Un message et des points offerts chaque anniversaire, sans rien faire.' },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-2xl p-5"
                style={{ backgroundColor: DARK.surface, border: `1px solid ${DARK.border}` }}
              >
                <div
                  className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl"
                  style={{ backgroundColor: DARK.accentLight }}
                >
                  <span style={{ color: DARK.accent, fontSize: '18px' }}>{f.icon}</span>
                </div>
                <p className="text-sm font-medium text-white">{f.title}</p>
                <p className="mt-1 text-xs" style={{ color: DARK.textMuted, lineHeight: '1.5' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <hr style={{ borderColor: DARK.border }} />

        <section className="py-14">
          <h2 className="text-center font-[family-name:var(--font-display)] text-2xl font-semibold text-white">
            Comment ca marche
          </h2>
          <p className="mt-2 text-center text-sm" style={{ color: DARK.textMuted }}>En place en moins de 5 minutes.</p>
          <div className="mx-auto mt-8 max-w-md space-y-5">
            {[
              { n: '1', t: 'Creez votre compte', d: 'Inscrivez-vous, personnalisez votre logo et votre couleur de marque.' },
              { n: '2', t: 'Affichez votre QR code en caisse', d: 'Imprimez-le ou affichez-le sur une tablette. Vos clients le scannent avec leur telephone.' },
              { n: '3', t: 'Generez un code apres chaque achat', d: 'Saisissez le montant, donnez le code au client. Les points sont credites automatiquement.' },
              { n: '4', t: 'Vos clients reviennent', d: 'Ils echangent leurs points contre des recompenses que vous avez definies.' },
            ].map((step) => (
              <div key={step.n} className="flex items-start gap-4">
                <div
                  className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
                  style={{ backgroundColor: DARK.accent, marginTop: '2px' }}
                >
                  {step.n}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{step.t}</p>
                  <p className="mt-1 text-xs" style={{ color: DARK.textMuted, lineHeight: '1.5' }}>{step.d}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr style={{ borderColor: DARK.border }} />

        <section className="py-14">
          <h2 className="text-center font-[family-name:var(--font-display)] text-2xl font-semibold text-white">
            Des offres pour chaque commerce
          </h2>
          <p className="mt-2 text-center text-sm" style={{ color: DARK.textMuted }}>
            Sans engagement. Changez de plan a tout moment.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl p-6" style={{ backgroundColor: DARK.surface, border: `1px solid ${DARK.border}` }}>
              <p className="text-xs" style={{ color: DARK.textMuted }}>Starter</p>
              <p className="mt-1 font-[family-name:var(--font-display)] text-2xl font-semibold text-white">
                5 000 <span className="text-xs font-normal" style={{ color: DARK.textMuted }}>FCFA/mois</span>
              </p>
              <hr className="my-4" style={{ borderColor: DARK.border }} />
              {['Jusqu a 30 clients', 'QR code personnalise', 'Systeme de points', 'Recompenses'].map((f) => (
                <p key={f} className="mb-2 flex items-center gap-2 text-xs" style={{ color: DARK.textMuted }}>
                  <span style={{ color: '#4ade80' }}>&#10003;</span> {f}
                </p>
              ))}
            </div>
            <div className="rounded-2xl p-6" style={{ backgroundColor: DARK.surface, border: `2px solid ${DARK.accent}` }}>
              <span
                className="mb-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium"
                style={{ backgroundColor: DARK.accentLight, color: '#FB923C' }}
              >
                Populaire
              </span>
              <p className="text-xs" style={{ color: DARK.textMuted }}>Pro</p>
              <p className="mt-1 font-[family-name:var(--font-display)] text-2xl font-semibold text-white">
                15 000 <span className="text-xs font-normal" style={{ color: DARK.textMuted }}>FCFA/mois</span>
              </p>
              <hr className="my-4" style={{ borderColor: DARK.border }} />
              {['Clients illimites', 'Campagnes marketing', 'Anniversaires automatiques', 'Statistiques avancees'].map((f) => (
                <p key={f} className="mb-2 flex items-center gap-2 text-xs" style={{ color: DARK.textMuted }}>
                  <span style={{ color: '#4ade80' }}>&#10003;</span> {f}
                </p>
              ))}
            </div>
            <div className="rounded-2xl p-6" style={{ backgroundColor: DARK.surface, border: `1px solid ${DARK.border}` }}>
              <p className="text-xs" style={{ color: DARK.textMuted }}>Premium</p>
              <p className="mt-1 font-[family-name:var(--font-display)] text-2xl font-semibold text-white">
                30 000 <span className="text-xs font-normal" style={{ color: DARK.textMuted }}>FCFA/mois</span>
              </p>
              <hr className="my-4" style={{ borderColor: DARK.border }} />
              {['Tout le plan Pro', 'Notifications SMS', 'WhatsApp', 'Automatisations avancees'].map((f) => (
                <p key={f} className="mb-2 flex items-center gap-2 text-xs" style={{ color: DARK.textMuted }}>
                  <span style={{ color: '#4ade80' }}>&#10003;</span> {f}
                </p>
              ))}
            </div>
          </div>
          <p className="mt-4 text-center text-xs" style={{ color: DARK.textMuted }}>
            7 jours d'essai gratuit sur tous les plans. Aucune carte bancaire requise.
          </p>
        </section>

        <section
          className="relative mb-10 overflow-hidden rounded-2xl p-10 text-center"
          style={{ backgroundColor: DARK.surface, border: `1px solid ${DARK.border}` }}
        >
          <div
            className="absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-20 blur-3xl"
            style={{ background: DARK.accent }}
          />
          <h2 className="relative font-[family-name:var(--font-display)] text-2xl font-semibold text-white">
            Pret a fideliser vos clients ?
          </h2>
          <p className="relative mt-2 text-sm" style={{ color: DARK.textMuted }}>
            Commencez gratuitement aujourd'hui. Votre premier QR code en 5 minutes.
          </p>
          <Link
            href="/register"
            className="relative mt-6 inline-block rounded-full px-8 py-3 text-sm font-medium text-white"
            style={{ backgroundColor: DARK.accent }}
          >
            Creer mon compte gratuitement
          </Link>
        </section>

        <footer className="border-t py-6 text-center" style={{ borderColor: DARK.border }}>
          <p className="text-xs" style={{ color: DARK.textMuted }}>
            Fidele — Plateforme de fidelisation pour commerces et entreprises
          </p>
        </footer>

      </div>
    </div>
  )
}
