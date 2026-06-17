import Link from 'next/link'
import { getRestaurant } from '@/lib/auth'
import { redirect } from 'next/navigation'
import MobileNav from '@/components/MobileNav'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const restaurant = await getRestaurant()
  if (!restaurant) redirect('/login')

  const brandColor = restaurant.brandColor || '#C2410C'

  return (
    <div className="min-h-screen bg-[#FAF7F2] lg:grid lg:grid-cols-[240px_1fr]">
      <MobileNav restaurantName={restaurant.name} logoUrl={restaurant.logoUrl} brandColor={brandColor} />

      <aside className="hidden border-r border-stone-200 bg-white px-5 py-7 lg:flex lg:flex-col lg:gap-1">
        <div className="mb-8 flex items-center gap-3">
          {restaurant.logoUrl ? (
            <img src={restaurant.logoUrl} alt={restaurant.name} className="h-9 w-9 rounded-lg object-cover" />
          ) : (
            <div
              className="flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold text-white"
              style={{ backgroundColor: brandColor }}
            >
              {restaurant.name.charAt(0)}
            </div>
          )}
          <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-stone-900">
            {restaurant.name}
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
        <Link href="/dashboard/settings" className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50">
          Paramètres
        </Link>
      </aside>

      <div className="p-4 sm:p-6 lg:p-10">
        <div className="mx-auto max-w-5xl">{children}</div>
      </div>
    </div>
  )
}
