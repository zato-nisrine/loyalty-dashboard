'use client'

import React, { useState } from 'react'
import { useNotification } from './OneSignalProvider'

export default function NotificationSettingsCard() {
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

  const [testMessage, setTestMessage] = useState<string | null>(null)

  const handleTest = async () => {
    setTestMessage('Envoi du test...')
    const res = await sendTestNotification()
    if (res.success) {
      setTestMessage('Notification reçue ! 🔔')
    } else {
      setTestMessage(res.message || 'Échec du test')
    }
    setTimeout(() => setTestMessage(null), 4000)
  }

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-stone-900 dark:text-white">
              Notifications & Alertes en direct
            </h2>
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                permission === 'granted'
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                  : permission === 'denied'
                  ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                  : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
              }`}
            >
              {permission === 'granted'
                ? 'Actives'
                : permission === 'denied'
                ? 'Bloquées'
                : 'Désactivées'}
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
            Recevez une alerte sonore et visuelle à chaque inscription d'un nouveau client ou lorsqu'une demande de récompense est soumise.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          {permission === 'granted' ? (
            <button
              onClick={handleTest}
              disabled={isTesting}
              className="inline-flex items-center gap-1.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 px-4 py-2 text-xs font-semibold text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-700/60 transition-all active:scale-95 disabled:opacity-50"
            >
              {isTesting ? 'Test en cours...' : testMessage || 'Envoyer un test 🔔'}
            </button>
          ) : permission === 'denied' ? (
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-1.5 rounded-xl bg-amber-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-amber-700 transition-all active:scale-95"
            >
              Débloquer & Actualiser
            </button>
          ) : platform === 'ios' && !isStandalone ? (
            <button
              disabled
              className="inline-flex items-center gap-1.5 rounded-xl bg-stone-200 dark:bg-stone-800 px-4 py-2 text-xs font-semibold text-stone-500 cursor-not-allowed"
            >
              Installation PWA requise
            </button>
          ) : (
            <button
              onClick={async () => {
                await requestPermission()
              }}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#4F35E8] to-[#6366F1] px-4 py-2 text-xs font-semibold text-white shadow-xs hover:opacity-95 transition-all active:scale-95 disabled:opacity-50"
            >
              {isLoading ? 'Activation...' : 'Activer les alertes'}
            </button>
          )}
        </div>
      </div>

      {/* Guide de dépannage selon l'état */}
      {permission === 'denied' && (
        <div className="mt-4 rounded-xl border border-amber-500/20 bg-amber-500/[0.06] p-3.5 text-xs text-stone-700 dark:text-stone-300 space-y-1">
          <p className="font-semibold text-amber-700 dark:text-amber-400">
            ⚠️ Le navigateur bloque les notifications pour cette page
          </p>
          <p>
            Pour les autoriser : cliquez sur l'icône de cadenas 🔒 tout à gauche de votre barre d'adresse web, réglez <strong>Notifications</strong> sur <strong>Autoriser</strong>, puis cliquez sur <strong>Débloquer & Actualiser</strong> ci-dessus.
          </p>
        </div>
      )}

      {platform === 'ios' && !isStandalone && (
        <div className="mt-4 rounded-xl border border-sky-500/20 bg-sky-500/[0.06] p-3.5 text-xs text-stone-700 dark:text-stone-300 space-y-1">
          <p className="font-semibold text-sky-700 dark:text-sky-400">
            📱 Sur iPhone / iPad : Installation nécessaire
          </p>
          <p>
            Pour activer les notifications sur iPhone, ouvrez cette page dans Safari, appuyez sur le bouton de <strong>Partage ⎋</strong> (en bas de Safari), puis sur <strong>« Sur l'écran d'accueil ⊞ »</strong>.
          </p>
        </div>
      )}

      {statusReason && permission !== 'denied' && !(platform === 'ios' && !isStandalone) && (
        <div className="mt-3 text-xs text-amber-600 dark:text-amber-400">
          {statusReason}
        </div>
      )}
    </div>
  )
}

