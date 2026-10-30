'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import ThemeToggle from './ThemeToggle'
import LoynivaLogo from './LoynivaLogo'

const links = [
  {
    href: '/dashboard',
    label: 'Tableau de bord',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    href: '/dashboard/clients',
    label: 'Clients',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    href: '/dashboard/codes',
    label: 'Crédit de points',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    href: '/dashboard/rewards',
    label: 'Récompenses',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v3a2 2 0 01-2 2M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
      </svg>
    ),
  },
  {
    href: '/dashboard/redemptions',
    label: 'Demandes',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    href: '/dashboard/campaigns',
    label: 'Campagnes',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    ),
  },
  {
    href: '/dashboard/qr-code',
    label: 'Mon QR code',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
      </svg>
    ),
  },
  {
    href: '/dashboard/settings',
    label: 'Paramètres',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
]

export default function MobileNav({
  commerceName,
  logoUrl,
  brandColor,
  plan = 'PRO',
}: {
  commerceName: string
  logoUrl?: string | null
  brandColor: string
  plan?: string | null
}) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // Prevent background scrolling when sidebar is open on mobile
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
    router.refresh()
  }

  return (
    <>
      {/* Mobile Top Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border-subtle bg-surface/95 px-4 py-3 backdrop-blur-md lg:hidden">
        <div className="flex items-center gap-3">
          {/* Burger Button */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Ouvrir le menu de navigation"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-subtle bg-surface-muted text-foreground transition-all hover:bg-surface-subtle active:scale-95"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M3 5H17M3 10H17M3 15H17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <Link href="/dashboard" className="flex items-center gap-2">
            <LoynivaLogo size="sm" showTagline={false} />
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={commerceName}
              className="h-8 w-8 rounded-lg object-cover ring-1 ring-border-subtle"
            />
          ) : (
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-white shadow-xs"
              style={{ backgroundColor: brandColor || '#102A43' }}
            >
              {commerceName.charAt(0)}
            </div>
          )}
        </div>
      </header>

      {/* Mobile Sidebar Drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" aria-modal="true" role="dialog">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#102A43]/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Sidebar */}
          <aside className="fixed inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col justify-between border-r border-border-subtle bg-surface p-5 shadow-2xl transition-transform duration-300 ease-out">
            <div className="flex-1 overflow-y-auto">
              {/* Sidebar Header */}
              <div className="mb-5 flex items-center justify-between border-b border-border-subtle pb-4">
                <Link href="/dashboard" onClick={() => setOpen(false)}>
                  <LoynivaLogo size="sm" showTagline={false} />
                </Link>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Fermer le menu"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-subtle text-foreground hover:bg-surface-muted transition-colors active:scale-95"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M1 1L13 13M1 13L13 1"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Merchant Profile Card */}
              <div className="mb-5 flex items-center gap-3 rounded-xl border border-border-subtle bg-surface-muted p-3">
                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt={commerceName}
                    className="h-10 w-10 rounded-lg object-cover shadow-xs"
                  />
                ) : (
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold text-white shadow-xs"
                    style={{ backgroundColor: brandColor || '#102A43' }}
                  >
                    {commerceName.charAt(0)}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-sm font-bold text-foreground">
                    {commerceName}
                  </p>
                  <p className="text-[11px] font-medium text-accent uppercase tracking-wider">
                    Plan {plan || 'PRO'}
                  </p>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-1">
                {links.map((link) => {
                  const active =
                    pathname === link.href ||
                    (link.href !== '/dashboard' && pathname.startsWith(link.href))

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors ${
                        active
                          ? 'bg-[#102A43] text-white shadow-xs dark:bg-[#4F9DCE] dark:text-[#091420]'
                          : 'text-text-main hover:bg-surface-muted hover:text-foreground'
                      }`}
                    >
                      <span className={active ? 'text-white dark:text-[#091420]' : 'text-text-muted'}>
                        {link.icon}
                      </span>
                      {link.label}
                    </Link>
                  )
                })}
              </nav>
            </div>

            {/* Bottom Actions & Footer */}
            <div className="mt-4 border-t border-border-subtle pt-4 space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-medium text-text-muted">Apparence</span>
                <ThemeToggle />
              </div>

              <button
                onClick={handleLogout}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-border-subtle bg-surface px-3 py-2 text-sm font-semibold text-text-main transition-colors hover:border-[#C43D4D] hover:bg-[#C43D4D]/5 hover:text-[#C43D4D]"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Déconnexion
              </button>

              <p className="text-[11px] text-center text-text-muted">
                LOYNIVA • Chaque visite compte.
              </p>
            </div>
          </aside>
        </div>
      )}
    </>
  )
}
