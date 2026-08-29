import Link from 'next/link'
import { getRestaurant } from '@/lib/auth'
import { redirect } from 'next/navigation'
import MobileNav from '@/components/MobileNav'
import SubscriptionBanner from '@/components/SubscriptionBanner'
import ThemeToggle from '@/components/ThemeToggle'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const commerce = await getRestaurant()
  if (!commerce) redirect('/login')

  const brandColor = commerce.brandColor || '#C2410C'

  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[240px_1fr]">
      <MobileNav commerceName={commerce.name} logoUrl={commerce.logoUrl} brandColor={brandColor} />

      <aside className="hidden border-r border-border-subtle bg-surface px-5 py-7 lg:flex lg:flex-col lg:gap-1">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
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
            <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-foreground">
              {commerce.name}
            </p>
          </div>
          <ThemeToggle />
        </div>
        <Link href="/dashboard" className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-text-muted hover:bg-surface-muted hover:text-foreground">
          Tableau de bord
        </Link>
        <Link href="/dashboard/clients" className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-text-muted hover:bg-surface-muted hover:text-foreground">
          Clients
        </Link>
        <Link href="/dashboard/codes" className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-text-muted hover:bg-surface-muted hover:text-foreground">
          Crédit de points
        </Link>
        <Link href="/dashboard/rewards" className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-text-muted hover:bg-surface-muted hover:text-foreground">
          Récompenses
        </Link>
        <Link href="/dashboard/redemptions" className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-text-muted hover:bg-surface-muted hover:text-foreground">
          Demandes
        </Link>
        <Link href="/dashboard/campaigns" className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-text-muted hover:bg-surface-muted hover:text-foreground">
          Campagnes
        </Link>
        <Link href="/dashboard/qr-code" className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-text-muted hover:bg-surface-muted hover:text-foreground">
          Mon QR code
        </Link>
        <Link href="/dashboard/settings" className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-text-muted hover:bg-surface-muted hover:text-foreground">
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
