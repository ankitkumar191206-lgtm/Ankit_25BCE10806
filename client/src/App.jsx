import { useState } from "react";
import Admin from "./Admin";
import Participant from "./Participant";

export default function App() {
  const [role, setRole] = useState("");

  if (!role) {
    return (
      <div
        style={{
          textAlign: "center",
          minHeight: "100vh",
          paddingTop: "50px",
          background: "linear-gradient(to right, #667eea, #764ba2)",
          color: "white",
          fontFamily: "Arial"
        }}
      >
        <h2 style={{ fontSize: "30px" }}>Live Polling App</h2>

        <button
          onClick={() => setRole("admin")}
          style={btn}
        >
          Admin
        </button>

        <button
          onClick={() => setRole("user")}
          style={btn}
        >
          Participant
        </button>
      </div>
    );
  }

  return role === "admin" ? <Admin /> : <Participant />;
}

const btn = {
  padding: "12px 25px",
  margin: "10px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold"
};