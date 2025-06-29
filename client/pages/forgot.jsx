import { useState } from "react";
import { useRouter } from "next/router";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../lib/firebase";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const router = useRouter();

  // Send reset email
  const handleSendResetEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Reset email sent successfully!");
      setEmailSent(true);
    } catch (error) {
      console.error("Error sending reset email:", error);
      setError(error.message);
      toast.error("Failed to send reset email. Please check your email address.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute -top-40 -z-10 h-[500px] w-[500px] rounded-full bg-blue-100 blur-[100px]" />
      <div className="absolute -bottom-40 right-0 -z-10 h-[400px] w-[400px] rounded-full bg-green-100 blur-[100px]" />

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-8 py-10 w-[500px]">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {emailSent ? "Check Your Email" : "Reset Password"}
          </h2>
          <p className="text-gray-500 text-sm">
            {emailSent 
              ? "We've sent you a password reset link"
              : "Enter your email to receive a reset link"
            }
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Email Input Form */}
        {!emailSent && (
          <form onSubmit={handleSendResetEmail}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-mint-700 hover:bg-mint-800 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        )}

        {/* Success Message */}
        {emailSent && (
          <div className="text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Reset Link Sent!
              </h3>
              <p className="text-gray-600 mb-4">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              <p className="text-sm text-gray-500">
                Please check your email and follow the instructions to reset your password.
              </p>
            </div>
            <button
              onClick={() => setEmailSent(false)}
              className="w-full bg-mint-700 hover:bg-mint-800 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
            >
              Send to Different Email
            </button>
          </div>
        )}

        {/* Back to Login */}
        <div className="mt-6 text-center">
          <button
            onClick={() => router.push("/login")}
            className="text-blue-500 hover:text-blue-600 text-sm"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}
