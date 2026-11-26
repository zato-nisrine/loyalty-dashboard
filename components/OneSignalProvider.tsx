'use client'

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react'
import { getRestaurantClient } from '@/lib/auth-client'

export type NotificationPermissionState = 'default' | 'granted' | 'denied' | 'unsupported'
export type DevicePlatform = 'ios' | 'android' | 'desktop' | 'unknown'

interface NotificationContextType {
  isSupported: boolean
  permission: NotificationPermissionState
  isSubscribed: boolean
  isLoading: boolean
  isTesting: boolean
  isStandalone: boolean
  isSecureContext: boolean
  platform: DevicePlatform
  statusReason: string | null
  restaurantId: string | null
  restaurantName: string | null
  requestPermission: () => Promise<boolean>
  sendTestNotification: () => Promise<{ success: boolean; message?: string }>
}

const NotificationContext = createContext<NotificationContextType | null>(null)

export function useNotification() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification doit être utilisé dans OneSignalProvider')
  }
  return context
}

const ONESIGNAL_APP_ID = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID || '0303122a-20b3-4b98-ac91-90fdc9ca70d3'
const SAFARI_WEB_ID = 'web.onesignal.auto.337e82fd-eeda-48f8-8fe5-d2f6dec774c2'

export default function OneSignalProvider({ children }: { children?: React.ReactNode }) {
  const [restaurantId, setRestaurantId] = useState<string | null>(null)
  const [restaurantName, setRestaurantName] = useState<string | null>(null)
  const [permission, setPermission] = useState<NotificationPermissionState>('default')
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isTesting, setIsTesting] = useState<boolean>(false)
  const [isSupported, setIsSupported] = useState<boolean>(true)
  const [platform, setPlatform] = useState<DevicePlatform>('unknown')
  const [isStandalone, setIsStandalone] = useState<boolean>(false)
  const [isSecureContext, setIsSecureContext] = useState<boolean>(true)
  const [statusReason, setStatusReason] = useState<string | null>(null)
  const initializedRef = useRef(false)

  // 1. Détecter la plateforme, le mode PWA et le contexte de sécurité
  useEffect(() => {
    if (typeof window === 'undefined') return

    const ua = navigator.userAgent || ''
    const isIOSDevice =
      /iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    const isAndroidDevice = /Android/i.test(ua)

    let currentPlatform: DevicePlatform = 'desktop'
    if (isIOSDevice) {
      currentPlatform = 'ios'
    } else if (isAndroidDevice) {
      currentPlatform = 'android'
    }
    setPlatform(currentPlatform)

    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true ||
      document.referrer.includes('android-app://')
    setIsStandalone(Boolean(standalone))

    const secure =
      window.isSecureContext === true ||
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1'
    setIsSecureContext(secure)

    // Sur iOS, les notifications Web Push exigent iOS 16.4+ ET que le site soit installé sur l'écran d'accueil
    if (isIOSDevice && !standalone) {
      setIsSupported(false)
      setPermission('unsupported')
      setStatusReason(
        "Sur iPhone, Apple exige d'ajouter l'application à l'écran d'accueil pour activer les notifications (Partager ⎋ -> Sur l'écran d'accueil ⊞)."
      )
      return
    }

    if (!('Notification' in window) || !('serviceWorker' in navigator) || !secure) {
      setIsSupported(false)
      setPermission('unsupported')
      setStatusReason('Votre navigateur ou connexion actuelle ne permet pas les notifications push.')
      return
    }

    setIsSupported(true)
    const currentPermission = Notification.permission as NotificationPermissionState
    setPermission(currentPermission)
    if (currentPermission === 'granted') {
      setIsSubscribed(true)
      setStatusReason(null)
    } else if (currentPermission === 'denied') {
      setStatusReason('Les notifications sont bloquées dans les paramètres de votre navigateur.')
    }
  }, [])

  // 2. Charger le profil du commerce connecté
  useEffect(() => {
    let isMounted = true
    async function loadRestaurant() {
      try {
        const rest = await getRestaurantClient()
        if (isMounted && rest) {
          setRestaurantId(rest.id)
          setRestaurantName(rest.name || null)
        }
      } catch (err) {
        console.error('Erreur chargement restaurant OneSignal:', err)
      }
    }
    loadRestaurant()
    return () => {
      isMounted = false
    }
  }, [])

  // 3. Charger et initialiser OneSignal
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!ONESIGNAL_APP_ID) return

    if (!document.getElementById('onesignal-sdk')) {
      const script = document.createElement('script')
      script.id = 'onesignal-sdk'
      script.src = 'https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js'
      script.defer = true
      document.head.appendChild(script)
    }

    if (initializedRef.current) return
    initializedRef.current = true

    window.OneSignalDeferred = window.OneSignalDeferred || []
    window.OneSignalDeferred.push(async function (OneSignal: any) {
      try {
        await OneSignal.init({
          appId: ONESIGNAL_APP_ID,
          safari_web_id: SAFARI_WEB_ID,
          allowLocalhostAsSecureOrigin: true,
          notifyButton: { enable: false },
        })

        if (typeof Notification !== 'undefined') {
          const perm = Notification.permission as NotificationPermissionState
          setPermission(perm)
          if (perm === 'granted') {
            setIsSubscribed(true)
          }
        }

        if (OneSignal.Notifications && OneSignal.Notifications.addEventListener) {
          OneSignal.Notifications.addEventListener('permissionChange', (isPermitted: boolean) => {
            const newPerm = isPermitted ? 'granted' : 'denied'
            setPermission(newPerm)
            setIsSubscribed(isPermitted)
            if (!isPermitted) {
              setStatusReason('Notifications refusées.')
            } else {
              setStatusReason(null)
            }
          })

          OneSignal.Notifications.addEventListener('click', (event: any) => {
            const data = event.notification?.additionalData || {}
            const url = data.url || '/dashboard'
            if (url && typeof window !== 'undefined') {
              window.location.href = url
            }
          })
        }
      } catch (err) {
        console.warn('Erreur OneSignal commerce init:', err)
      }
    })
  }, [])

  // 4. Lier l'ID du restaurant à OneSignal
  useEffect(() => {
    if (!restaurantId) return
    window.OneSignalDeferred = window.OneSignalDeferred || []
    window.OneSignalDeferred.push(async function (OneSignal: any) {
      try {
        await OneSignal.login(restaurantId)
        console.log('OneSignal: commerce connecté avec ID', restaurantId)
      } catch (error) {
        console.error('Erreur association OneSignal commerce:', error)
      }
    })
  }, [restaurantId])

  // 5. Demande de permission directe (dans le geste utilisateur)
  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (typeof window === 'undefined') return false

    const ua = navigator.userAgent || ''
    const isIOSDevice =
      /iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true

    // Vérification iOS
    if (isIOSDevice && !standalone) {
      setPermission('unsupported')
      setStatusReason(
        "Sur iPhone, installez d'abord l'application sur l'écran d'accueil via le menu Partager de Safari pour activer les notifications."
      )
      return false
    }

    if (!('Notification' in window) || !('serviceWorker' in navigator)) {
      setPermission('unsupported')
      setStatusReason('Votre navigateur ne supporte pas les notifications push.')
      return false
    }

    // Si déjà refusé
    if (Notification.permission === 'denied') {
      setPermission('denied')
      setStatusReason(
        "Les notifications sont bloquées par votre navigateur. Cliquez sur l'icône de cadenas 🔒 à gauche de la barre d'adresse pour les autoriser."
      )
      return false
    }

    setIsLoading(true)
    setStatusReason(null)

    try {
      // APPEL DIRECT NATIVE : Déclenche immédiatement le popup du navigateur
      const nativePerm = await Notification.requestPermission()
      const newPerm = nativePerm as NotificationPermissionState
      setPermission(newPerm)
      const isPermitted = newPerm === 'granted'
      setIsSubscribed(isPermitted)

      if (isPermitted) {
        setStatusReason(null)

        // Enregistrer la souscription dans OneSignal
        window.OneSignalDeferred = window.OneSignalDeferred || []
        window.OneSignalDeferred.push(async function (OneSignal: any) {
          try {
            if (OneSignal.Notifications && OneSignal.Notifications.requestPermission) {
              await OneSignal.Notifications.requestPermission()
            }
            if (restaurantId) {
              await OneSignal.login(restaurantId)
            }
          } catch (e) {
            console.warn('OneSignal sync warning:', e)
          }
        })

        // Afficher une notification locale immédiate de confirmation
        try {
          if ('serviceWorker' in navigator) {
            const reg = await navigator.serviceWorker.ready
            if (reg && reg.showNotification) {
              await reg.showNotification('Fidelity Espace Commerce 🔔', {
                body: "Notifications activées ! Vous recevrez les alertes dès qu'un client s'inscrit ou demande un cadeau.",
                icon: '/icons/icon-192.png',
                badge: '/icons/icon-192.png',
              })
            }
          }
        } catch (e) {
          // Ignorer
        }

        return true
      } else {
        if (newPerm === 'denied') {
          setStatusReason(
            "Vous avez bloqué les notifications. Pour les réactiver, cliquez sur le cadenas 🔒 dans la barre d'adresse du navigateur."
          )
        }
        return false
      }
    } catch (err: any) {
      console.error('Erreur demande permission:', err)
      setStatusReason(err?.message || "Erreur lors de l'activation des notifications")
      return false
    } finally {
      setIsLoading(false)
    }
  }, [restaurantId])

  // 6. Test de notification
  const sendTestNotification = useCallback(async (): Promise<{ success: boolean; message?: string }> => {
    setIsTesting(true)
    try {
      const res = await fetch('/api/notifications/test', {
        method: 'POST',
      })
      const data = await res.json()

      try {
        if ('serviceWorker' in navigator && Notification.permission === 'granted') {
          const reg = await navigator.serviceWorker.ready
          if (reg && reg.showNotification) {
            await reg.showNotification('Fidelity Commerce — Test 🔔', {
              body: 'Vos alertes commerçant fonctionnent parfaitement sur cet appareil.',
              icon: '/icons/icon-192.png',
              badge: '/icons/icon-192.png',
            })
          }
        }
      } catch (e) {
        // Ignorer
      }

      if (!res.ok) {
        return { success: false, message: data.error || "Erreur d'envoi" }
      }
      return { success: true }
    } catch (err: any) {
      return { success: false, message: err?.message || 'Erreur réseau' }
    } finally {
      setIsTesting(false)
    }
  }, [])

  return (
    <NotificationContext.Provider
      value={{
        isSupported,
        permission,
        isSubscribed,
        isLoading,
        isTesting,
        isStandalone,
        isSecureContext,
        platform,
        statusReason,
        restaurantId,
        restaurantName,
        requestPermission,
        sendTestNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}
