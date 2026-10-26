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
      <div className="mb-6 rounded-2xl border border-[#C43D4D]/20 bg-[#C43D4D]/10 px-5 py-4 text-sm text-[#C43D4D]">
        <p className="font-semibold">Votre période d'essai est terminée</p>
        <p className="mt-1 text-xs opacity-90">
          La génération de codes et la confirmation de récompenses sont désactivées. Contactez l'équipe LOYNIVA pour activer
          votre abonnement.
        </p>
      </div>
    )
  }

  if (subscriptionStatus === 'trial' && daysLeft <= 3 && daysLeft >= 0) {
    return (
      <div className="mb-6 rounded-2xl border border-[#B96A13]/25 bg-[#B96A13]/10 px-5 py-4 text-sm text-[#B96A13]">
        <p className="font-semibold">
          Votre essai gratuit LOYNIVA se termine dans {daysLeft} jour{daysLeft > 1 ? 's' : ''}
        </p>
        <p className="mt-1 text-xs opacity-90">
          Choisissez votre plan dès maintenant pour continuer à fidéliser vos clients sans interruption.
        </p>
      </div>
    )
  }

  return null
}
