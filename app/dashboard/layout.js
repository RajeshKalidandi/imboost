import { ReactNode } from 'react'
import NavItems from './NavItems'
import { Separator } from '@/components/ui/separator'
import UserProfile from './UserProfile'

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md border-r">
        <div className="p-6 flex flex-col h-full">
          <div className="flex-1">
            <nav>
              <NavItems />
            </nav>
          </div>
          <div>
            <Separator className="my-6" />
            <UserProfile />
          </div>
        </div>
      </aside>
      <main className="flex-1 p-10 overflow-auto">
        {children}
      </main>
    </div>
  )
}