'use client'

import { useSession, signOut } from 'next-auth/react'

export default function UserProfile() {
  const { data: session } = useSession()

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' })
  }

  if (!session) {
    return null
  }

  return (
    <>
      <div className="flex items-center space-x-2 mb-4">
        <img
          src={session.user.image || '/default-avatar.png'}
          alt="User avatar"
          className="w-8 h-8 rounded-full"
        />
        <span className="text-sm font-medium">{session.user.name}</span>
      </div>
      <button
        onClick={handleLogout}
        className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
      >
        Logout
      </button>
    </>
  )
}