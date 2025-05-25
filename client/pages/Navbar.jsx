'use client';

import Link from "next/link";
import Image from "next/image";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';

export default function Navbar() {
  const [user] = useAuthState(auth);

  return (
    <nav className="bg-white/90 backdrop-blur-sm border-b border-gray-200/50 shadow-[0_1px_3px_0_rgba(0,0,0,0.05)] sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-2xl font-bold text-mint-700 transition-all duration-300 hover:scale-105 hover:text-mint-300"
          >
            <Image
              src="/images/logo.png"
              alt="HygieiaChat Logo"
              width={32}
              height={32}
              className="w-8 h-8"
              priority
            />
            HygieiaChat
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link 
              href="/services" 
              className="text-gray-600 hover:text-mint-700 transition-all duration-300 hover:scale-105 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-mint-700 after:transition-all after:duration-300 hover:after:w-full"
            >
              Try HygieiaChat
            </Link>
            <Link 
              href="/doctors" 
              className="text-gray-600 hover:text-mint-700 transition-all duration-300 hover:scale-105 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-mint-700 after:transition-all after:duration-300 hover:after:w-full"
            >
              About Us
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-600 hover:text-mint-700 transition-all duration-300 hover:scale-105 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-mint-700 after:transition-all after:duration-300 hover:after:w-full"
            >
              Contact
            </Link>
            {user && (
              <Link 
                href="/account" 
                className="text-gray-600 hover:text-mint-700 transition-all duration-300 hover:scale-105 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-mint-700 after:transition-all after:duration-300 hover:after:w-full"
              >
                Account Settings
              </Link>
            )}
          </div>
          {user ? (
            <button
              onClick={() => auth.signOut()}
              className="bg-mint-200 text-gray-900 px-4 py-2 rounded-full hover:bg-mint-700 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="bg-mint-200 text-gray-900 px-4 py-2 rounded-full hover:bg-mint-700 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
} 