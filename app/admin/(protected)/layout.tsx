import { checkAdminAuth } from '@/lib/admin-auth'
import { redirect } from 'next/navigation'
import AdminLogoutButton from '@/components/AdminLogoutButton'
import AdminMobileNav from '@/components/AdminMobileNav'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const isAdmin = await checkAdminAuth()
  if (!isAdmin) redirect('/admin')

  return (
    <div className="min-h-screen bg-[#FAF7F2] lg:grid lg:grid-cols-[220px_1fr]">
      <AdminMobileNav />

      <aside className="hidden border-r border-stone-200 bg-white px-5 py-7 lg:flex lg:flex-col lg:gap-1">
        <p className="mb-8 font-[family-name:var(--font-display)] text-lg font-semibold text-stone-900">
          Admin Fidèle
        </p>
        <a href="/admin/dashboard" className="rounded-lg px-3 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50">
          Vue globale
        </a>
        <a href="/admin/commerces" className="rounded-lg px-3 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50">
          commerces
        </a>
        <div className="mt-auto pt-6">
          <AdminLogoutButton />
        </div>
      </aside>

      <div className="p-4 sm:p-6 lg:p-10">
        <div className="mx-auto max-w-5xl">{children}</div>
      </div>
    </div>
  )
}
