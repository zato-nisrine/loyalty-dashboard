'use client'

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react'
import { getRestaurantClient } from '@/lib/auth-client'

export type NotificationPermissionState = 'default' | 'granted' | 'denied' | 'unsupported'

interface NotificationContextType {
  isSupported: boolean
  permission: NotificationPermissionState
  isSubscribed: boolean
  isLoading: boolean
  isTesting: boolean
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
  const initializedRef = useRef(false)

  // 1. Charger le profil du commerce connecté
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

  // 2. Détecter le support des notifications
  useEffect(() => {
    if (typeof window === 'undefined') return

    if (!('Notification' in window) || !('serviceWorker' in navigator)) {
      setIsSupported(false)
      setPermission('unsupported')
      return
    }

    setIsSupported(true)
    const currentPermission = Notification.permission as NotificationPermissionState
    setPermission(currentPermission)
    if (currentPermission === 'granted') {
      setIsSubscribed(true)
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

  // 5. Demande de permission
  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (typeof window === 'undefined') return false
    if (!('Notification' in window)) {
      setPermission('unsupported')
      return false
    }

    setIsLoading(true)
    try {
      return await new Promise<boolean>((resolve) => {
        window.OneSignalDeferred = window.OneSignalDeferred || []
        window.OneSignalDeferred.push(async function (OneSignal: any) {
          try {
            await OneSignal.Notifications.requestPermission()
            const isPermitted = Notification.permission === 'granted'
            setPermission(Notification.permission as NotificationPermissionState)
            setIsSubscribed(isPermitted)

            if (isPermitted && restaurantId) {
              await OneSignal.login(restaurantId)

              try {
                if ('serviceWorker' in navigator) {
                  const reg = await navigator.serviceWorker.ready
                  if (reg && reg.showNotification) {
                    await reg.showNotification('LOYNIVA Espace Commerce 🔔', {
                      body: 'Notifications activées ! Vous serez alerté dès qu\'un client s\'inscrit ou demande un cadeau.',
                      icon: '/icons/icon-192.png',
                      badge: '/icons/icon-192.png',
                    })
                  }
                }
              } catch (e) {
                // Ignore
              }
            }
            resolve(isPermitted)
          } catch (err) {
            console.error('Erreur demande permission OneSignal:', err)
            resolve(false)
          } finally {
            setIsLoading(false)
          }
        })
      })
    } catch (e) {
      console.error(e)
      setIsLoading(false)
      return false
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
            await reg.showNotification('LOYNIVA Commerce — Test 🔔', {
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
        return { success: false, message: data.error || 'Erreur d\'envoi' }
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
