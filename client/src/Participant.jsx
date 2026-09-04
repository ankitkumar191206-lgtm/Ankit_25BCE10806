import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5001");

export default function Participant() {
  const [code, setCode] = useState("");
  const [joined, setJoined] = useState(false);
  const [poll, setPoll] = useState(null);
  const [votes, setVotes] = useState([]);
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    socket.on("voting-started", (data) => {
      setPoll(data);
      setVotes(data.votes);
      setJoined(true);
    });

    socket.on("update-results", setVotes);

    return () => {
      socket.off("voting-started");
      socket.off("update-results");
    };
  }, []);

  const join = () => {
    socket.emit("join-room", code);
  };

  const vote = (i) => {
    if (!voted) {
      socket.emit("vote", { code, optionIndex: i });
      setVoted(true);
    }
  };

  return (
    <div style={bg}>
      <div style={card}>
        <h2>👥 Live Poll</h2>

        {!joined && (
          <>
            <input
              placeholder="Enter Room Code"
              style={input}
              onChange={(e) => setCode(e.target.value)}
            />

            <button style={btn} onClick={join}>
              Join Room
            </button>
          </>
        )}

        {joined && !poll && (
          <p style={{ opacity: 0.8 }}>Waiting for admin to start...</p>
        )}

        {poll && (
          <>
            <h3>{poll.question}</h3>

            {poll.options.map((o, i) => (
              <button key={i} style={optBtn} onClick={() => vote(i)}>
                {o}
              </button>
            ))}

            <h4>Live Results</h4>

            {votes.map((v, i) => (
              <div key={i} style={{ marginBottom: "12px" }}>
                <p>{poll.options[i]} — {v}</p>

                <div style={{
                  height: "12px",
                  width: `${v * 50}px`,
                  background: "linear-gradient(90deg,#ffcc00,#ff9900)",
                  borderRadius: "10px"
                }} />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

const bg = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "radial-gradient(circle at top, #1e1e2f, #0f0f1a)",
  color: "white",
  fontFamily: "Segoe UI"
};

const card = {
  width: "420px",
  padding: "30px",
  borderRadius: "20px",
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(12px)",
  boxShadow: "0 10px 40px rgba(0,0,0,0.5)"
};

const input = {
  width: "90%",
  padding: "10px",
  margin: "8px",
  borderRadius: "10px",
  border: "none"
};

const btn = {
  padding: "10px 14px",
  margin: "8px",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  background: "linear-gradient(135deg,#00c6ff,#0072ff)",
  color: "white",
  fontWeight: "bold"
};

const optBtn = {
  padding: "10px",
  margin: "6px",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  background: "linear-gradient(135deg,#4CAF50,#2ecc71)",
  color: "white"
};