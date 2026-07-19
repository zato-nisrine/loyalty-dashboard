import { checkAdminAuth, getAdminSecret } from '@/lib/admin-auth'
import { redirect } from 'next/navigation'

export default async function AdminDashboardPage() {
  const isAdmin = await checkAdminAuth()
  if (!isAdmin) redirect('/admin')

  const secret = await getAdminSecret()

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/restaurants`, {
    headers: { 'x-admin-secret': secret! },
    cache: 'no-store',
  })
  const commerces = res.ok ? await res.json() : []

  const totalcommerces = commerces.length
  const activecommerces = commerces.filter((r: any) => r.subscriptionStatus === 'active').length
  const trialcommerces = commerces.filter((r: any) => r.subscriptionStatus === 'trial').length
  const expiredcommerces = commerces.filter((r: any) => r.subscriptionStatus === 'expired').length

  const mrr = commerces
    .filter((r: any) => r.subscriptionStatus === 'active')
    .reduce((acc: number, r: any) => {
      const prices: Record<string, number> = { starter: 5000, pro: 15000, premium: 30000 }
      return acc + (prices[r.plan] || 0)
    }, 0)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-stone-900">
          Vue globale
        </h1>
        <p className="mt-1 text-sm text-stone-500">Tableau de bord administrateur Fidèle</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-stone-200 bg-white p-5">
          <div className="mb-3 h-1 w-8 rounded-full bg-stone-900" />
          <p className="text-xs font-medium uppercase tracking-wide text-stone-500">Total commerces</p>
          <p className="mt-1 font-[family-name:var(--font-display)] text-3xl font-semibold text-stone-900">{totalcommerces}</p>
        </div>
        <div className="rounded-2xl border border-stone-200 bg-white p-5">
          <div className="mb-3 h-1 w-8 rounded-full bg-green-500" />
          <p className="text-xs font-medium uppercase tracking-wide text-stone-500">Actifs</p>
          <p className="mt-1 font-[family-name:var(--font-display)] text-3xl font-semibold text-stone-900">{activecommerces}</p>
        </div>
        <div className="rounded-2xl border border-stone-200 bg-white p-5">
          <div className="mb-3 h-1 w-8 rounded-full bg-amber-400" />
          <p className="text-xs font-medium uppercase tracking-wide text-stone-500">En essai</p>
          <p className="mt-1 font-[family-name:var(--font-display)] text-3xl font-semibold text-stone-900">{trialcommerces}</p>
        </div>
        <div className="rounded-2xl border border-stone-200 bg-white p-5">
          <div className="mb-3 h-1 w-8 rounded-full bg-red-400" />
          <p className="text-xs font-medium uppercase tracking-wide text-stone-500">Expirés</p>
          <p className="mt-1 font-[family-name:var(--font-display)] text-3xl font-semibold text-stone-900">{expiredcommerces}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-stone-200 bg-white p-6">
        <p className="text-xs font-medium uppercase tracking-wide text-stone-500">MRR estimé</p>
        <p className="mt-1 font-[family-name:var(--font-display)] text-4xl font-semibold text-stone-900">
          {mrr.toLocaleString()} <span className="text-lg font-normal text-stone-500">FCFA/mois</span>
        </p>
        <p className="mt-1 text-xs text-stone-400">Basé sur les abonnements actifs uniquement</p>
      </div>
    </div>
  )
}
