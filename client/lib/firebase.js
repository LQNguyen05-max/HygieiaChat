import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";



// Firebase config from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Debug: Log the actual config being used
if (typeof window !== "undefined") {
  console.log("Firebase Config being used:", {
    apiKey: firebaseConfig.apiKey,
    authDomain: firebaseConfig.authDomain,
    projectId: firebaseConfig.projectId,
  });
}

// Initialize Firebase safely
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Function to get user-friendly error messages
const getFriendlyErrorMessage = (error) => {
  switch (error.code) {
    case "auth/invalid-email":
      return "Invalid email address";
    case "auth/user-disabled":
      return "This account has been disabled";
    case "auth/user-not-found":
    case "auth/wrong-password":
      return "Invalid email or password";
    case "auth/email-already-in-use":
      return "This email is already registered";
    case "auth/account-exists-with-different-credential":
      return "An account with this email already exists. Please sign in with your email and password instead.";
    case "auth/weak-password":
      return "Password should be at least 6 characters";
    case "auth/operation-not-allowed":
      return "This operation is not allowed";
    case "auth/network-request-failed":
      return "Network error. Please check your connection";
    case "auth/too-many-requests":
      return "Too many attempts. Please try again later";
    case "auth/popup-closed-by-user":
      return "Sign in was cancelled";
    case "auth/cancelled-popup-request":
      return "Sign in was cancelled";
    case "auth/popup-blocked":
      return "Pop-up was blocked. Please allow pop-ups for this site";
    default:
      return "An error occurred. Please try again";
  }
};

// Email/Password Sign In
export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Sign in error:", {
      code: error.code,
      message: error.message,
    });
    throw new Error(getFriendlyErrorMessage(error));
  }
};

// Email/Password Sign Up (with displayName support)
export const signUpWithEmail = async (email, password, firstName, lastName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (userCredential.user) {
      await updateProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}`,
      });
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email,
        firstName,
        lastName,
        subscription: "Free",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      const token = await userCredential.user.getIdToken();
      localStorage.setItem("jwtToken", token);
    }
    return userCredential.user;
  } catch (error) {
    console.error("Sign up error:", {
      code: error.code,
      message: error.message,
    });
    throw new Error(getFriendlyErrorMessage(error));
  }
};

// Google Sign In
// Note: Firebase automatically prevents users from creating a Google account 
// with an email that's already registered with email/password authentication.
// When this happens, Firebase throws 'auth/account-exists-with-different-credential' error.
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);

    // Check if user profile exists, if not create it
    const userProfile = await getUserProfile(result.user.uid);
    if (!userProfile) {
      const nameParts = result.user.displayName?.split(" ") || ["", ""];
      await createUserProfile(result.user.uid, {
        email: result.user.email,
        firstName: nameParts[0],
        lastName: nameParts.slice(1).join(" "),
        createdAt: new Date().toISOString(),
      });
    }

    return result.user;
  } catch (error) {
    console.error("Google sign in error:", {
      code: error.code,
      message: error.message,
    });
    
    // Handle specific error for existing email/password account
    if (error.code === 'auth/account-exists-with-different-credential') {
      throw new Error("An account with this email already exists. Please sign in with your email and password instead.");
    }
    
    // Handle other common errors
    if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') {
      throw new Error("Sign in was cancelled");
    }
    
    throw new Error(getFriendlyErrorMessage(error));
  }
};

// Google Login - Returns ID token for backend authentication
// Note: Firebase automatically prevents users from creating a Google account 
// with an email that's already registered with email/password authentication.
export const googleLogIn = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider); // Use the exported `auth`
    const idToken = await result.user.getIdToken(); // Retrieve Google ID token
    return idToken;
  } catch (error) {
    console.error("Google Login Error:", error);
    
    // Handle specific error for existing email/password account
    if (error.code === 'auth/account-exists-with-different-credential') {
      throw new Error("An account with this email already exists. Please sign in with your email and password instead.");
    }
    
    // Handle other common errors
    if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') {
      throw new Error("Sign in was cancelled");
    }
    
    throw new Error(getFriendlyErrorMessage(error));
  }
};

// Create user profile in Firestore
export const createUserProfile = async (userId, profile) => {
  try {
    await setDoc(doc(db, "users", userId), profile);
  } catch (error) {
    console.error("Error creating user profile:", error);
  }
};

// Get user profile from Firestore
export const getUserProfile = async (userId) => {
  // console.log("Getting user profile for:", userId);
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    const profile = userDoc.exists() ? userDoc.data() : null;
    if (profile) {
      if (!profile.subscription) {
        await updateUserProfile(userId, { subscription: "Free" });
        profile.subscription = "Free";
      }
      localStorage.setItem("subscription", profile.subscription);
    }

    return profile;
  } catch (error) {
    console.error("Error getting user profile:", error);
    return null;
  }
};

// Update user profile in Firestore
export const updateUserProfile = async (uid, profileData) => {
  // console.log("Updating user profile with data:", uid, profileData);
  try {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, profileData);
    // console.log("Profile updated in firestone:", profileData);
    return true;
  } catch (error) {
    // console.error("Error updating user profile:", error);
    throw new Error(getFriendlyErrorMessage(error));
  }
};

// Update user subscription
export const updateSubscriptionStatus = async (uid, newStatus) => {
  try {
    await updateDoc(doc(db, "users", uid), {
      subscription: newStatus,
      updatedAt: new Date().toISOString(),
    });
    // Sync it to localStorage
    localStorage.setItem("subscription", newStatus);
    console.log(`Updated subscription to "${newStatus}" for user ${uid}`);
    return true;
  } catch (error) {
    console.error("Error updating subscription:", error);
    return false;
  }
};

// Check if email is already registered with email/password
export const checkEmailExists = async (email) => {
  try {
    // Try to fetch sign-in methods for the email
    const methods = await fetchSignInMethodsForEmail(auth, email);
    return methods.length > 0;
  } catch (error) {
    console.error("Error checking email existence:", error);
    return false;
  }
};

// Get available sign-in methods for an email
export const getSignInMethods = async (email) => {
  try {
    const methods = await fetchSignInMethodsForEmail(auth, email);
    return methods;
  } catch (error) {
    console.error("Error getting sign-in methods:", error);
    return [];
  }
};

// Check if user should use email/password sign-in instead of Google
export const shouldUseEmailPassword = async (email) => {
  try {
    const methods = await fetchSignInMethodsForEmail(auth, email);
    // If the email has password authentication but not Google, suggest email/password
    return methods.includes('password') && !methods.includes('google.com');
  } catch (error) {
    console.error("Error checking sign-in methods:", error);
    return false;
  }
};

export { app, auth, db, googleProvider };
