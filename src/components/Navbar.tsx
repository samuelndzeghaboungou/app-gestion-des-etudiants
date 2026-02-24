'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { FiLogOut, FiMenu } from 'react-icons/fi';
import { useState } from 'react';

export default function Navbar() {
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📚</span>
            <span className="text-white font-bold text-lg hidden sm:inline">Student Management</span>
          </Link>
          
          <div className="flex items-center gap-4">
            {session ? (
              <>
                <div className="hidden sm:flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {session.user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="hidden md:block">
                    <p className="text-white text-sm font-medium">{session.user?.name}</p>
                    <p className="text-blue-100 text-xs">{session.user?.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: '/login' })}
                  className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 font-semibold transition transform hover:scale-105"
                >
                  <FiLogOut size={18} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <div className="flex gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-white font-semibold hover:bg-white hover:bg-opacity-10 rounded-lg transition"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 font-semibold transition transform hover:scale-105"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
