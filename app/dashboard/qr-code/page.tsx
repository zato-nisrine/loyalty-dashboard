import { getRestaurant } from '@/lib/auth'
import { redirect } from 'next/navigation'
import QrCodeDisplay from '@/components/QrCodeDisplay'

export default async function QrCodePage() {
  const commerce = await getRestaurant()
  if (!commerce) redirect('/login')

  const joinUrl = `${process.env.NEXT_PUBLIC_CLIENT_URL}/join?token=${commerce.qrCodeToken}`

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-[28px] sm:text-[32px] font-bold text-foreground tracking-tight">
          Mon QR code LOYNIVA
        </h1>
        <p className="mt-1 text-sm text-text-muted">
          Affichez ce code en caisse pour que vos clients créent instantanément leur carte de fidélité
        </p>
      </div>

      <QrCodeDisplay url={joinUrl} commerceName={commerce.name} brandColor={commerce.brandColor || '#102A43'} />
    </div>
  )
}
