'use client'

import { useState, useEffect } from 'react'

export default function CodeGenerator({ brandColor }: { brandColor: string }) {
  const [activeTab, setActiveTab] = useState<'search' | 'scan'>('search')
  const [pseudo, setPseudo] = useState('')
  const [clients, setClients] = useState<any[]>([])
  const [selectedClient, setSelectedClient] = useState<any>(null)
  const [searchError, setSearchError] = useState('')
  const [searching, setSearching] = useState(false)
  const [scannerError, setScannerError] = useState('')

  const [amount, setAmount] = useState('')
  const [generating, setGenerating] = useState(false)
  const [code, setCode] = useState<any>(null)
  const [codeError, setCodeError] = useState('')
  const [secondsLeft, setSecondsLeft] = useState(0)

  useEffect(() => {
    if (!code) return
    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.floor((new Date(code.expiresAt).getTime() - Date.now()) / 1000))
      setSecondsLeft(remaining)
      if (remaining === 0) clearInterval(interval)
    }, 1000)
    return () => clearInterval(interval)
  }, [code])

  useEffect(() => {
    let scanner: any;
    if (activeTab === 'scan' && !selectedClient) {
      import('html5-qrcode').then(({ Html5QrcodeScanner }) => {
        scanner = new Html5QrcodeScanner('qr-reader', { fps: 5, qrbox: { width: 250, height: 250 } }, false)
        scanner.render(
          async (decodedText: string) => {
            scanner.pause(true)
            setScannerError('')
            setSearching(true)
            try {
              const res = await fetch(`/api/loyalty-cards/search-by-id?cardId=${encodeURIComponent(decodedText)}`)
              if (!res.ok) {
                const data = await res.json()
                setScannerError(data.message || 'Carte invalide')
                scanner.resume()
              } else {
                const data = await res.json()
                setClients(data)
                setSelectedClient(data[0])
                scanner.clear()
              }
            } catch (e) {
              setScannerError('Erreur de réseau')
              scanner.resume()
            } finally {
              setSearching(false)
            }
          },
          () => {}
        )
      })
    }

    return () => {
      if (scanner) {
        scanner.clear().catch(console.error)
      }
    }
  }, [activeTab, selectedClient])

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setSearchError('')
    setClients([])
    setSelectedClient(null)
    setCode(null)
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
    setCodeError('')
    setGenerating(true)

    const res = await fetch('/api/validation-codes/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ loyaltyCardId: selectedClient.id, amountFcfa: Number(amount) }),
    })

    setGenerating(false)

    if (!res.ok) {
      const data = await res.json()
      setCodeError(data.message || 'Erreur lors de la génération du code')
      return
    }

    setCode(await res.json())
  }

  function reset() {
    setPseudo('')
    setClients([])
    setSelectedClient(null)
    setAmount('')
    setCode(null)
    setSearchError('')
    setScannerError('')
    setCodeError('')
  }

  if (code) {
    const minutes = Math.floor(secondsLeft / 60)
    const seconds = secondsLeft % 60

    return (
      <div className="rounded-2xl border border-stone-200 bg-white p-8 text-center">
        <p className="text-sm text-stone-500">Code à donner à {selectedClient.client.name}</p>
        <p
          className="my-6 font-[family-name:var(--font-display)] text-5xl font-bold tracking-widest"
          style={{ color: brandColor }}
        >
          {code.code}
        </p>
        <p className="text-sm text-stone-600">
          Montant : <span className="font-medium text-stone-900">{code.amountFcfa.toLocaleString()} FCFA</span>
        </p>
        <p className="text-sm text-stone-600">
          Points à créditer : <span className="font-medium text-stone-900">{code.pointsToCredit} pts</span>
        </p>

        <div className="mt-6">
          {secondsLeft > 0 ? (
            <p className="text-sm font-medium text-stone-500">
              Expire dans {minutes}:{seconds.toString().padStart(2, '0')}
            </p>
          ) : (
            <p className="text-sm font-medium text-red-600">Ce code a expiré</p>
          )}
        </div>

        <button
          onClick={reset}
          className="mt-6 rounded-full border border-stone-300 px-6 py-2 text-sm font-medium text-stone-700 hover:border-stone-400"
        >
          Générer un nouveau code
        </button>
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
            <p className="mb-3 text-sm text-stone-500 text-center">Placez le QR code du client devant la caméra</p>
            <div id="qr-reader" className="w-full max-w-sm overflow-hidden rounded-xl border border-stone-200 bg-stone-50"></div>
            {scannerError && <p className="mt-3 text-sm text-red-600">{scannerError}</p>}
            {searching && <p className="mt-3 text-sm text-stone-500">Vérification de la carte...</p>}
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
              disabled={generating}
              className="rounded-full px-5 py-2 text-sm font-medium text-white disabled:opacity-50"
              style={{ backgroundColor: brandColor }}
            >
              {generating ? 'Génération...' : 'Générer le code'}
            </button>
          </form>
          {codeError && <p className="mt-3 text-sm text-red-600">{codeError}</p>}
        </div>
      )}
    </div>
  )
}
