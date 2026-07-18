'use client'

import { useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'

export default function QrCodeDisplay({
  url,
  commerceName,
  brandColor,
}: {
  url: string
  commerceName: string
  brandColor: string
}) {
  const svgContainerRef = useRef<HTMLDivElement>(null)

  function handleDownload() {
    const svgElement = svgContainerRef.current?.querySelector('svg')
    if (!svgElement) return

    const padding = 60
    const qrSize = 240
    const canvasSize = qrSize + padding * 2

    const svgData = new XMLSerializer().serializeToString(svgElement)
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    const url2 = URL.createObjectURL(svgBlob)

    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = canvasSize
      canvas.height = canvasSize + 80
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#1C1917'
      ctx.font = '600 20px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(commerceName, canvas.width / 2, 36)

      ctx.drawImage(img, padding, 56, qrSize, qrSize)

      ctx.fillStyle = '#78716C'
      ctx.font = '13px Arial'
      ctx.fillText('Scannez pour rejoindre notre programme de fidélité', canvas.width / 2, canvasSize + 40)

      URL.revokeObjectURL(url2)

      canvas.toBlob((blob) => {
        if (!blob) return
        const link = document.createElement('a')
        link.download = `qr-code-${commerceName.toLowerCase().replace(/\s+/g, '-')}.png`
        link.href = URL.createObjectURL(blob)
        link.click()
        URL.revokeObjectURL(link.href)
      })
    }
    img.src = url2
  }

  return (
    <div className="flex flex-col items-center gap-6 rounded-2xl border border-stone-200 bg-white p-10">
      <p className="font-[family-name:var(--font-display)] text-xl font-semibold text-stone-900">
        {commerceName}
      </p>
      <div ref={svgContainerRef} className="rounded-2xl border-4 p-4" style={{ borderColor: brandColor }}>
        <QRCodeSVG value={url} size={240} />
      </div>
      <p className="text-center text-sm text-stone-500">Scannez pour rejoindre notre programme de fidélité</p>
      <p className="break-all text-center text-xs text-stone-400">{url}</p>

      <button
        onClick={handleDownload}
        className="rounded-full px-6 py-2.5 text-sm font-medium text-white"
        style={{ backgroundColor: brandColor }}
      >
        Télécharger pour impression
      </button>
    </div>
  )
}
