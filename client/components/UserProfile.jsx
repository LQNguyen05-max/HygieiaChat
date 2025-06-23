import { useState, useRef, useEffect } from "react";
import { CircleUser, Settings } from "lucide-react";
import { auth, getUserProfile, updateUserProfile } from "../lib/firebase";
import { useRouter } from "next/router";
// import Link from "next/link";
import { toast } from "react-hot-toast";

export default function UserProfile() {
  const [showProfile, setShowProfile] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [modalContent, setModalContent] = useState(null); // State to track modal content
  const [isModalOpen, setIsModalOpen] = useState(false); // State to track modal visibility
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
          console.error("Error loading user profile:", error);
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

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //Sign Out Function
  const handleLogout = async () => {
    try {
      await auth.signOut(); // Firebase sign-out
      localStorage.removeItem("jwtToken"); // Remove token from localStorage
      localStorage.removeItem("googleIdToken"); // Remove Google ID token from localStorage
      localStorage.removeItem("subscription");
      console.log("Removed Token from Local Storage");
      router.push("/login"); // Redirect to login page
      toast.success("Signed out successfully!");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out");
    }
  };

  // Modal Account Settings
  const closeModal = () => {
    setModalContent(null);
    setIsModalOpen(false);
  };

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const handleAccountSettingsUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedProfile = {
      firstName: formData.get("firstName")?.trim(),
      lastName: formData.get("lastName")?.trim(),
    };
    console.log("First Name:", userProfile?.firstName);
    console.log("Last Name:", userProfile?.lastName);

    try {
      // Update the profile in Firestore
      await updateUserProfile(auth.currentUser.uid, updatedProfile);
      // Reload the updated profile from Firestore
      const profile = await getUserProfile(auth.currentUser.uid);
      // console.log("Updated Profile:", profile);
      setUserProfile(profile); // Update the local state with the latest profile
      toast.success("Account settings updated successfully");
      closeModal();
    } catch (error) {
      console.error("Error updating account settings:", error);
      toast.error("Failed to update account settings");
    }
  };

  // User Profile Component
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
          transform: showProfile ? "translateY(0)" : "translateY(-10px)",
          transition: "all 0.2s ease-out",
          pointerEvents: showProfile ? "auto" : "none",
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
            <p className="text-sm font-medium text-gray-900">
              {auth.currentUser?.email}
            </p>
          )}
        </div>
        <div>
          <button
            onClick={() => openModal("accountSettings")}
            type="button"
            className="account-settings flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors"
          >
            <Settings size={20} />
            <span className="text-sm font-medium text-gray-900">
              Account Settings
            </span>
          </button>
          {isModalOpen && modalContent === "accountSettings" && (
            <div className="account-settings-popup">
              <div className="account-settings-popup-header">
                Account Settings
              </div>
              <form onSubmit={handleAccountSettingsUpdate}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    defaultValue={userProfile?.firstName || ""}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    defaultValue={userProfile?.lastName || ""}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={auth.currentUser?.email || ""}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    disabled
                  />
                </div>
                <div className="account-settings-popup-buttons">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="account-settings-popup-button cancel"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="account-settings-popup-button save"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="flex items-left justify-left block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
