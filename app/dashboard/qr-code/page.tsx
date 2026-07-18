import { getcommerce } from '@/lib/auth'
import { redirect } from 'next/navigation'
import QrCodeDisplay from '@/components/QrCodeDisplay'

export default async function QrCodePage() {
  const commerce = await getcommerce()
  if (!commerce) redirect('/login')

  const joinUrl = `${process.env.NEXT_PUBLIC_CLIENT_URL}/join?token=${commerce.qrCodeToken}`

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-stone-900">
          Mon QR code
        </h1>
        <p className="mt-1 text-sm text-stone-500">
          Affichez ce code en caisse pour que vos clients créent leur carte de fidélité
        </p>
      </div>

      <QrCodeDisplay url={joinUrl} commerceName={commerce.name} brandColor={commerce.brandColor} />
    </div>
  )
}
