import { getRestaurant } from '@/lib/auth'
import { redirect } from 'next/navigation'
import SettingsForm from '@/components/SettingsForm'

export default async function SettingsPage() {
  const commerce = await getRestaurant()
  if (!commerce) redirect('/login')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-[28px] sm:text-[32px] font-bold text-foreground tracking-tight">
          Paramètres
        </h1>
        <p className="mt-1 text-sm text-text-muted">
          Personnalisez l'identité visuelle et le taux de conversion de votre commerce
        </p>
      </div>

      <SettingsForm commerce={commerce} />
    </div>
  )
}
