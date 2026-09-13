'use client'

import { useEffect, useRef, useState } from 'react'
import QrScanner from 'qr-scanner'

export default function QrScannerComponent({ onScan }: { onScan: (data: string) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const scannerRef = useRef<QrScanner | null>(null)
  const onScanRef = useRef(onScan)
  const [error, setError] = useState('')
  const [debugInfo, setDebugInfo] = useState('')

  useEffect(() => {
    onScanRef.current = onScan
  }, [onScan])

  useEffect(() => {
    if (!videoRef.current) return
    const video = videoRef.current

    const scanner = new QrScanner(
      video,
      (result) => {
        onScanRef.current(result.data)
      },
      {
        highlightScanRegion: true,
        highlightCodeOutline: true,
        preferredCamera: 'environment',
        calculateScanRegion: (video) => {
          const size = Math.round(Math.min(video.videoWidth, video.videoHeight) * 0.9)
          return {
            x: Math.round((video.videoWidth - size) / 2),
            y: Math.round((video.videoHeight - size) / 2),
            width: size,
            height: size,
          }
        },
      }
    )

    scannerRef.current = scanner

    scanner
      .start()
      .then(() => {
        const engine = 'BarcodeDetector' in window ? 'natif (rapide)' : 'jsQR via worker (fallback)'
        setTimeout(() => {
          setDebugInfo(`${video.videoWidth}x${video.videoHeight} · moteur: ${engine}`)
        }, 500)
      })
      .catch(() => {
        setError("Impossible d'accéder à la caméra. Vérifiez les autorisations de votre navigateur.")
      })

    return () => {
      scanner.stop()
      scanner.destroy()
    }
  }, [])

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border-subtle bg-black">
      {error ? (
        <div className="p-8 text-center">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      ) : (
        <>
          <video ref={videoRef} className="aspect-square w-full object-cover" />
          {debugInfo && (
            <div className="absolute top-2 left-2 right-2 rounded-lg bg-black/70 px-3 py-1.5 text-center text-[11px] text-lime-400 font-mono">
              {debugInfo}
            </div>
          )}
        </>
      )}
    </div>
  )
}
