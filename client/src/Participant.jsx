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
    <div style={container}>
      <div style={card}>
        <h2>👥 Participant</h2>

        {!joined && (
          <>
            <input
              placeholder="Enter Code"
              style={input}
              onChange={(e) => setCode(e.target.value)}
            />
            <button style={btn} onClick={join}>
              Join
            </button>
          </>
        )}

        {joined && !poll && <p>Waiting for host...</p>}

        {poll && (
          <>
            <h3>{poll.question}</h3>

            {poll.options.map((o, i) => (
              <button key={i} style={btn} onClick={() => vote(i)}>
                {o}
              </button>
            ))}

            <h4>Live Results</h4>

            {votes.map((v, i) => (
              <div key={i} style={{ margin: "10px" }}>
                <p>{poll.options[i]} : {v}</p>

                <div style={{
                  height: "12px",
                  width: `${v * 40}px`,
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
  padding: "30px",
  borderRadius: "15px",
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(10px)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
  width: "400px"
};

const input = {
  width: "90%",
  padding: "10px",
  margin: "8px",
  borderRadius: "10px",
  border: "none"
};

const btn = {
  padding: "10px 15px",
  margin: "8px",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
  color: "white",
  background: "linear-gradient(135deg, #4CAF50, #2ecc71)"
};