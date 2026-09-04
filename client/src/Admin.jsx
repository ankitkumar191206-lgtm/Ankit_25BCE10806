import { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5001");

export default function Admin() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [code, setCode] = useState("");
  const [votes, setVotes] = useState([]);

  useEffect(() => {
    socket.on("update-results", setVotes);
    return () => socket.off("update-results");
  }, []);

  const create = async () => {
    const res = await axios.post("http://localhost:5001/create-room", {
      question,
      options
    });

    setCode(res.data.code);
    socket.emit("join-room", res.data.code);
  };

  const start = () => {
    socket.emit("start-voting", code);
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2>👨‍💼 Admin Panel</h2>

        {!code && (
          <>
            <input
              placeholder="Question"
              style={input}
              onChange={(e) => setQuestion(e.target.value)}
            />

            {options.map((_, i) => (
              <input
                key={i}
                placeholder={`Option ${i + 1}`}
                style={input}
                onChange={(e) => {
                  let arr = [...options];
                  arr[i] = e.target.value;
                  setOptions(arr);
                }}
              />
            ))}

            <button style={btn} onClick={() => setOptions([...options, ""])}>
              Add Option
            </button>

            <button style={btn} onClick={create}>
              Create Poll
            </button>
          </>
        )}

        {code && (
          <>
            <h3>Room Code: {code}</h3>

            <button style={btn} onClick={start}>
              Start Voting
            </button>

            {votes.map((v, i) => (
              <div key={i} style={{ margin: "10px" }}>
                <p>{options[i]} : {v}</p>

                <div style={{
                  height: "12px",
                  width: `${v * 40}px`,
                  background: "linear-gradient(90deg,#00f5ff,#00ff88)",
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