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
        <h1 className="font-display text-[28px] sm:text-[32px] font-bold text-foreground tracking-tight">
          Demandes de récompense
        </h1>
        <p className="mt-1 text-sm text-text-muted">
          Validez ou refusez les récompenses réclamées par vos clients en caisse
        </p>
      </div>

      <RedemptionsList initialRedemptions={redemptions} brandColor={commerce.brandColor || '#102A43'} />
    </div>
  )
}
