import Link from 'next/link'
import LoynivaLogo from '@/components/LoynivaLogo'
import LandingNavbar from '@/components/LandingNavbar'

function HeroCard({ variant }: { variant: 'front' | 'back' }) {
  const isFront = variant === 'front'
  return (
    <div
      className={isFront ? 'hero-card-float' : 'hero-card-float-2'}
      style={{
        position: 'absolute',
        inset: 0,
        borderRadius: 24,
        background: isFront
          ? 'linear-gradient(145deg, #102A43 0%, #1A3E61 65%, #245078 100%)'
          : 'linear-gradient(145deg, #0C1E30 0%, #102A43 100%)',
        border: '1px solid rgba(216, 224, 232, 0.25)',
        padding: 24,
        boxShadow: isFront
          ? '0 25px 50px -12px rgba(16, 42, 67, 0.35), 0 0 0 1px rgba(79, 157, 206, 0.2)'
          : '0 15px 30px -10px rgba(16, 42, 67, 0.25)',
        zIndex: isFront ? 2 : 1,
        opacity: isFront ? 1 : 0.6,
      }}
    >
      {/* Glow orb */}
      <div
        className="absolute -right-8 -top-8 h-36 w-36 rounded-full blur-2xl pointer-events-none"
        style={{ background: '#4F9DCE', opacity: 0.3 }}
      />

      <div className="relative z-10 flex h-full flex-col justify-between text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#4F9DCE] text-white shadow-sm font-bold text-xs">
              L
            </div>
            <div>
              <p className="font-display text-sm font-bold tracking-tight">LOYNIVA PASS</p>
              <p className="text-[10px] text-[#D8E0E8] font-normal">Chaque visite compte</p>
            </div>
          </div>
          <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-medium text-[#D8E0E8] backdrop-blur-sm border border-white/10">
            Privilège
          </span>
        </div>

        <div className="my-auto py-2">
          <p className="text-[10px] font-medium uppercase tracking-wider text-[#D8E0E8]">Solde de fidélité</p>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-4xl font-extrabold tracking-tight text-white">
              2 850
            </span>
            <span className="text-xs font-semibold text-[#4F9DCE]">points</span>
          </div>
          <p className="mt-1 text-[11px] text-[#D8E0E8]">Prochaine récompense dans 150 pts</p>
        </div>

        <div className="flex items-end justify-between border-t border-white/10 pt-3">
          <div>
            <p className="text-[9px] uppercase tracking-wider text-[#D8E0E8]">Membre</p>
            <p className="font-sans text-xs font-semibold text-white">Nisrine Z. • #8492</p>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#4F9DCE]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#16845B]" /> Actif
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-[#243746] dark:text-[#D8E0E8]">
      {/* Background soft ambient gradient */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px] overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[500px] w-[1000px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#4F9DCE]/10 via-[#F5F8FC]/50 to-transparent blur-3xl dark:from-[#4F9DCE]/5 dark:via-transparent" />
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Navigation Bar */}
        <LandingNavbar />


        {/* Hero Section */}
        <section className="relative grid gap-12 py-12 lg:grid-cols-12 lg:items-center lg:py-20">
          <div className="lg:col-span-7">
            {/* Tagline Pill */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D8E0E8] bg-[#F5F8FC] px-3.5 py-1.5 text-xs font-semibold text-[#102A43] dark:border-white/10 dark:bg-[#102A43] dark:text-white">
              <span className="flex h-2 w-2 rounded-full bg-[#16845B]" />
              Plateforme SaaS de fidélité • <span className="text-[#4F9DCE]">La confiance qui rapproche</span>
            </div>

            <h1 className="font-display text-4xl font-extrabold tracking-tight text-[#102A43] sm:text-5xl lg:text-[54px] lg:leading-[1.12] dark:text-white">
              Chaque visite compte. <br className="hidden sm:inline" />
              <span className="text-[#4F9DCE]">Fidélisez sans friction.</span>
            </h1>

            <p className="mt-5 max-w-xl font-sans text-base text-[#243746] sm:text-lg dark:text-[#D8E0E8]/90">
              Transformez chaque passage en caisse en relation durable. QR code instantané, points automatiques,
              récompenses sur-mesure et campagnes de réengagement — <strong>sans application à télécharger pour vos clients</strong>.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Link
                href="/register"
                className="rounded-xl bg-[#102A43] px-7 py-3.5 text-base font-semibold text-white shadow-md hover:bg-[#1A3E61] hover:shadow-lg transition-all"
              >
                Démarrer 7 jours gratuits
              </Link>
              <Link
                href="/login"
                className="rounded-xl border border-[#D8E0E8] bg-surface px-6 py-3.5 text-base font-semibold text-[#102A43] hover:border-[#4F9DCE] hover:text-[#4F9DCE] transition-all dark:border-white/10 dark:text-white"
              >
                Accès commerçant
              </Link>
            </div>

            <div className="mt-6 flex items-center gap-4 text-xs font-medium text-[#5B7286] dark:text-[#8FA6BA]">
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-[#16845B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                Sans engagement
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-[#16845B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                Aucune carte requise
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-[#16845B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                Prêt en 5 minutes
              </span>
            </div>
          </div>

          {/* Visual Showcase */}
          <div className="relative mx-auto h-80 w-full max-w-md lg:col-span-5 lg:h-[380px]">
            <div
              className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl pointer-events-none"
              style={{ background: '#4F9DCE' }}
            />
            <div className="absolute left-1/2 top-1/2 aspect-[1.586/1] w-64 sm:w-72 -translate-x-1/2 -translate-y-1/2">
              <HeroCard variant="back" />
              <HeroCard variant="front" />
            </div>
          </div>
        </section>

        {/* Metrics Banner */}
        <div className="my-10 grid grid-cols-2 gap-4 rounded-2xl border border-[#D8E0E8] bg-[#F5F8FC] p-6 sm:grid-cols-4 sm:p-8 dark:border-white/10 dark:bg-[#102A43]/40">
          <div className="text-center">
            <p className="font-display text-3xl font-bold text-[#102A43] dark:text-white">0 app</p>
            <p className="mt-1 text-xs text-[#5B7286] font-medium dark:text-[#8FA6BA]">À télécharger par vos clients</p>
          </div>
          <div className="text-center">
            <p className="font-display text-3xl font-bold text-[#102A43] dark:text-white">5 min</p>
            <p className="mt-1 text-xs text-[#5B7286] font-medium dark:text-[#8FA6BA]">Pour tout configurer</p>
          </div>
          <div className="text-center">
            <p className="font-display text-3xl font-bold text-[#4F9DCE]">7 jours</p>
            <p className="mt-1 text-xs text-[#5B7286] font-medium dark:text-[#8FA6BA]">Essai gratuit complet</p>
          </div>
          <div className="text-center">
            <p className="font-display text-3xl font-bold text-[#16845B]">+40%</p>
            <p className="mt-1 text-xs text-[#5B7286] font-medium dark:text-[#8FA6BA]">De fréquence de visite</p>
          </div>
        </div>

        {/* Feature Grid */}
        <section className="py-16">
          <div className="text-center">
            <h2 className="font-display text-2xl font-bold text-[#102A43] sm:text-3xl dark:text-white">
              Une solution complète pour commerces ambitieux
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-[#5B7286] dark:text-[#8FA6BA]">
              Conçu spécifiquement pour les restaurants, coiffeurs, pressings, boutiques et instituts qui veulent fidéliser simplement.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'QR Code instantané',
                desc: 'Un scan rapide en caisse : la carte client est créée sur le champ, sans formulaire interminable.',
                icon: (
                  <svg className="h-6 w-6 text-[#4F9DCE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <rect x="3" y="3" width="7" height="7" rx="1.5" strokeWidth="2" />
                    <rect x="14" y="3" width="7" height="7" rx="1.5" strokeWidth="2" />
                    <rect x="3" y="14" width="7" height="7" rx="1.5" strokeWidth="2" />
                    <circle cx="17.5" cy="17.5" r="2.5" strokeWidth="2" />
                  </svg>
                ),
              },
              {
                title: 'Crédit de points en caisse',
                desc: 'Créditez les points par montant en FCFA en 2 clics ou scannez le pass client.',
                icon: (
                  <svg className="h-6 w-6 text-[#16845B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                title: 'Campagnes marketing',
                desc: 'Envoyez des promotions, annonces et invitations ciblées pour remplir vos heures creuses.',
                icon: (
                  <svg className="h-6 w-6 text-[#B96A13]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                ),
              },
              {
                title: 'Récompenses attractives',
                desc: 'Fixez librement vos règles de conversion et faites plaisir à vos clients les plus fidèles.',
                icon: (
                  <svg className="h-6 w-6 text-[#102A43] dark:text-[#4F9DCE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v3a2 2 0 01-2 2M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                ),
              },
            ].map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-[#D8E0E8] bg-surface p-6 shadow-xs hover:border-[#4F9DCE] hover:shadow-md transition-all dark:border-white/10 dark:bg-[#102A43]/50"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#F5F8FC] dark:bg-white/10">
                  {f.icon}
                </div>
                <h3 className="font-display text-base font-semibold text-[#102A43] dark:text-white">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm text-[#5B7286] leading-relaxed dark:text-[#8FA6BA]">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="py-14 border-t border-[#D8E0E8] dark:border-white/10">
          <div className="text-center">
            <h2 className="font-display text-2xl font-bold text-[#102A43] sm:text-3xl dark:text-white">
              Comment ça fonctionne
            </h2>
            <p className="mt-2 text-sm text-[#5B7286] dark:text-[#8FA6BA]">Opérationnel dès aujourd'hui en 4 étapes simples</p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
            {[
              {
                num: '01',
                title: 'Créez votre compte commerce',
                desc: 'Personnalisez votre enseigne, votre logo et votre univers de marque en quelques clics.',
              },
              {
                num: '02',
                title: 'Imprimez votre QR Code LOYNIVA',
                desc: 'Placez le code sur votre comptoir ou sur une tablette. Vos clients le scannent en une seconde.',
              },
              {
                num: '03',
                title: 'Créditez les points lors de chaque visite',
                desc: 'Entrez le montant de la commande ou scannez le client. Le solde se met à jour immédiatement.',
              },
              {
                num: '04',
                title: 'Offrez des récompenses mémorables',
                desc: 'Les clients débloquent leurs avantages et reviennent plus souvent chez vous.',
              },
            ].map((step) => (
              <div
                key={step.num}
                className="flex items-start gap-4 rounded-2xl border border-[#D8E0E8] bg-surface p-6 dark:border-white/10 dark:bg-[#102A43]/30"
              >
                <span className="font-display text-2xl font-extrabold text-[#4F9DCE]">
                  {step.num}
                </span>
                <div>
                  <h4 className="font-display text-base font-semibold text-[#102A43] dark:text-white">
                    {step.title}
                  </h4>
                  <p className="mt-1 text-sm text-[#5B7286] leading-relaxed dark:text-[#8FA6BA]">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 border-t border-[#D8E0E8] dark:border-white/10">
          <div className="text-center">
            <h2 className="font-display text-2xl font-bold text-[#102A43] sm:text-3xl dark:text-white">
              Des tarifs clairs et transparents
            </h2>
            <p className="mt-2 text-sm text-[#5B7286] dark:text-[#8FA6BA]">
              Sans engagement. Changez de plan à tout moment. 7 jours d'essai offerts.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {/* Starter */}
            <div className="rounded-2xl border border-[#D8E0E8] bg-surface p-7 shadow-xs dark:border-white/10 dark:bg-[#102A43]/40">
              <p className="font-display text-base font-bold text-[#102A43] dark:text-white">Starter</p>
              <p className="text-xs text-[#5B7286] dark:text-[#8FA6BA]">Pour démarrer son premier programme</p>
              <div className="my-5">
                <span className="font-display text-3xl font-extrabold text-[#102A43] dark:text-white">5 000</span>
                <span className="text-xs font-semibold text-[#5B7286]"> FCFA / mois</span>
              </div>
              <hr className="my-5 border-[#D8E0E8] dark:border-white/10" />
              <ul className="space-y-3 text-xs text-[#243746] dark:text-[#D8E0E8]">
                {['Jusqu’à 30 clients actifs', 'QR code de caisse', 'Système de points sur-mesure', 'Récompenses configurables'].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="text-[#16845B] font-bold">✓</span> {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/register"
                className="mt-8 block w-full rounded-xl border border-[#D8E0E8] py-2.5 text-center text-sm font-semibold text-[#102A43] hover:border-[#4F9DCE] hover:text-[#4F9DCE] transition-all dark:border-white/15 dark:text-white"
              >
                Essayer Starter
              </Link>
            </div>

            {/* Pro - Featured */}
            <div className="relative rounded-2xl border-2 border-[#4F9DCE] bg-surface p-7 shadow-lg dark:bg-[#102A43]">
              <span className="absolute -top-3.5 right-6 rounded-full bg-[#4F9DCE] px-3 py-1 text-xs font-bold text-white shadow-sm">
                Le plus populaire
              </span>
              <p className="font-display text-base font-bold text-[#102A43] dark:text-white">Pro</p>
              <p className="text-xs text-[#5B7286] dark:text-[#8FA6BA]">Idéal pour les commerces actifs</p>
              <div className="my-5">
                <span className="font-display text-3xl font-extrabold text-[#102A43] dark:text-white">15 000</span>
                <span className="text-xs font-semibold text-[#5B7286]"> FCFA / mois</span>
              </div>
              <hr className="my-5 border-[#D8E0E8] dark:border-white/10" />
              <ul className="space-y-3 text-xs text-[#243746] dark:text-[#D8E0E8]">
                {[
                  'Clients illimités',
                  'Campagnes marketing push',
                  'Anniversaires automatiques',
                  'Statistiques détaillées & top clients',
                  'Support prioritaire',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="text-[#16845B] font-bold">✓</span> {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/register"
                className="mt-8 block w-full rounded-xl bg-[#4F9DCE] py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-[#3E8BBA] transition-all"
              >
                Démarrer en Pro
              </Link>
            </div>

            {/* Premium */}
            <div className="rounded-2xl border border-[#D8E0E8] bg-surface p-7 shadow-xs dark:border-white/10 dark:bg-[#102A43]/40">
              <p className="font-display text-base font-bold text-[#102A43] dark:text-white">Premium</p>
              <p className="text-xs text-[#5B7286] dark:text-[#8FA6BA]">Réseaux et commerces multi-sites</p>
              <div className="my-5">
                <span className="font-display text-3xl font-extrabold text-[#102A43] dark:text-white">30 000</span>
                <span className="text-xs font-semibold text-[#5B7286]"> FCFA / mois</span>
              </div>
              <hr className="my-5 border-[#D8E0E8] dark:border-white/10" />
              <ul className="space-y-3 text-xs text-[#243746] dark:text-[#D8E0E8]">
                {[
                  'Toutes les fonctionnalités Pro',
                  'Notifications SMS & WhatsApp',
                  'Automatisations marketing poussées',
                  'Accompagnement dédié',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="text-[#16845B] font-bold">✓</span> {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/register"
                className="mt-8 block w-full rounded-xl border border-[#D8E0E8] py-2.5 text-center text-sm font-semibold text-[#102A43] hover:border-[#4F9DCE] hover:text-[#4F9DCE] transition-all dark:border-white/15 dark:text-white"
              >
                Essayer Premium
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA Banner */}
        <section className="relative my-12 overflow-hidden rounded-3xl bg-gradient-to-r from-[#102A43] via-[#1A3E61] to-[#102A43] p-10 text-center text-white sm:p-14 shadow-xl">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#4F9DCE]/30 blur-3xl pointer-events-none" />
          <div className="relative z-10 mx-auto max-w-xl">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl text-white">
              Prêt à faire de chaque visite un succès ?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#D8E0E8]">
              Rejoignez les commerces qui utilisent <strong>LOYNIVA</strong> pour rapprocher et fidéliser leurs clients au quotidien.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/register"
                className="rounded-xl bg-[#4F9DCE] px-8 py-3.5 text-base font-semibold text-white shadow-md hover:bg-[#3E8BBA] transition-all"
              >
                Créer mon compte gratuitement
              </Link>
              <Link
                href="/login"
                className="rounded-xl border border-white/20 bg-white/10 px-7 py-3.5 text-base font-semibold text-white hover:bg-white/20 transition-all"
              >
                Déjà client ? Se connecter
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-[#D8E0E8] py-8 text-center sm:flex sm:items-center sm:justify-between dark:border-white/10">
          <div className="flex justify-center sm:justify-start">
            <LoynivaLogo size="sm" showTagline={false} />
          </div>
          <p className="mt-4 text-xs text-[#5B7286] sm:mt-0 dark:text-[#8FA6BA]">
            © {new Date().getFullYear()} LOYNIVA. Plateforme SaaS de fidélité et de relation client. « Chaque visite compte. »
          </p>
        </footer>
      </div>
    </div>
  )
}
