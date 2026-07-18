import { getRestaurant, getToken } from '@/lib/auth'
import { redirect } from 'next/navigation'
import RewardsManager from '@/components/RewardsManager'

export default async function RewardsPage() {
  const commerce = await getRestaurant()
  if (!commerce) redirect('/login')

  const token = await getToken()
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/restaurants/me/reward-rules`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  })
  const rules = res.ok ? await res.json() : []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-stone-900">
          Récompenses
        </h1>
        <p className="mt-1 text-sm text-stone-500">Définissez les paliers de points et les récompenses associées</p>
      </div>

      <RewardsManager initialRules={rules} brandColor={commerce.brandColor} pointsPer100Fcfa={commerce.pointsPer100Fcfa} />
    </div>
  )
}
