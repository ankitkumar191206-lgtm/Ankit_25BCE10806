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
    });

    socket.on("update-results", (v) => setVotes(v));

    socket.on("joined-success", () => setJoined(true));

    return () => {
      socket.off("voting-started");
      socket.off("update-results");
      socket.off("joined-success");
    };
  }, []);

  const join = () => {
    if (!code) {
      alert("Enter code");
      return;
    }

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
      <h2>Participant</h2>

      {!joined && (
        <>
          <input
            placeholder="Enter Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={input}
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
            <button key={i} style={btn} onClick={() => vote(i)} disabled={voted}>
              {o}
            </button>
          ))}

          <h4>Results</h4>

          {votes.map((v, i) => (
            <div key={i} style={{ margin: "10px" }}>
              <p>{poll.options[i]} : {v}</p>

              <div
                style={{
                  height: "10px",
                  width: `${v * 40}px`,
                  backgroundColor: "#ffcc00",
                  borderRadius: "5px"
                }}
              ></div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

const container = {
  textAlign: "center",
  minHeight: "100vh",
  paddingTop: "40px",
  background: "#1e1e2f",
  color: "white"
};

const btn = {
  padding: "10px 20px",
  margin: "10px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const input = {
  padding: "10px",
  margin: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc"
};