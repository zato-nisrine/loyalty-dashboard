'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import LoynivaLogo from './LoynivaLogo'
import ThemeToggle from './ThemeToggle'

export default function LandingNavbar() {
  const [open, setOpen] = useState(false)

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

  return (
    <>
      <header className="flex items-center justify-between py-5 sm:py-6">
        <Link href="/" className="transition-opacity hover:opacity-90">
          <LoynivaLogo size="md" showTagline={true} />
        </Link>

        {/* Desktop Navigation (>= sm) */}
        <div className="hidden sm:flex sm:items-center sm:gap-3">
          <ThemeToggle />
          <Link
            href="/login"
            className="rounded-xl border border-[#D8E0E8] bg-surface px-4 py-2.5 text-sm font-semibold text-[#102A43] transition-all hover:border-[#4F9DCE] hover:text-[#4F9DCE] dark:border-white/10 dark:text-white"
          >
            Se connecter
          </Link>
          <Link
            href="/register"
            className="rounded-xl bg-[#102A43] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#1A3E61] hover:shadow dark:bg-[#4F9DCE] dark:text-[#091420] dark:hover:bg-[#69B0DC]"
          >
            Essai gratuit
          </Link>
        </div>

        {/* Mobile Burger & Actions (< sm) */}
        <div className="flex items-center gap-2 sm:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen(true)}
            aria-label="Ouvrir le menu"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#D8E0E8] bg-surface text-[#102A43] transition-all hover:bg-surface-muted active:scale-95 dark:border-white/10 dark:text-white"
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
        </div>
      </header>

      {/* Mobile Sidebar Drawer */}
      {open && (
        <div className="fixed inset-0 z-50 sm:hidden" aria-modal="true" role="dialog">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#102A43]/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <aside className="fixed inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col justify-between border-r border-[#D8E0E8] bg-surface p-5 shadow-2xl transition-transform duration-300 ease-out dark:border-white/10">
            <div>
              {/* Header */}
              <div className="mb-6 flex items-center justify-between border-b border-[#D8E0E8] pb-4 dark:border-white/10">
                <Link href="/" onClick={() => setOpen(false)}>
                  <LoynivaLogo size="sm" showTagline={false} />
                </Link>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Fermer le menu"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#D8E0E8] text-[#102A43] transition-colors hover:bg-surface-muted active:scale-95 dark:border-white/10 dark:text-white"
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

              {/* Tagline */}
              <p className="mb-5 text-xs text-text-muted">
                Plateforme de fidélité nouvelle génération pour commerces & restaurants.
              </p>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-1.5">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-text-main transition-colors hover:bg-surface-muted hover:text-foreground"
                >
                  <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Accueil
                </Link>

                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-[#D8E0E8] bg-surface px-4 py-3 text-sm font-semibold text-[#102A43] transition-colors hover:border-[#4F9DCE] hover:text-[#4F9DCE] dark:border-white/10 dark:text-white"
                >
                  <svg className="h-4 w-4 text-[#4F9DCE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Se connecter
                </Link>

                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#102A43] px-4 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#1A3E61] dark:bg-[#4F9DCE] dark:text-[#091420]"
                >
                  <span>Créer mon compte (Essai gratuit)</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </nav>
            </div>

            {/* Bottom Actions */}
            <div className="border-t border-[#D8E0E8] pt-4 dark:border-white/10">
              <div className="mb-3 flex items-center justify-between px-1">
                <span className="text-xs font-medium text-text-muted">Apparence</span>
                <ThemeToggle />
              </div>
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
