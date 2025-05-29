import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { signInWithEmail, signUpWithEmail, signInWithGoogle, db } from "../lib/firebase";
import { useRouter } from "next/router";
import toast from 'react-hot-toast';
import { getUserProfile } from "../lib/firebase";
import { collection, getDocs } from 'firebase/firestore';

export default function LoginPage() {
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Set initial mode from query parameter
    if (router.query.mode === 'signup') {
      setMode('signup');
    }
  }, [router.query]);

  useEffect(() => {
    // Debug: Check if environment variables are loaded
    console.log('Environment Variables in Login Page:', {
      NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? 'Present' : 'Missing',
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? 'Present' : 'Missing',
      NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? 'Present' : 'Missing',
    });
  }, []);

  useEffect(() => {
    // Test Firestore connection
    const testFirestore = async () => {
      try {
        console.log('Testing Firestore connection...');
        const querySnapshot = await getDocs(collection(db, 'users'));
        console.log('Firestore connection successful!');
        console.log('Number of users in database:', querySnapshot.size);
      } catch (error) {
        console.error('Firestore connection test failed:', error);
      }
    };

    testFirestore();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    console.log('Starting sign in process...');

    try {
      if (mode === "signin") {
        console.log('Attempting email/password sign in...');
        const user = await signInWithEmail(email, password);
        console.log('Sign in successful, getting user profile...');
        const profile = await getUserProfile(user.uid);
        console.log('User profile retrieved:', profile);
        
        // Show toast and wait a moment before navigation
        toast.success(`Welcome, ${profile?.firstName || 'there'}!`);
        console.log('Toast shown, waiting before navigation...');
        
        // Add a small delay to ensure toast is visible
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        console.log('Navigating to home page...');
        await router.push("/");
        console.log('Navigation complete');
      } else {
        if (!firstName || !lastName) {
          throw new Error('First name and last name are required');
        }
        console.log('Attempting email/password sign up...');
        const user = await signUpWithEmail(email, password, firstName, lastName);
        console.log('Sign up successful');
        
        toast.success(`Welcome, ${firstName}!`);
        console.log('Toast shown, waiting before navigation...');
        
        // Add a small delay to ensure toast is visible
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        console.log('Navigating to home page...');
        await router.push("/");
        console.log('Navigation complete');
      }
    } catch (error) {
      console.error('Authentication error:', {
        code: error.code,
        message: error.message,
        fullError: error
      });
      setError(error.message);
      toast.error(error.message);
    } finally {
      console.log('Setting loading to false');
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);

    try {
      console.log('Starting Google sign in...');
      const result = await signInWithGoogle();
      const profile = await getUserProfile(result.uid);
      console.log('Google sign in successful:', result);
      toast.success(`Welcome, ${profile?.firstName || 'there'}!`);
      await router.push("/dashboard"); // Wait for navigation to complete
    } catch (error) {
      console.error('Google sign in error:', error);
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {/* Optional: background blur or color blobs */}
      <div className="absolute -top-40 -z-10 h-[500px] w-[500px] rounded-full bg-blue-100 blur-[100px]" />
      <div className="absolute -bottom-40 right-0 -z-10 h-[400px] w-[400px] rounded-full bg-green-100 blur-[100px]" />

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-8 py-10 flex flex-col justify-start" style={{ width: 600, maxWidth: '90vw', minHeight: 500 }}>
        <div className="flex-1 flex flex-col">
          <div className="flex flex-col items-center mb-4">
            <h2 className="text-2xl font-bold text-center mb-1">
              {mode === "signin" ? "Welcome back" : "Create your account"}
            </h2>
            <p className="text-center text-gray-500 text-sm">
              Enter your credentials to {mode === "signin" ? "sign in" : "sign up"}
            </p>
          </div>


          {/* Tabs */}
          <div className="flex mb-8 gap-2">
            <button
              className={`flex-1 py-2 rounded-lg font-medium text-base transition-all duration-300 relative overflow-hidden
                ${mode === "signin"
                  ? "bg-gray-100 text-blue-600 border-b-2 border-blue-400 ring-2 ring-blue-200"
                  : "bg-white text-gray-500 hover:bg-gray-100"}
              `}
              onClick={() => setMode("signin")}
            >
              <span className="relative z-10">Sign In</span>
            </button>
            <button
              className={`flex-1 py-2 rounded-lg font-medium text-base transition-all duration-300 relative overflow-hidden
                ${mode === "signup"
                  ? "bg-gray-100 text-blue-600 border-b-2 border-blue-400 ring-2 ring-blue-200"
                  : "bg-white text-gray-500 hover:bg-gray-100"}
              `}
              onClick={() => setMode("signup")}
            >
              <span className="relative z-10">Sign Up</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="space-y-8 mb-8">
              {mode === "signup" && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-2 rounded">
                    <label className="block mb-1 text-sm font-medium" htmlFor="firstName">First Name</label>
                    <input
                      id="firstName"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="John"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                      required={mode === "signup"}
                    />
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <label className="block mb-1 text-sm font-medium" htmlFor="lastName">Last Name</label>
                    <input
                      id="lastName"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Doe"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                      required={mode === "signup"}
                    />
                  </div>
                </div>
              )}
              <div className="bg-gray-50 p-2 rounded">
                <label className="block mb-1 text-sm font-medium" htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  required
                />
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="password" className="text-sm font-medium">Password</label>
                  {/* {mode === "signin" && (
                    <a href="#" className="text-blue-500 text-xs hover:underline">Forgot?</a>
                  )} */}
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-mint-700 hover:bg-mint-800 text-white font-semibold py-2.5 rounded-lg transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {loading ? "Loading..." : mode === "signin" ? "Sign In" : "Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center mb-1">
            <div className="flex-grow h-px bg-gray-200" />
            <span className="mx-3 text-gray-400 text-xs">OR CONTINUE WITH</span>
            <div className="flex-grow h-px bg-gray-200" />
          </div>

          {/* Google Sign In */}
          <button 
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-medium py-2.5 rounded-lg text-base transition-colors duration-150 mt-6 mb-8 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FcGoogle className="w-5 h-5" /> Sign in with Google
          </button>
        </div>

        {/* Switch link */}
        <p className="mt-1 mb-6 text-center text-gray-500 text-sm">
          {mode === "signin"
            ? "Don't have an account? "
            : "Already have an account? "}
          <button
            type="button"
            className="text-blue-500 hover:underline font-medium"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          >
            {mode === "signin" ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
} 