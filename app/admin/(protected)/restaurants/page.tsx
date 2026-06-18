import { checkAdminAuth, getAdminSecret } from '@/lib/admin-auth'
import { redirect } from 'next/navigation'
import AdminRestaurantsList from '@/components/AdminRestaurantsList'

export default async function AdminRestaurantsPage() {
  const isAdmin = await checkAdminAuth()
  if (!isAdmin) redirect('/admin')

  const secret = await getAdminSecret()

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/restaurants`, {
    headers: { 'x-admin-secret': secret! },
    cache: 'no-store',
  })
  const restaurants = res.ok ? await res.json() : []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-stone-900">
          Restaurants
        </h1>
        <p className="mt-1 text-sm text-stone-500">{restaurants.length} restaurant(s) inscrit(s)</p>
      </div>

      <AdminRestaurantsList initialRestaurants={restaurants} />
    </div>
  )
}
