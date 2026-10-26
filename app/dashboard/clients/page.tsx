import { getRestaurant, getToken } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function ClientsPage() {
  const commerce = await getRestaurant()
  if (!commerce) redirect('/login')

  const token = await getToken()
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/restaurants/me/clients`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  })
  const cards = res.ok ? await res.json() : []

  const brandColor = commerce.brandColor || '#102A43'

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-[28px] sm:text-[32px] font-bold text-foreground tracking-tight">
          Clients
        </h1>
        <p className="mt-1 text-sm text-text-muted">
          Retrouvez ici la liste complète de vos membres et leurs soldes de fidélité.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border-subtle bg-surface shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-text-main">
            <thead className="border-b border-border-subtle bg-surface-muted text-xs font-semibold uppercase tracking-wider text-text-muted">
              <tr>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Date de naissance</th>
                <th className="px-6 py-4">Inscription</th>
                <th className="px-6 py-4 text-right">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {cards.map((card: any) => (
                <tr key={card.id} className="hover:bg-surface-muted/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-foreground">{card.client.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p>{card.client.phone || '-'}</p>
                    <p className="text-xs text-text-muted">{card.client.email || '-'}</p>
                  </td>
                  <td className="px-6 py-4 text-text-muted">
                    {card.client.birthDate ? new Date(card.client.birthDate).toLocaleDateString('fr-FR') : '-'}
                  </td>
                  <td className="px-6 py-4 text-text-muted">
                    {new Date(card.createdAt).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span 
                      className="inline-flex rounded-full px-3 py-1 font-display text-xs font-bold"
                      style={{ backgroundColor: `${brandColor}1A`, color: brandColor }}
                    >
                      {card.pointsBalance} pts
                    </span>
                  </td>
                </tr>
              ))}
              {cards.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-text-muted">
                    Aucun client inscrit pour le moment.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
