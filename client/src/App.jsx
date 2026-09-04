import { useState } from "react";
import Admin from "./Admin";
import Participant from "./Participant";

export default function App() {
  const [role, setRole] = useState("");

  if (!role) {
    return (
      <div style={bg}>
        <div style={card}>
          <h1 style={{ fontSize: "32px" }}>⚡ Live Polling System</h1>
          <p style={{ opacity: 0.8 }}>Real-time voting made simple</p>

          <div style={{ marginTop: "20px" }}>
            <button style={btn} onClick={() => setRole("admin")}>
              Enter as Admin
            </button>

            <button style={btn2} onClick={() => setRole("user")}>
              Enter as Participant
            </button>
          </div>
        </div>
      </div>
    );
  }

  return role === "admin" ? <Admin /> : <Participant />;
}

const bg = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "radial-gradient(circle at top, #1e1e2f, #0f0f1a)",
  fontFamily: "Segoe UI",
  color: "white"
};

const card = {
  padding: "40px",
  borderRadius: "20px",
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(12px)",
  boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
  textAlign: "center"
};

const btn = {
  padding: "12px 18px",
  margin: "10px",
  border: "none",
  borderRadius: "12px",
  cursor: "pointer",
  background: "linear-gradient(135deg,#00c6ff,#0072ff)",
  color: "white",
  fontWeight: "bold"
};

const btn2 = {
  padding: "12px 18px",
  margin: "10px",
  border: "none",
  borderRadius: "12px",
  cursor: "pointer",
  background: "linear-gradient(135deg,#ff512f,#dd2476)",
  color: "white",
  fontWeight: "bold"
};