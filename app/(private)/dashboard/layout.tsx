
import { Sidebar } from "@/components/sidebar/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900 text-white">
        <Sidebar />
      </aside>

      {/* Conteúdo */}
      <main className="flex-1 p-6 bg-zinc-100">
        {children}
      </main>

    </div>
  )
}
