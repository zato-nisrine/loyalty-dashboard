'use client'

import { QRCodeSVG } from 'qrcode.react'

export default function QrCodeDisplay({
  url,
  restaurantName,
  brandColor,
}: {
  url: string
  restaurantName: string
  brandColor: string
}) {
  return (
    <div className="flex flex-col items-center gap-6 rounded-2xl border border-stone-200 bg-white p-10">
      <p className="font-[family-name:var(--font-display)] text-xl font-semibold text-stone-900">
        {restaurantName}
      </p>
      <div className="rounded-2xl border-4 p-4" style={{ borderColor: brandColor }}>
        <QRCodeSVG value={url} size={240} />
      </div>
      <p className="text-center text-sm text-stone-500">Scannez pour rejoindre notre programme de fidélité</p>
      <p className="break-all text-center text-xs text-stone-400">{url}</p>
    </div>
  )
}
