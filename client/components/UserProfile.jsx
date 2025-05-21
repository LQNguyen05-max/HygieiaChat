import { useState } from "react";
import { CircleUser } from "lucide-react"; // or your preferred icon

export default function UserProfile() {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div
      className="user-profile"
      onClick={() => setShowProfile((b) => !b)}
      style={{
        position: "absolute",
        top: "1rem",
        right: "1rem",
        zIndex: 200,
        cursor: "pointer",
      }}
      title="User Profile"
    >
      <CircleUser size={36} />
      {showProfile && (
        <div
          style={{
            position: "absolute",
            top: "2.5rem",
            right: 0,
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "0.5rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
            padding: "1rem",
            minWidth: "180px",
          }}
        >
            {/* User display email here! */}
          <div style={{ fontWeight: 600, marginBottom: "0.5rem" }}>Your Profile</div>
          <div style={{ fontSize: "0.9rem", color: "#374151" }}>user@email.com</div>
          <button
            style={{
              marginTop: "1rem",
              width: "100%",
              padding: "0.5rem",
              borderRadius: "0.25rem",
              border: "none",
              background: "#2563eb",
              color: "#fff",
              cursor: "pointer",
            }}
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = "/users"
              // change later!!!
              alert("Log out");
            }}
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}