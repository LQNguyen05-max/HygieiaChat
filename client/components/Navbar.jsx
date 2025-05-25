import Link from 'next/link';
import { Button } from './ui/button';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-mint-700">HygieiaChat</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link href="/chat">
              <Button variant="ghost">Chat</Button>
            </Link>
            <Link href="/login">
              <Button>Sign In</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 