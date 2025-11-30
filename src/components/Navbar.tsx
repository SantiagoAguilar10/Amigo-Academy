'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { BookOpen, Menu, X } from 'lucide-react';

export default function Navbar() {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen size={32} />
            <span className="text-2xl font-bold">AmigoAcademy</span>
          </Link>
          
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:text-blue-200 transition">
              Home
            </Link>
            <Link href="/courses" className="hover:text-blue-200 transition">
              All Courses
            </Link>
            <Link href="/team" className="hover:text-blue-200 transition">
              Team
            </Link>
            <Link href="/contact" className="hover:text-blue-200 transition">
              Contact Us
            </Link>
            
            {session ? (
              <>
                <Link 
                  href="/dashboard" 
                  className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut()}
                  className="hover:text-blue-200 transition"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <button
                onClick={() => signIn('google')}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Login with Google
              </button>
            )}
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link 
              href="/" 
              className="block py-2 hover:bg-blue-700 px-2 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/courses" 
              className="block py-2 hover:bg-blue-700 px-2 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              All Courses
            </Link>
            <Link 
              href="/team" 
              className="block py-2 hover:bg-blue-700 px-2 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              Team
            </Link>
            <Link 
              href="/contact" 
              className="block py-2 hover:bg-blue-700 px-2 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Us
            </Link>
            {session && (
              <Link 
                href="/dashboard" 
                className="block py-2 hover:bg-blue-700 px-2 rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}