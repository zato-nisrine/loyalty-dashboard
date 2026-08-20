'use client'

import { useState, useEffect, useCallback } from 'react'
import QrScannerComponent from './QrScanner'

export default function CodeGenerator({ brandColor }: { brandColor: string }) {
  const [activeTab, setActiveTab] = useState<'search' | 'scan'>('search')
  const [pseudo, setPseudo] = useState('')
  const [clients, setClients] = useState<any[]>([])
  const [selectedClient, setSelectedClient] = useState<any>(null)
  const [searchError, setSearchError] = useState('')
  const [searching, setSearching] = useState(false)
  const [scannerError, setScannerError] = useState('')

  const [amount, setAmount] = useState('')
  const [crediting, setCrediting] = useState(false)
  const [creditResult, setCreditResult] = useState<any>(null)
  const [creditError, setCreditError] = useState('')

  const handleScan = useCallback(async (decodedText: string) => {
    if (searching) return // Prevent multiple scans
    setScannerError('')
    setSearching(true)
    try {
      const res = await fetch(`/api/loyalty-cards/search-by-id?cardId=${encodeURIComponent(decodedText)}`)
      if (!res.ok) {
        const data = await res.json()
        setScannerError(data.message || 'Carte invalide')
      } else {
        const data = await res.json()
        setClients(data)
        setSelectedClient(data[0])
      }
    } catch (e) {
      setScannerError('Erreur de réseau')
    } finally {
      setSearching(false)
    }
  }, [searching])

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setSearchError('')
    setClients([])
    setSelectedClient(null)
    setCreditResult(null)
    setSearching(true)

    const res = await fetch(`/api/loyalty-cards/search?pseudo=${encodeURIComponent(pseudo)}`)
    setSearching(false)

    if (!res.ok) {
      const data = await res.json()
      setSearchError(data.message || 'Client introuvable')
      return
    }

    setClients(await res.json())
  }

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault()
    setCreditError('')
    setCrediting(true)

    const res = await fetch('/api/validation-codes/credit-direct', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ loyaltyCardId: selectedClient.id, amountFcfa: Number(amount) }),
    })

    setCrediting(false)

    if (!res.ok) {
      const data = await res.json()
      setCreditError(data.message || 'Erreur lors du crédit des points')
      return
    }

    setCreditResult(await res.json())
  }

  function reset() {
    setPseudo('')
    setClients([])
    setSelectedClient(null)
    setAmount('')
    setCreditResult(null)
    setSearchError('')
    setScannerError('')
    setCreditError('')
  }

  if (creditResult) {
    return (
      <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full mx-auto" style={{ backgroundColor: `${brandColor}1A` }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" style={{ color: brandColor }}>
            <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <p className="text-sm text-stone-500">Points crédités à {selectedClient.client.name}</p>
        <p
          className="my-6 font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold tracking-widest"
          style={{ color: brandColor }}
        >
          +{creditResult.pointsEarned}
        </p>
        <p className="text-sm text-stone-600">
          Montant : <span className="font-medium text-stone-900">{creditResult.amountFcfa.toLocaleString()} FCFA</span>
        </p>
        <p className="text-sm text-stone-600">
          Nouveau solde : <span className="font-medium text-stone-900">{creditResult.newBalance} pts</span>
        </p>

        <div className="mt-6 flex justify-center">
          <button
            onClick={reset}
            className="w-full max-w-xs rounded-full border border-stone-300 px-6 py-3 text-sm font-medium text-stone-700 hover:border-stone-400"
          >
            Scanner un nouveau client
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-stone-200 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-stone-900">
            1. Trouver le client
          </h2>
          {!selectedClient && (
            <div className="flex rounded-lg bg-stone-100 p-1">
              <button
                onClick={() => { setActiveTab('search'); setSearchError(''); setScannerError('') }}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${activeTab === 'search' ? 'bg-white shadow-sm text-stone-900' : 'text-stone-500 hover:text-stone-700'}`}
              >
                Recherche
              </button>
              <button
                onClick={() => { setActiveTab('scan'); setSearchError(''); setScannerError('') }}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${activeTab === 'scan' ? 'bg-white shadow-sm text-stone-900' : 'text-stone-500 hover:text-stone-700'}`}
              >
                Caméra
              </button>
            </div>
          )}
        </div>

        {!selectedClient && activeTab === 'search' && (
          <div>
            <form onSubmit={handleSearch} className="flex gap-3">
              <input
                type="text"
                placeholder="Pseudo / Nom du client"
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
                required
                className="flex-1 rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900"
              />
              <button
                type="submit"
                disabled={searching}
                className="rounded-full px-5 py-2 text-sm font-medium text-white disabled:opacity-50"
                style={{ backgroundColor: brandColor }}
              >
                {searching ? 'Recherche...' : 'Rechercher'}
              </button>
            </form>
            {searchError && <p className="mt-3 text-sm text-red-600">{searchError}</p>}
          </div>
        )}

        {!selectedClient && activeTab === 'scan' && (
          <div className="flex flex-col items-center">
            <p className="mb-4 text-sm text-stone-500 text-center">Placez le QR code du client devant la caméra</p>
            <div className="w-full max-w-sm">
              <QrScannerComponent onScan={handleScan} />
            </div>
            {scannerError && <p className="mt-3 text-sm text-red-600">{scannerError}</p>}
            {searching && !scannerError && <p className="mt-3 text-sm text-stone-500">Vérification de la carte...</p>}
          </div>
        )}

        {clients.length > 0 && !selectedClient && activeTab === 'search' && (
          <div className="mt-6 space-y-2">
            <p className="text-sm text-stone-500 mb-2">Sélectionnez le client :</p>
            {clients.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedClient(c)}
                className="w-full text-left flex items-center justify-between rounded-lg bg-stone-50 px-4 py-3 hover:bg-stone-100 transition-colors border border-transparent hover:border-stone-200"
              >
                <div>
                  <p className="text-sm font-medium text-stone-900">{c.client.name}</p>
                  <p className="text-xs text-stone-500">{c.client.phone}</p>
                </div>
                <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: `${brandColor}1A`, color: brandColor }}>
                  {c.pointsBalance} pts
                </span>
              </button>
            ))}
          </div>
        )}

        {selectedClient && (
          <div className="flex items-center justify-between rounded-lg px-4 py-3 border" style={{ borderColor: brandColor, backgroundColor: `${brandColor}05` }}>
            <div>
              <p className="text-sm font-medium text-stone-900">{selectedClient.client.name}</p>
              <p className="text-xs text-stone-500">{selectedClient.client.phone}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: `${brandColor}1A`, color: brandColor }}>
                {selectedClient.pointsBalance} pts
              </span>
              <button 
                onClick={() => setSelectedClient(null)}
                className="text-xs text-stone-500 underline"
              >
                Changer
              </button>
            </div>
          </div>
        )}
      </div>

      {selectedClient && (
        <div className="rounded-2xl border border-stone-200 bg-white p-6">
          <h2 className="mb-4 font-[family-name:var(--font-display)] text-lg font-semibold text-stone-900">
            2. Montant de l'achat
          </h2>
          <form onSubmit={handleGenerate} className="flex gap-3">
            <input
              type="number"
              placeholder="Montant en FCFA"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              min={1}
              className="flex-1 rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900"
            />
            <button
              type="submit"
              disabled={crediting}
              className="rounded-full px-5 py-2 text-sm font-medium text-white disabled:opacity-50"
              style={{ backgroundColor: brandColor }}
            >
              {crediting ? 'Crédit...' : 'Créditer les points'}
            </button>
          </form>
          {creditError && <p className="mt-3 text-sm text-red-600">{creditError}</p>}
        </div>
      )}
    </div>
  )
}
