'use client'

import React, { useState, useEffect } from 'react'
import { useNotification } from './OneSignalProvider'

export default function MerchantNotificationBanner() {
  const { permission, isLoading, isTesting, requestPermission, sendTestNotification } = useNotification()
  const [dismissed, setDismissed] = useState(true)
  const [testMessage, setTestMessage] = useState<string | null>(null)

  useEffect(() => {
    const isDismissed = localStorage.getItem('loyniva_merchant_notif_banner_dismissed') === 'true'
    setDismissed(isDismissed)
  }, [])

  const handleDismiss = () => {
    localStorage.setItem('loyniva_merchant_notif_banner_dismissed', 'true')
    setDismissed(true)
  }

  const handleTest = async () => {
    setTestMessage('Envoi du test...')
    const res = await sendTestNotification()
    if (res.success) {
      setTestMessage('Notification reçue ! 🔔')
    } else {
      setTestMessage(res.message || 'Échec du test')
    }
    setTimeout(() => setTestMessage(null), 3500)
  }

  if (dismissed && permission !== 'default') {
    return null
  }

  // Si déjà accordé
  if (permission === 'granted') {
    return (
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06] p-3 text-xs sm:text-sm text-foreground">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="font-semibold truncate">
            Alertes en direct actives (nouveaux clients & demandes)
          </span>
        </div>

        <button
          onClick={handleTest}
          disabled={isTesting}
          className="rounded-lg border border-emerald-500/30 bg-surface px-3 py-1 text-xs font-semibold text-emerald-600 hover:bg-emerald-50 transition-all active:scale-95 disabled:opacity-50 shrink-0 dark:text-emerald-400 dark:hover:bg-emerald-950/30"
        >
          {isTesting ? 'Test...' : testMessage || 'Tester'}
        </button>
      </div>
    )
  }

  if (dismissed) return null

  return (
    <div className="relative overflow-hidden rounded-2xl border border-indigo-500/20 bg-gradient-to-r from-[#4F35E8]/10 via-[#6366F1]/10 to-[#4F35E8]/5 p-4 shadow-xs">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#4F35E8] to-[#6366F1] text-white shadow-xs">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500" />
            </span>
          </div>

          <div className="min-w-0 pr-1">
            <p className="font-display text-xs sm:text-sm font-bold text-foreground">
              Recevez les alertes de votre commerce en temps réel
            </p>
            <p className="text-[11px] text-text-muted mt-0.5 leading-relaxed">
              Soyez notifié immédiatement dès qu'un <strong>nouveau client s'inscrit</strong> ou qu'une <strong>demande de récompense</strong> est soumise en caisse !
            </p>

            <div className="mt-2.5 flex items-center gap-2">
              <button
                onClick={() => requestPermission()}
                disabled={isLoading}
                className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#4F35E8] to-[#6366F1] px-3.5 py-1.5 text-xs font-bold text-white shadow-xs transition-transform hover:scale-105 active:scale-95 disabled:opacity-60"
              >
                {isLoading ? (
                  <svg className="animate-spin h-3.5 w-3.5 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                )}
                {isLoading ? 'Activation...' : 'Activer les notifications'}
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={handleDismiss}
          aria-label="Ignorer"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-text-muted hover:bg-surface-muted transition-colors active:scale-95"
        >
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}
