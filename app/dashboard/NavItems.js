'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/dashboard/content', label: 'Content Generator' },
  { href: '/dashboard/scheduler', label: 'Post Scheduler' },
  { href: '/dashboard/analytics', label: 'Analytics' },
]

export default function NavItems() {
  const pathname = usePathname()

  return (
    <>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`block py-2 px-4 text-gray-700 hover:bg-gray-200 ${
            pathname === item.href ? 'bg-gray-200 font-semibold' : ''
          }`}
        >
          {item.label}
        </Link>
      ))}
    </>
  )
}