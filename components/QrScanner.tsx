'use client'

import { useEffect, useRef, useState } from 'react'
import QrScanner from 'qr-scanner'

QrScanner.WORKER_PATH = '/qr-scanner-worker.min.js'

export default function QrScannerComponent({ onScan }: { onScan: (data: string) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const scannerRef = useRef<QrScanner | null>(null)
  const onScanRef = useRef(onScan)
  const [error, setError] = useState('')
  const [hasFlash, setHasFlash] = useState(false)
  const [flashOn, setFlashOn] = useState(false)

  useEffect(() => {
    onScanRef.current = onScan
  }, [onScan])

  useEffect(() => {
    if (!videoRef.current) return

    const scanner = new QrScanner(
      videoRef.current,
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
      .then(() => scanner.hasFlash())
      .then(setHasFlash)
      .catch(() => {
        setError("Impossible d'accéder à la caméra. Vérifiez les autorisations de votre navigateur.")
      })

    return () => {
      scanner.stop()
      scanner.destroy()
    }
  }, [])

  async function toggleFlash() {
    if (!scannerRef.current) return
    await scannerRef.current.toggleFlash()
    setFlashOn(scannerRef.current.isFlashOn())
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border-subtle bg-black">
      {error ? (
        <div className="p-8 text-center">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      ) : (
        <>
          <video ref={videoRef} className="aspect-square w-full object-cover" />
          {hasFlash && (
            <button
              onClick={toggleFlash}
              className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm"
              aria-label="Activer/désactiver le flash"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={flashOn ? '#facc15' : '#ffffff'} strokeWidth="1.8">
                <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8Z" strokeLinejoin="round" />
              </svg>
            </button>
          )}
        </>
      )}
    </div>
  )
}
