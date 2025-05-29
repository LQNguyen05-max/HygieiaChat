import Link from "next/link";
import { Button } from "./ui/button";
import { useState, useEffect } from 'react';
import { auth } from '../lib/firebase';
import UserProfile from './UserProfile';

export function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);


  //Navbar styling
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-mint-700">HygieiaChat</span>
          </Link>

          {/* Middle Navigation - Chat, About, Contact */}
          <div className="hidden md:flex items-center space-x-8">
            {/* <Link href="/chat">
              <Button variant="ghost">Chat Now</Button>
            </Link> */}
            <Link 
              href="/chat" 
              className="text-gray-600 hover:text-mint-700 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-mint-700 after:transition-all after:duration-300 hover:after:w-full"
            >
              Chat
            </Link>

            <Link 
              href="/about" 
              className="text-gray-600 hover:text-mint-700 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-mint-700 after:transition-all after:duration-300 hover:after:w-full"
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-600 hover:text-mint-700 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-mint-700 after:transition-all after:duration-300 hover:after:w-full"
            >
              Contact
            </Link>
          </div>

          {/* Right side - Auth */}
          <div className="flex items-center space-x-4">
            {user ? (
              <UserProfile />
            ) : (
              <Link href="/login?mode=signin">
                <Button className="bg-mint-700 text-white hover:bg-mint-800">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
