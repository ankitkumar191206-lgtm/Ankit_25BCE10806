import { useState } from "react";
import Admin from "./Admin";
import Participant from "./Participant";

export default function App() {
  const [role, setRole] = useState("");

  if (!role) {
    return (
      <div style={container}>
        <div style={card}>
          <h1>⚡ Live Polling App</h1>
          <p>Choose your role</p>

          <button style={btn} onClick={() => setRole("admin")}>
            Admin
          </button>

          <button style={btn} onClick={() => setRole("user")}>
            Participant
          </button>
        </div>
      </div>
    );
  }

  return role === "admin" ? <Admin /> : <Participant />;
}

const container = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #1e1e2f, #2d2d44)",
  color: "white",
  fontFamily: "Segoe UI"
};

const card = {
  padding: "40px",
  borderRadius: "15px",
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(10px)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
  textAlign: "center"
};

const btn = {
  padding: "10px 18px",
  margin: "10px",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
  color: "white",
  background: "linear-gradient(135deg, #4CAF50, #2ecc71)"
};