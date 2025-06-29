import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "idle", message: "" });

  // Auto-reset status after 10 seconds for success/error messages
  useEffect(() => {
    if (status.type === "success" || status.type === "error") {
      const timer = setTimeout(() => {
        setStatus({ type: "idle", message: "" });
      }, 10000); // 10 seconds

      return () => clearTimeout(timer);
    }
  }, [status.type]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "Sending message..." });

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: "success", message: "Message sent successfully!" });
        setFormData({ name: "", email: "", subject: "", message: "" });
        toast.success("Message sent successfully!");
      } else {
        setStatus({
          type: "error",
          message: data.error || "Failed to send message",
        });
        toast.error(data.error || "Failed to send message");
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "An error occurred. Please try again.",
      });
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-xl px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="subject"
            >
              Subject
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="subject"
              type="text"
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
              required
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="message"
              rows="5"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              required
            />
          </div>

          <div className="flex items-center justify-center" style={{ width: "300px", margin: "1rem auto" }}>
            {status.type === "idle" ? (
              <button
                type="submit"
                className="bg-mint-700 hover:bg-mint-800 text-white font-bold py-3 px-3 rounded focus:outline-none focus:shadow-outline w-full"
              >
                Send Message
              </button>
            ) : (
              <div
                className={`p-3 rounded-md text-center ${
                  status.type === "success"
                    ? "bg-mint-700 text-white"
                    : status.type === "error"
                    ? "bg-red-700 text-white"
                    : "bg-mint-700 text-white"
                }`}
                style={{ width: "300px" }}
              >
                {status.message}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
