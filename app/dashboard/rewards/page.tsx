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
        <h1 className="font-display text-[28px] sm:text-[32px] font-bold text-foreground tracking-tight">
          Récompenses
        </h1>
        <p className="mt-1 text-sm text-text-muted">
          Définissez les paliers de points et les cadeaux associés pour récompenser vos habitués
        </p>
      </div>

      <RewardsManager initialRules={rules} brandColor={commerce.brandColor || '#102A43'} pointsPer100Fcfa={commerce.pointsPer100Fcfa} />
    </div>
  )
}
