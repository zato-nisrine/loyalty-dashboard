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

  const brandColor = commerce.brandColor || '#C2410C'

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-stone-900">
          Clients
        </h1>
        <p className="mt-1 text-sm text-stone-500">
          Retrouvez ici la liste complète de vos clients et leurs informations.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-stone-600">
            <thead className="bg-stone-50 text-xs font-semibold uppercase tracking-wider text-stone-500">
              <tr>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Date de naissance</th>
                <th className="px-6 py-4">Inscription</th>
                <th className="px-6 py-4 text-right">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {cards.map((card: any) => (
                <tr key={card.id} className="hover:bg-stone-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-stone-900">{card.client.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p>{card.client.phone || '-'}</p>
                    <p className="text-xs text-stone-400">{card.client.email || '-'}</p>
                  </td>
                  <td className="px-6 py-4">
                    {card.client.birthDate ? new Date(card.client.birthDate).toLocaleDateString('fr-FR') : '-'}
                  </td>
                  <td className="px-6 py-4 text-stone-500">
                    {new Date(card.createdAt).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span 
                      className="inline-flex rounded-full px-3 py-1 text-xs font-semibold"
                      style={{ backgroundColor: `${brandColor}1A`, color: brandColor }}
                    >
                      {card.pointsBalance} pts
                    </span>
                  </td>
                </tr>
              ))}
              {cards.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-stone-500">
                    Aucun client pour le moment.
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
