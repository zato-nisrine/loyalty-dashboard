import { getRestaurant } from '@/lib/auth'
import { redirect } from 'next/navigation'
import CodeGenerator from '@/components/CodeGenerator'

export default async function CodesPage() {
  const commerce = await getRestaurant()
  if (!commerce) redirect('/login')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-stone-900">
          Code de validation
        </h1>
        <p className="mt-1 text-sm text-stone-500">Générez un code à donner au client après son achat</p>
      </div>

      <CodeGenerator brandColor={commerce.brandColor} />
    </div>
  )
}
