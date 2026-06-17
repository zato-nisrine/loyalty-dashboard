export default function SubscriptionBanner({
  subscriptionStatus,
  subscriptionExpiresAt,
}: {
  subscriptionStatus: string
  subscriptionExpiresAt: string
}) {
  const expiresDate = new Date(subscriptionExpiresAt)
  const now = new Date()
  const isExpired = subscriptionStatus === 'expired' || (subscriptionStatus === 'trial' && expiresDate < now)
  const daysLeft = Math.ceil((expiresDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

  if (isExpired) {
    return (
      <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">
        <p className="font-medium">Votre période d'essai est terminée</p>
        <p className="mt-0.5">
          La génération de codes et la confirmation de récompenses sont désactivées. Contactez-nous pour activer
          votre abonnement.
        </p>
      </div>
    )
  }

  if (subscriptionStatus === 'trial' && daysLeft <= 3 && daysLeft >= 0) {
    return (
      <div className="mb-4 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
        <p className="font-medium">
          Votre essai gratuit se termine dans {daysLeft} jour{daysLeft > 1 ? 's' : ''}
        </p>
        <p className="mt-0.5">Contactez-nous pour choisir votre abonnement et continuer sans interruption.</p>
      </div>
    )
  }

  return null
}
