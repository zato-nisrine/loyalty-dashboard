'use client'

import React, { useState } from 'react'
import { useNotification } from './OneSignalProvider'

export default function MerchantNotificationBanner() {
  const {
    permission,
    isLoading,
    isTesting,
    platform,
    isStandalone,
    statusReason,
    requestPermission,
    sendTestNotification,
  } = useNotification()

  const [dismissed, setDismissed] = useState(false)
  const [testMessage, setTestMessage] = useState<string | null>(null)

  const handleTest = async () => {
    setTestMessage('Envoi...')
    const res = await sendTestNotification()
    if (res.success) {
      setTestMessage('Notification reçue ! 🔔')
    } else {
      setTestMessage(res.message || 'Échec du test')
    }
    setTimeout(() => setTestMessage(null), 3500)
  }

  // 1. CAS : Déjà activé et autorisé (Permission accordée)
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

  // 2. CAS : Bloqué par le navigateur (Denied)
  if (permission === 'denied') {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs sm:text-sm text-amber-950 dark:text-amber-100 shadow-xs">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>

            <div className="space-y-1.5 min-w-0">
              <p className="font-bold text-foreground">
                Notifications bloquées par votre navigateur
              </p>
              <p className="text-[11px] sm:text-xs text-text-muted leading-relaxed">
                Le navigateur a bloqué les notifications pour ce site. Pour recevoir les alertes de nouveaux clients et de demandes de cadeaux en temps réel :
              </p>
              <ul className="text-[11px] sm:text-xs list-disc list-inside space-y-1 text-text-muted">
                <li>
                  <strong>Sur PC (Chrome / Edge / Firefox) :</strong> Cliquez sur le cadenas 🔒 à gauche de l'adresse web, réglez « Notifications » sur <strong>Autoriser</strong>, puis actualisez la page.
                </li>
                <li>
                  <strong>Sur Smartphone :</strong> Ouvrez les paramètres du navigateur ou du site pour autoriser les notifications.
                </li>
              </ul>

              <div className="pt-1.5 flex items-center gap-2">
                <button
                  onClick={() => window.location.reload()}
                  className="rounded-xl bg-amber-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-amber-700 transition-all active:scale-95"
                >
                  J'ai autorisé, actualiser la page
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={() => setDismissed(true)}
            aria-label="Fermer"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-text-muted hover:bg-surface-muted transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
    )
  }

  // 3. CAS : iOS (iPhone/iPad) hors mode PWA
  if (platform === 'ios' && !isStandalone) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-sky-500/30 bg-sky-500/10 p-4 text-xs sm:text-sm text-sky-950 dark:text-sky-100 shadow-xs">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-500/20 text-sky-600 dark:text-sky-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
              </svg>
            </div>

            <div className="space-y-1.5 min-w-0">
              <p className="font-bold text-foreground">
                Activation des alertes sur iPhone / iPad (iOS)
              </p>
              <p className="text-[11px] sm:text-xs text-text-muted leading-relaxed">
                Apple exige que l'application soit installée sur votre écran d'accueil pour autoriser les alertes en direct :
              </p>
              <ol className="text-[11px] sm:text-xs list-decimal list-inside space-y-1 text-text-muted">
                <li>Appuyez sur le bouton de <strong>Partage ⎋</strong> (icône avec flèche vers le haut en bas de Safari).</li>
                <li>Faites défiler vers le bas et touchez <strong>« Sur l'écran d'accueil ⊞ »</strong>.</li>
                <li>Ouvrez l'icône <strong>LOYNIVA</strong> depuis votre écran d'accueil et activez les alertes.</li>
              </ol>
            </div>
          </div>

          <button
            onClick={() => setDismissed(true)}
            aria-label="Fermer"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-text-muted hover:bg-surface-muted transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
    )
  }

  // 4. CAS : Permission 'default' (Prêt à activer)
  return (
    <div className="relative overflow-hidden rounded-2xl border border-indigo-500/20 bg-gradient-to-r from-[#4F35E8]/10 via-[#6366F1]/10 to-[#4F35E8]/5 p-4 shadow-xs">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
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

            {statusReason && (
              <p className="text-[11px] text-amber-600 dark:text-amber-400 font-medium mt-1">
                ⚠️ {statusReason}
              </p>
            )}

            <div className="mt-2.5 flex items-center gap-2">
              <button
                onClick={async () => {
                  await requestPermission()
                }}
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
                {isLoading ? 'Activation en cours...' : 'Activer les notifications'}
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={() => setDismissed(true)}
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
