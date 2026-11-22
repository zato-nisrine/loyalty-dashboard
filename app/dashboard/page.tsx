import { getRestaurant, getToken } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import LogoutButton from '@/components/LogoutButton'
import MerchantNotificationBanner from '@/components/MerchantNotificationBanner'

export default async function DashboardPage() {
  const commerce = await getRestaurant()
  if (!commerce) redirect('/login')

  const token = await getToken()
  const statsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/restaurants/me/dashboard`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  })
  const stats = statsRes.ok ? await statsRes.json() : null
  const brandColor = commerce.brandColor || '#102A43'

  return (
    <div className="space-y-8">
      {/* Header section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-[28px] sm:text-[32px] font-bold text-foreground tracking-tight leading-tight">
            {commerce.name}
          </h1>
          <div className="mt-1 flex items-center gap-2">
            <span
              className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider"
              style={{ backgroundColor: `${brandColor}18`, color: brandColor }}
            >
              Plan {commerce.plan}
            </span>
            <span className="text-xs text-text-muted">• Espace de gestion LOYNIVA</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/codes"
            className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-95 transition-all whitespace-nowrap"
            style={{ backgroundColor: brandColor }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
            </svg>
            Créditer des points
          </Link>
          <LogoutButton />
        </div>
      </div>

      {/* Push Notifications for Merchant (Nouveaux clients, demandes cadeaux, etc.) */}
      <MerchantNotificationBanner />

      {/* KPI Stats */}
      {stats && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Link
            href="/dashboard/clients"
            className="group relative overflow-hidden rounded-2xl border border-border-subtle bg-surface p-5 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-border active:scale-[0.99] block cursor-pointer"
          >
            <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-15 blur-xl group-hover:opacity-25 transition-opacity" style={{ background: brandColor }} />
            <div className="flex items-center justify-between relative mb-3">
              <div className="h-1 w-7 rounded-full" style={{ backgroundColor: brandColor }} />
              <span className="text-[11px] font-semibold text-text-muted opacity-0 group-hover:opacity-100 transition-opacity">
                Voir →
              </span>
            </div>
            <p className="relative text-xs font-semibold uppercase tracking-wider text-text-muted">Membres inscrits</p>
            <p className="relative mt-1 font-display text-3xl font-extrabold text-foreground">
              {stats.totalCards}
            </p>
          </Link>

          <Link
            href="/dashboard/codes"
            className="group relative overflow-hidden rounded-2xl border border-border-subtle bg-surface p-5 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-border active:scale-[0.99] block cursor-pointer"
          >
            <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-15 blur-xl group-hover:opacity-25 transition-opacity" style={{ background: '#4F9DCE' }} />
            <div className="flex items-center justify-between relative mb-3">
              <div className="h-1 w-7 rounded-full bg-[#4F9DCE]" />
              <span className="text-[11px] font-semibold text-text-muted opacity-0 group-hover:opacity-100 transition-opacity">
                Voir →
              </span>
            </div>
            <p className="relative text-xs font-semibold uppercase tracking-wider text-text-muted">Transactions</p>
            <p className="relative mt-1 font-display text-3xl font-extrabold text-foreground">
              {stats.totalTransactions}
            </p>
          </Link>

          <Link
            href="/dashboard/redemptions"
            className="group relative overflow-hidden rounded-2xl border border-border-subtle bg-surface p-5 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-border active:scale-[0.99] block cursor-pointer"
          >
            <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-15 blur-xl group-hover:opacity-25 transition-opacity" style={{ background: '#16845B' }} />
            <div className="flex items-center justify-between relative mb-3">
              <div className="h-1 w-7 rounded-full bg-[#16845B]" />
              <span className="text-[11px] font-semibold text-text-muted opacity-0 group-hover:opacity-100 transition-opacity">
                Gérer →
              </span>
            </div>
            <p className="relative text-xs font-semibold uppercase tracking-wider text-text-muted">Demandes en cours</p>
            <p className="relative mt-1 font-display text-3xl font-extrabold text-foreground">
              {stats.pendingRedemptions}
            </p>
          </Link>

          <Link
            href="/dashboard/qr-code"
            className="group relative overflow-hidden rounded-2xl border border-border-subtle bg-gradient-to-br from-[#102A43] to-[#1A3E61] p-5 text-white shadow-xs transition-all duration-200 hover:-translate-y-1 hover:shadow-md active:scale-[0.99] block cursor-pointer"
          >
            <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-[#4F9DCE]/30 blur-xl group-hover:opacity-40 transition-opacity" />
            <div className="flex items-center justify-between relative mb-3">
              <div className="h-1 w-7 rounded-full bg-[#4F9DCE]" />
              <span className="text-[11px] font-semibold text-[#D8E0E8] opacity-0 group-hover:opacity-100 transition-opacity">
                Ouvrir →
              </span>
            </div>
            <p className="relative text-xs font-semibold uppercase tracking-wider text-[#D8E0E8]">Code QR comptoir</p>
            <p className="relative mt-1 truncate font-display text-sm font-bold text-white tracking-wide">
              {commerce.qrCodeToken}
            </p>
          </Link>
        </div>
      )}

      {/* Top clients */}
      {stats?.topClients?.length > 0 && (
        <div className="rounded-2xl border border-border-subtle bg-surface p-6 shadow-xs">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-foreground">
              Clients les plus fidèles
            </h2>
            <Link href="/dashboard/clients" className="text-xs font-semibold text-[#4F9DCE] hover:underline">
              Voir tous les clients →
            </Link>
          </div>

          <div className="divide-y divide-border-subtle">
            {stats.topClients.map((c: any, i: number) => (
              <div key={i} className="flex items-center justify-between py-3.5">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-muted text-xs font-bold text-foreground border border-border-subtle">
                    {i + 1}
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-foreground">{c.client.name}</span>
                    <p className="text-[11px] text-text-muted">Membre régulier</p>
                  </div>
                </div>
                <span
                  className="rounded-full px-3 py-1 font-display text-xs font-bold"
                  style={{ backgroundColor: `${brandColor}18`, color: brandColor }}
                >
                  {c.pointsBalance} pts
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
