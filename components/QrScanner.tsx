'use client'

import { useEffect, useRef, useState } from 'react'
import { BrowserQRCodeReader, IScannerControls } from '@zxing/browser'

export default function QrScannerComponent({ onScan }: { onScan: (data: string) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const controlsRef = useRef<IScannerControls | null>(null)
  const onScanRef = useRef(onScan)
  const [error, setError] = useState('')
  const [debugInfo, setDebugInfo] = useState('')

  useEffect(() => {
    onScanRef.current = onScan
  }, [onScan])

  useEffect(() => {
    if (!videoRef.current) return
    let cancelled = false
    const codeReader = new BrowserQRCodeReader()

    codeReader
      .decodeFromConstraints(
        {
          video: {
            facingMode: 'environment',
            width: { ideal: 1920 },
            height: { ideal: 1080 },
          },
        },
        videoRef.current,
        (result) => {
          if (result) {
            onScanRef.current(result.getText())
          }
          // le callback est aussi appelé (sans résultat) à chaque frame sans QR détecté - normal, on ignore
        }
      )
      .then((controls) => {
        if (cancelled) {
          controls.stop()
          return
        }
        controlsRef.current = controls
        setTimeout(() => {
          if (videoRef.current) {
            setDebugInfo(`${videoRef.current.videoWidth}x${videoRef.current.videoHeight} · moteur: ZXing`)
          }
        }, 500)
      })
      .catch(() => {
        setError("Impossible d'accéder à la caméra. Vérifiez les autorisations de votre navigateur.")
      })

    return () => {
      cancelled = true
      controlsRef.current?.stop()
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
          <video ref={videoRef} className="aspect-square w-full object-cover" muted playsInline />
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
