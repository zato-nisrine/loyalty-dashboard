import { getRestaurant, getToken } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import LogoutButton from '@/components/LogoutButton'

export default async function DashboardPage() {
  const commerce = await getRestaurant()
  if (!commerce) redirect('/login')

  const token = await getToken()
  const statsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/restaurants/me/dashboard`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  })
  const stats = statsRes.ok ? await statsRes.json() : null
  const brandColor = commerce.brandColor || '#C2410C'

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-foreground">
            {commerce.name}
          </h1>
          <p className="mt-1 text-sm font-medium uppercase tracking-wide" style={{ color: brandColor }}>
            Plan {commerce.plan}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/codes"
            className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:opacity-90 whitespace-nowrap"
            style={{ backgroundColor: brandColor }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
            </svg>
            Nouveau code
          </Link>
          <LogoutButton />
        </div>
      </div>

      {stats && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="relative overflow-hidden rounded-2xl border border-border-subtle bg-surface p-5">
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-20 blur-2xl" style={{ background: brandColor }} />
            <div className="relative mb-3 h-1 w-8 rounded-full" style={{ backgroundColor: brandColor }} />
            <p className="relative text-xs font-medium uppercase tracking-wide text-text-muted">Membres</p>
            <p className="relative mt-1 font-[family-name:var(--font-display)] text-3xl font-semibold text-foreground">
              {stats.totalCards}
            </p>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-border-subtle bg-surface p-5">
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-20 blur-2xl" style={{ background: brandColor }} />
            <div className="relative mb-3 h-1 w-8 rounded-full" style={{ backgroundColor: brandColor }} />
            <p className="relative text-xs font-medium uppercase tracking-wide text-text-muted">Transactions</p>
            <p className="relative mt-1 font-[family-name:var(--font-display)] text-3xl font-semibold text-foreground">
              {stats.totalTransactions}
            </p>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-border-subtle bg-surface p-5">
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-20 blur-2xl" style={{ background: brandColor }} />
            <div className="relative mb-3 h-1 w-8 rounded-full" style={{ backgroundColor: brandColor }} />
            <p className="relative text-xs font-medium uppercase tracking-wide text-text-muted">Demandes</p>
            <p className="relative mt-1 font-[family-name:var(--font-display)] text-3xl font-semibold text-foreground">
              {stats.pendingRedemptions}
            </p>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] p-5">
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
            <div className="relative mb-3 h-1 w-8 rounded-full bg-white/30" />
            <p className="relative text-xs font-medium uppercase tracking-wide text-gray-400">QR code</p>
            <p className="relative mt-1 truncate text-sm font-medium text-white">{commerce.qrCodeToken}</p>
          </div>
        </div>
      )}

      {stats?.topClients?.length > 0 && (
        <div className="rounded-2xl border border-border-subtle bg-surface p-6">
          <h2 className="mb-4 font-[family-name:var(--font-display)] text-lg font-semibold text-foreground">
            Meilleurs clients
          </h2>
          <div className="divide-y divide-border-subtle">
            {stats.topClients.map((c: any, i: number) => (
              <div key={i} className="flex items-center justify-between py-3">
                <span className="text-sm font-medium text-foreground">{c.client.name}</span>
                <span
                  className="rounded-full px-3 py-1 text-sm font-semibold"
                  style={{ backgroundColor: `${brandColor}1A`, color: brandColor }}
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
