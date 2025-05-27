import { useState } from "react";
import { CircleUser } from "lucide-react";
import { auth } from '../lib/firebase';
import { useRouter } from 'next/router';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function UserProfile() {
  const [showProfile, setShowProfile] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      toast.success('Signed out successfully');
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out');
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowProfile(!showProfile)}
        className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
        title="User Profile"
      >
        <CircleUser size={30} className="text-gray-700" />
      </button>

      {showProfile && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">{auth.currentUser?.email}</p>
          </div>
          
          <Link 
            href="/account"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setShowProfile(false)}
          >
            Account Settings
          </Link>
          
          <button
            onClick={handleSignOut}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}