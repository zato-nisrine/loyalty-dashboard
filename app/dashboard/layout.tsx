import Link from 'next/link'
import { getRestaurant } from '@/lib/auth'
import { redirect } from 'next/navigation'
import MobileNav from '@/components/MobileNav'
import SubscriptionBanner from '@/components/SubscriptionBanner'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const commerce = await getRestaurant()
  if (!commerce) redirect('/login')

  const brandColor = commerce.brandColor || '#C2410C'

  return (
    <div className="min-h-screen bg-[#FAF7F2] lg:grid lg:grid-cols-[240px_1fr]">
      <MobileNav commerceName={commerce.name} logoUrl={commerce.logoUrl} brandColor={brandColor} />

      <aside className="hidden border-r border-stone-200 bg-white px-5 py-7 lg:flex lg:flex-col lg:gap-1">
        <div className="mb-8 flex items-center gap-3">
          {commerce.logoUrl ? (
            <img src={commerce.logoUrl} alt={commerce.name} className="h-9 w-9 rounded-lg object-cover" />
          ) : (
            <div
              className="flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold text-white"
              style={{ backgroundColor: brandColor }}
            >
              {commerce.name.charAt(0)}
            </div>
          )}
          <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-stone-900">
            {commerce.name}
          </p>
        </div>
        <Link href="/dashboard" className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50">
          Tableau de bord
        </Link>
        <Link href="/dashboard/codes" className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50">
          Code de validation
        </Link>
        <Link href="/dashboard/rewards" className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50">
          Récompenses
        </Link>
        <Link href="/dashboard/redemptions" className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50">
          Demandes
        </Link>
        <Link href="/dashboard/campaigns" className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50">
          Campagnes
        </Link>
        <Link href="/dashboard/qr-code" className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50">
          Mon QR code
        </Link>
        <Link href="/dashboard/settings" className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50">
          Paramètres
        </Link>
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
