import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5001");

function Participant() {
  const [code, setCode] = useState("");
  const [joined, setJoined] = useState(false);
  const [poll, setPoll] = useState(null);
  const [votes, setVotes] = useState([]);
  const [voted, setVoted] = useState(false);

  // 🔥 IMPORTANT: listeners should be in useEffect
  useEffect(() => {
    socket.on("voting-started", (data) => {
      console.log("Poll received:", data);
      setPoll(data);
      setVotes(data.votes);
    });

    socket.on("joined-success", () => {
       console.log("Joined successfully");
       setJoined(true);
});

socket.on("error-message", (msg) => {
  alert(msg);
});

    socket.on("update-results", (v) => {
      console.log("Votes updated:", v);
      setVotes(v);
    });

    return () => {
      socket.off("voting-started");
      socket.off("update-results");
    };
  }, []);

  const join = () => {
    if (!code) {
      alert("Enter room code");
      return;
    }

    console.log("Joining room:", code);

    socket.emit("join-room", code);
    setJoined(true);
  };

  const vote = (i) => {
    if (!voted) {
      socket.emit("vote", { code, optionIndex: i });
      setVoted(true);
    }
  };

  return (
    <div>
      <h2>Participant</h2>

      {!joined && (
        <>
          <input
            placeholder="Enter Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button onClick={join}>Join</button>
        </>
      )}

      {joined && !poll && <p>Waiting for host to start...</p>}

      {poll && (
        <>
          <h3>{poll.question}</h3>

          {poll.options.map((o, i) => (
            <button key={i} onClick={() => vote(i)} disabled={voted}>
              {o}
            </button>
          ))}

          <h4>Results</h4>
          {votes.map((v, i) => (
            <p key={i}>
              {poll.options[i]} : {v}
            </p>
          ))}
        </>
      )}
    </div>
  );
}

export default Participant;