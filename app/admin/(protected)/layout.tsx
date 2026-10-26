import { checkAdminAuth } from '@/lib/admin-auth'
import { redirect } from 'next/navigation'
import AdminLogoutButton from '@/components/AdminLogoutButton'
import AdminMobileNav from '@/components/AdminMobileNav'
import LoynivaLogo from '@/components/LoynivaLogo'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const isAdmin = await checkAdminAuth()
  if (!isAdmin) redirect('/admin')

  return (
    <div className="min-h-screen bg-[#F5F8FC] dark:bg-[#091420] lg:grid lg:grid-cols-[240px_1fr]">
      <AdminMobileNav />

      <aside className="hidden border-r border-[#D8E0E8] bg-surface px-5 py-7 lg:flex lg:flex-col lg:gap-1 dark:border-white/10 dark:bg-[#102A43]">
        <div className="mb-8">
          <LoynivaLogo size="sm" showTagline={false} />
          <p className="mt-2 text-xs font-semibold text-[#5B7286] dark:text-[#8FA6BA] uppercase tracking-wider">
            Administration centrale
          </p>
        </div>

        <nav className="space-y-1">
          <a
            href="/admin/dashboard"
            className="flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-[#243746] hover:bg-[#F5F8FC] hover:text-[#102A43] dark:text-[#D8E0E8] dark:hover:bg-white/10"
          >
            Vue globale
          </a>
          <a
            href="/admin/restaurants"
            className="flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-[#243746] hover:bg-[#F5F8FC] hover:text-[#102A43] dark:text-[#D8E0E8] dark:hover:bg-white/10"
          >
            Commerces
          </a>
        </nav>

        <div className="mt-auto pt-6 border-t border-[#D8E0E8] dark:border-white/10">
          <AdminLogoutButton />
        </div>
      </aside>

      <div className="p-4 sm:p-6 lg:p-10">
        <div className="mx-auto max-w-5xl">{children}</div>
      </div>
    </div>
  )
}
