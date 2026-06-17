import { getRestaurant, getToken } from '@/lib/auth'
import { redirect } from 'next/navigation'
import SettingsForm from '@/components/SettingsForm'

export default async function SettingsPage() {
  const restaurant = await getRestaurant()
  if (!restaurant) redirect('/login')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-stone-900">
          Paramètres
        </h1>
        <p className="mt-1 text-sm text-stone-500">Personnalisez l'identité visuelle de votre restaurant</p>
      </div>

      <SettingsForm restaurant={restaurant} />
    </div>
  )
}
