import { useState } from "react";
import Admin from "./Admin";
import Participant from "./Participant";

export default function App() {
  const [role, setRole] = useState("");

  if (!role) {
    return (
      <div>
        <h2>Select Role</h2>
        <button onClick={() => setRole("admin")}>Admin</button>
        <button onClick={() => setRole("user")}>Participant</button>
      </div>
    );
  }

  return role === "admin" ? <Admin /> : <Participant />;
}