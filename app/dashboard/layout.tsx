import Link from 'next/link'
import { getRestaurant } from '@/lib/auth'
import { redirect } from 'next/navigation'
import MobileNav from '@/components/MobileNav'
import SubscriptionBanner from '@/components/SubscriptionBanner'
import ThemeToggle from '@/components/ThemeToggle'
import LoynivaLogo from '@/components/LoynivaLogo'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const commerce = await getRestaurant()
  if (!commerce) redirect('/login')

  const brandColor = commerce.brandColor || '#102A43'

  return (
    <div className="min-h-screen bg-[#F5F8FC] dark:bg-[#091420] lg:grid lg:grid-cols-[260px_1fr]">
      <MobileNav commerceName={commerce.name} logoUrl={commerce.logoUrl} brandColor={brandColor} />

      <aside className="hidden border-r border-[#D8E0E8] bg-surface px-5 py-6 lg:flex lg:flex-col lg:gap-1 dark:border-white/10 dark:bg-[#102A43]">
        {/* Brand header */}
        <div className="mb-6 flex items-center justify-between border-b border-[#D8E0E8] pb-5 dark:border-white/10">
          <Link href="/dashboard" className="transition-opacity hover:opacity-90">
            <LoynivaLogo size="sm" showTagline={false} />
          </Link>
          <ThemeToggle />
        </div>

        {/* Current Merchant Profile Card */}
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-[#D8E0E8] bg-[#F5F8FC] p-3 dark:border-white/10 dark:bg-[#173859]">
          {commerce.logoUrl ? (
            <img src={commerce.logoUrl} alt={commerce.name} className="h-10 w-10 rounded-lg object-cover shadow-xs" />
          ) : (
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold text-white shadow-xs"
              style={{ backgroundColor: brandColor }}
            >
              {commerce.name.charAt(0)}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-sm font-bold text-[#102A43] dark:text-white">
              {commerce.name}
            </p>
            <p className="text-[11px] font-medium text-[#4F9DCE] uppercase tracking-wider">
              Plan {commerce.plan}
            </p>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="space-y-1">
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-[#243746] hover:bg-[#F5F8FC] hover:text-[#102A43] transition-colors dark:text-[#D8E0E8] dark:hover:bg-white/10 dark:hover:text-white"
          >
            <svg className="h-4 w-4 text-[#4F9DCE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Tableau de bord
          </Link>
          <Link
            href="/dashboard/clients"
            className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-[#243746] hover:bg-[#F5F8FC] hover:text-[#102A43] transition-colors dark:text-[#D8E0E8] dark:hover:bg-white/10 dark:hover:text-white"
          >
            <svg className="h-4 w-4 text-[#5B7286] dark:text-[#8FA6BA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Clients
          </Link>
          <Link
            href="/dashboard/codes"
            className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-[#243746] hover:bg-[#F5F8FC] hover:text-[#102A43] transition-colors dark:text-[#D8E0E8] dark:hover:bg-white/10 dark:hover:text-white"
          >
            <svg className="h-4 w-4 text-[#16845B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Crédit de points
          </Link>
          <Link
            href="/dashboard/rewards"
            className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-[#243746] hover:bg-[#F5F8FC] hover:text-[#102A43] transition-colors dark:text-[#D8E0E8] dark:hover:bg-white/10 dark:hover:text-white"
          >
            <svg className="h-4 w-4 text-[#B96A13]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v3a2 2 0 01-2 2M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>
            Récompenses
          </Link>
          <Link
            href="/dashboard/redemptions"
            className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-[#243746] hover:bg-[#F5F8FC] hover:text-[#102A43] transition-colors dark:text-[#D8E0E8] dark:hover:bg-white/10 dark:hover:text-white"
          >
            <svg className="h-4 w-4 text-[#4F9DCE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            Demandes
          </Link>
          <Link
            href="/dashboard/campaigns"
            className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-[#243746] hover:bg-[#F5F8FC] hover:text-[#102A43] transition-colors dark:text-[#D8E0E8] dark:hover:bg-white/10 dark:hover:text-white"
          >
            <svg className="h-4 w-4 text-[#102A43] dark:text-[#4F9DCE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
            </svg>
            Campagnes
          </Link>
          <Link
            href="/dashboard/qr-code"
            className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-[#243746] hover:bg-[#F5F8FC] hover:text-[#102A43] transition-colors dark:text-[#D8E0E8] dark:hover:bg-white/10 dark:hover:text-white"
          >
            <svg className="h-4 w-4 text-[#5B7286] dark:text-[#8FA6BA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
            Mon QR code
          </Link>
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-[#243746] hover:bg-[#F5F8FC] hover:text-[#102A43] transition-colors dark:text-[#D8E0E8] dark:hover:bg-white/10 dark:hover:text-white"
          >
            <svg className="h-4 w-4 text-[#5B7286] dark:text-[#8FA6BA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Paramètres
          </Link>
        </nav>

        {/* Footer info */}
        <div className="mt-auto pt-6 border-t border-[#D8E0E8] dark:border-white/10">
          <p className="text-[11px] text-[#5B7286] font-medium text-center dark:text-[#8FA6BA]">
            LOYNIVA • Chaque visite compte.
          </p>
        </div>
      </aside>

      <div className="p-4 sm:p-6 lg:p-10">
        <div className="mx-auto max-w-5xl">
          <SubscriptionBanner
            subscriptionStatus={commerce.subscriptionStatus}
            subscriptionExpiresAt={commerce.subscriptionExpiresAt}
          />
          {children}
        </div>
      </div>
    </div>
  )
}
