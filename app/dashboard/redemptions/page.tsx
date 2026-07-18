import { getRestaurant, getToken } from '@/lib/auth'
import { redirect } from 'next/navigation'
import RedemptionsList from '@/components/RedemptionsList'

export default async function RedemptionsPage() {
  const commerce = await getRestaurant()
  if (!commerce) redirect('/login')

  const token = await getToken()
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rewards/pending`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  })
  const redemptions = res.ok ? await res.json() : []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-stone-900">
          Demandes
        </h1>
        <p className="mt-1 text-sm text-stone-500">Confirmez ou refusez les demandes de récompense en attente</p>
      </div>

      <RedemptionsList initialRedemptions={redemptions} brandColor={commerce.brandColor} />
    </div>
  )
}
