import { getRestaurant, getToken } from '@/lib/auth'
import { redirect } from 'next/navigation'
import LogoutButton from '@/components/LogoutButton'

export default async function DashboardPage() {
  const commerce = await getRestaurant()
  if (!commerce) redirect('/login')

  const token = await getToken()
  const statsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/commerces/me/dashboard`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  })
  const stats = statsRes.ok ? await statsRes.json() : null
  const brandColor = commerce.brandColor || '#C2410C'

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-stone-900">
            {commerce.name}
          </h1>
          <p className="mt-1 text-sm font-medium uppercase tracking-wide" style={{ color: brandColor }}>
            Plan {commerce.plan}
          </p>
        </div>
        <LogoutButton />
      </div>

      {stats && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border border-stone-200 bg-white p-5">
            <div className="mb-3 h-1 w-8 rounded-full" style={{ backgroundColor: brandColor }} />
            <p className="text-xs font-medium uppercase tracking-wide text-stone-500">Membres</p>
            <p className="mt-1 font-[family-name:var(--font-display)] text-3xl font-semibold text-stone-900">
              {stats.totalCards}
            </p>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white p-5">
            <div className="mb-3 h-1 w-8 rounded-full" style={{ backgroundColor: brandColor }} />
            <p className="text-xs font-medium uppercase tracking-wide text-stone-500">Transactions</p>
            <p className="mt-1 font-[family-name:var(--font-display)] text-3xl font-semibold text-stone-900">
              {stats.totalTransactions}
            </p>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white p-5">
            <div className="mb-3 h-1 w-8 rounded-full" style={{ backgroundColor: brandColor }} />
            <p className="text-xs font-medium uppercase tracking-wide text-stone-500">Demandes</p>
            <p className="mt-1 font-[family-name:var(--font-display)] text-3xl font-semibold text-stone-900">
              {stats.pendingRedemptions}
            </p>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-[#1C1917] p-5">
            <div className="mb-3 h-1 w-8 rounded-full bg-white/30" />
            <p className="text-xs font-medium uppercase tracking-wide text-stone-400">QR code</p>
            <p className="mt-1 truncate text-sm font-medium text-white">{commerce.qrCodeToken}</p>
          </div>
        </div>
      )}

      {stats?.topClients?.length > 0 && (
        <div className="rounded-2xl border border-stone-200 bg-white p-6">
          <h2 className="mb-4 font-[family-name:var(--font-display)] text-lg font-semibold text-stone-900">
            Meilleurs clients
          </h2>
          <div className="divide-y divide-stone-100">
            {stats.topClients.map((c: any, i: number) => (
              <div key={i} className="flex items-center justify-between py-3">
                <span className="text-sm font-medium text-stone-700">{c.client.name}</span>
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
