import { useState, useRef, useEffect } from "react";
import { CircleUser, Settings } from "lucide-react";
import { auth, getUserProfile } from '../lib/firebase';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

export default function UserProfile() {
  const [showProfile, setShowProfile] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const dropdownRef = useRef(null);
  const router = useRouter();

  //Loads the user profile from firebase
  useEffect(() => {
    async function loadUserProfile() {
      if (auth.currentUser) {
        try {
          const profile = await getUserProfile(auth.currentUser.uid);
          setUserProfile(profile);
        } catch (error) {
          console.error('Error loading user profile:', error);
        }
      }
    }
    loadUserProfile();
  }, []);

  //Closes profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  //Sign Out Function
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      toast.success("Signed out successfully");
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out");
    }
  };

  //User Profile Component
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setShowProfile(!showProfile)}
        className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
        title="User Profile"
      >
        <CircleUser size={30} className="text-gray-700" />
      </button>

      <div 
        style={{
          opacity: showProfile ? 1 : 0,
          transform: showProfile ? 'translateY(0)' : 'translateY(-10px)',
          transition: 'all 0.2s ease-out',
          pointerEvents: showProfile ? 'auto' : 'none'
        }}
        className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
      >
        <div className="px-4 py-2 border-b border-gray-100">
          {userProfile ? (
            <>
              <p className="text-sm font-medium text-gray-900">
                {userProfile.firstName} {userProfile.lastName}
              </p>
              <p className="text-xs text-gray-500">{auth.currentUser?.email}</p>
            </>
          ) : (
            <p className="text-sm font-medium text-gray-900">{auth.currentUser?.email}</p>
          )}
        </div>
        
        <Link 
          href="/account"
          className="flex items-left justify-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          onClick={() => setShowProfile(false)}
        >
          <Settings size={16} className="mr-2" />
          Settings
        </Link>
        
        <button
          onClick={handleSignOut}
          className="flex items-left justify-left block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
