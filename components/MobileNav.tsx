'use client'

import { useState } from 'react'
import Link from 'next/link'

const links = [
  { href: '/dashboard', label: 'Tableau de bord' },
  { href: '/dashboard/codes', label: 'Code de validation' },
  { href: '/dashboard/rewards', label: 'Récompenses' },
  { href: '/dashboard/redemptions', label: 'Demandes' },
  { href: '/dashboard/qr-code', label: 'Mon QR code' },
  { href: '/dashboard/settings', label: 'Paramètres' },
]

export default function MobileNav({
  restaurantName,
  logoUrl,
  brandColor,
}: {
  restaurantName: string
  logoUrl?: string | null
  brandColor: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="flex items-center justify-between border-b border-stone-200 bg-white px-4 py-3 lg:hidden">
        <div className="flex items-center gap-2.5">
          {logoUrl ? (
            <img src={logoUrl} alt={restaurantName} className="h-8 w-8 rounded-lg object-cover" />
          ) : (
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-semibold text-white"
              style={{ backgroundColor: brandColor }}
            >
              {restaurantName.charAt(0)}
            </div>
          )}
          <p className="font-[family-name:var(--font-display)] text-base font-semibold text-stone-900">
            {restaurantName}
          </p>
        </div>
        <button
          onClick={() => setOpen(true)}
          aria-label="Ouvrir le menu"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-stone-200"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 4.5H16M2 9H16M2 13.5H16" stroke="#1C1917" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-72 bg-white p-5 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-stone-900">Menu</p>
              <button
                onClick={() => setOpen(false)}
                aria-label="Fermer le menu"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1L13 13M1 13L13 1" stroke="#1C1917" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
