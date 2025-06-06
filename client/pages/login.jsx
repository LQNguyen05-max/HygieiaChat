import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import {
  signInWithEmail,
  signUpWithEmail,
  signInWithGoogle,
} from "../lib/firebase";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { getUserProfile } from "../lib/firebase";
import { fetchWithAuth } from "../lib/authApi";

export default function LoginPage() {
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [jwtToken, setJwtToken] = useState("");

  // fetch protected data using JWT token
  // This function will be called after successful login
  const fetchProtectedData = async () => {
    const token = localStorage.getItem("jwtToken");
    // console.log("Stored Token in Local Storage:", token);

    if (!token) {
      console.warn("No JWT token found in local storage. Please log in.");
      return;
    }

    try {
      const data = await fetchWithAuth("http://localhost:5000/api/protected");
      console.log("Protected Data:", data);
    } catch (error) {
      console.error("Error fetching protected data:", error);
    }
  };

  // Set initial mode based on query parameter
  useEffect(() => {
    // Set initial mode from query parameter
    if (router.query.mode === "signup") {
      setMode("signup");
    }
  }, [router.query]);
  // Retrieve JWT token from local storage on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken");

    if (storedToken) {
      console.log("Retrieved Token from Local Storage:", storedToken);
      setJwtToken(storedToken);
    }
  }, []);
  // Debugginng Firebase Environment variables
  useEffect(() => {
    // Debug: Check if environment variables are loaded
    console.log("Environment Variables in Login Page:", {
      NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY
        ? "Present"
        : "Missing",
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env
        .NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
        ? "Present"
        : "Missing",
      NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env
        .NEXT_PUBLIC_FIREBASE_PROJECT_ID
        ? "Present"
        : "Missing",
    });
  }, []);

  //Email/Pass Sign In
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "signin") {
        const user = await signInWithEmail(email, password);
        const userProfile = await getUserProfile(user.uid);
        await handleLogin(email, password);
        toast.success(`Welcome ${userProfile?.firstName || "there"}!`);
      } else if (mode === "signout") {
        handleLogout(); // Call the logout function
        toast.success("Logged out successfully!");
      } else if (mode === "signup") {
        if (!firstName || !lastName) {
          throw new Error("First name and last name are required");
        }
        await signUpWithEmail(email, password, firstName, lastName);
        toast.success("Account created successfully");
      }
      router.push("/"); // Redirect to dashboard after successful auth
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Login
  const handleLogin = async (email, password) => {
    try {
      setLoading(true);
      console.log("Request Body:", { email, password });

      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("Full Response:", response); 

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Login failed");
      }

      const data = await response.json();
      console.log("Parsed Data:", data);

      const token = data.token;

      if (!token) {
        throw new Error("No token received from server");
      }

      localStorage.setItem("jwtToken", token);
      setJwtToken(token);
      console.log(
        "Stored Token in Local Storage:",
        localStorage.getItem("jwtToken")
      );

      // fetch protected data
      fetchProtectedData();
      // toast.success("Login successful!");
      router.push("/");
    } catch (error) {
      console.error("Login Error:", error);
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    // console.log("Removed Token from Local Storage");
    setJwtToken("");
    // console.log("JWT Token cleared from state", jwtToken);
    // console.log("Redirecting to login page...");
    router.push("/login");
    toast.success("Logged out successfully!");
  };

  //Google Sign In
  const handleGoogleSignIn = async () => {
    setError("");

    try {
      const result = await signInWithGoogle();
      const userProfile = await getUserProfile(result.uid);
      toast.success(`Welcome ${userProfile?.firstName || "there"}!`);
      router.push("/");
    } catch (error) {
      if (
        error.code !== "auth/popup-closed-by-user" &&
        error.code !== "auth/cancelled-popup-request"
      ) {
        setError(error.message);
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden">
      {/* Optional: background blur or color blobs */}
      <div className="absolute -top-40 -z-10 h-[500px] w-[500px] rounded-full bg-blue-100 blur-[100px]" />
      <div className="absolute -bottom-40 right-0 -z-10 h-[400px] w-[400px] rounded-full bg-green-100 blur-[100px]" />

      <div
        className="bg-white rounded-xl shadow-lg border border-gray-200 px-8 py-10 flex flex-col justify-start"
        style={{ width: 600, maxWidth: "90vw", minHeight: 500 }}
      >
        <div className="flex-1 flex flex-col">
          <div className="flex flex-col items-center mb-4">
            <h2 className="text-2xl font-bold text-center mb-1">
              {mode === "signin" ? "Welcome back" : "Create your account"}
            </h2>
            <p className="text-center text-gray-500 text-sm">
              Enter your credentials to{" "}
              {mode === "signin" ? "sign in" : "sign up"}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Tabs */}
          <div className="flex mb-8 gap-2">
            <button
              className={`flex-1 py-2 rounded-lg font-medium text-base transition-all duration-300 relative overflow-hidden
                ${
                  mode === "signin"
                    ? "bg-gray-100 text-blue-600 border-b-2 border-blue-400 ring-2 ring-blue-200"
                    : "bg-white text-gray-500 hover:bg-gray-100"
                }
              `}
              onClick={() => setMode("signin")}
            >
              <span className="relative z-10">Sign In</span>
            </button>
            <button
              className={`flex-1 py-2 rounded-lg font-medium text-base transition-all duration-300 relative overflow-hidden
                ${
                  mode === "signup"
                    ? "bg-gray-100 text-blue-600 border-b-2 border-blue-400 ring-2 ring-blue-200"
                    : "bg-white text-gray-500 hover:bg-gray-100"
                }
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
                    <label
                      className="block mb-1 text-sm font-medium"
                      htmlFor="firstName"
                    >
                      First Name
                    </label>
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
                    <label
                      className="block mb-1 text-sm font-medium"
                      htmlFor="lastName"
                    >
                      Last Name
                    </label>
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

              {/* Email and Password Inputs */}
              <div className="bg-gray-50 p-2 rounded">
                <label
                  className="block mb-1 text-sm font-medium"
                  htmlFor="email"
                >
                  Email
                </label>
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
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  {mode === "signin" && (
                    <a
                      href="#"
                      className="text-blue-500 text-xs hover:underline"
                    >
                      Forgot?
                    </a>
                  )}
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
              {loading
                ? "Loading..."
                : mode === "signin"
                ? "Sign In"
                : "Create Account"}
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
            className="w-full flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-medium py-2.5 rounded-lg text-base transition-colors duration-150 mt-6 mb-8"
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
