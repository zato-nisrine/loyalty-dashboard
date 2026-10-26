import { getRestaurant, getToken } from '@/lib/auth'
import { redirect } from 'next/navigation'
import CampaignsManager from '@/components/CampaignsManager'

export default async function CampaignsPage() {
  const commerce = await getRestaurant()
  if (!commerce) redirect('/login')

  const token = await getToken()
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/campaigns`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  })
  const campaigns = res.ok ? await res.json() : []
  const isLocked = res.status === 403

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-[28px] sm:text-[32px] font-bold text-foreground tracking-tight">
          Campagnes
        </h1>
        <p className="mt-1 text-sm text-text-muted">
          Diffusez des annonces, promotions et offres spéciales à l'ensemble de votre communauté
        </p>
      </div>

      {isLocked ? (
        <div className="rounded-2xl border border-dashed border-[#D8E0E8] bg-surface p-8 text-center dark:border-white/10">
          <p className="font-display text-base font-semibold text-foreground">Fonctionnalité réservée au plan Pro</p>
          <p className="mt-1 text-sm text-text-muted">
            Passez au plan Pro pour envoyer des campagnes marketing directes à tous vos clients LOYNIVA.
          </p>
        </div>
      ) : (
        <CampaignsManager initialCampaigns={campaigns} brandColor={commerce.brandColor || '#102A43'} />
      )}
    </div>
  )
}
