import { getcommerce, getToken } from '@/lib/auth'
import { redirect } from 'next/navigation'
import CampaignsManager from '@/components/CampaignsManager'

export default async function CampaignsPage() {
  const commerce = await getcommerce()
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
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-stone-900">
          Campagnes
        </h1>
        <p className="mt-1 text-sm text-stone-500">Envoyez des notifications à tous vos clients</p>
      </div>

      {isLocked ? (
        <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-8 text-center">
          <p className="text-sm font-medium text-stone-700">Fonctionnalité réservée au plan Pro</p>
          <p className="mt-1 text-sm text-stone-500">
            Passez au plan Pro pour envoyer des campagnes marketing à vos clients.
          </p>
        </div>
      ) : (
        <CampaignsManager initialCampaigns={campaigns} brandColor={commerce.brandColor} />
      )}
    </div>
  )
}
