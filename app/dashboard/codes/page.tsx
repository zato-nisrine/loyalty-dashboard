import { getRestaurant } from '@/lib/auth'
import { redirect } from 'next/navigation'
import CodeGenerator from '@/components/CodeGenerator'

export default async function CodesPage() {
  const commerce = await getRestaurant()
  if (!commerce) redirect('/login')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-[28px] sm:text-[32px] font-bold text-foreground tracking-tight">
          Crédit de points
        </h1>
        <p className="mt-1 text-sm text-text-muted">
          Créditez directement les points sur la carte LOYNIVA du client après son achat
        </p>
      </div>

      <CodeGenerator brandColor={commerce.brandColor || '#102A43'} />
    </div>
  )
}
