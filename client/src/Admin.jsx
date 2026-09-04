import { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5001");

export default function Admin() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [code, setCode] = useState("");
  const [votes, setVotes] = useState([]);
  const [started, setStarted] = useState(false);

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
    setStarted(true);
    socket.emit("start-voting", code);
  };

  return (
    <div style={bg}>
      <div style={card}>
        <h2>👨‍💼 Admin Dashboard</h2>

        {!code && (
          <>
            <input placeholder="Enter Question" style={input}
              onChange={(e) => setQuestion(e.target.value)} />

            {options.map((_, i) => (
              <input
                key={i}
                placeholder={`Option ${i + 1}`}
                style={input}
                onChange={(e) => {
                  const arr = [...options];
                  arr[i] = e.target.value;
                  setOptions(arr);
                }}
              />
            ))}

            <button style={btn} onClick={() => setOptions([...options, ""])}>
              + Add Option
            </button>

            <button style={btn2} onClick={create}>
              Create Poll
            </button>
          </>
        )}

        {code && (
          <>
            <div style={codeBox}>
              🔑 Room Code: <b>{code}</b>
            </div>

            <button style={btn} onClick={start}>
              🚀 Start Voting
            </button>

            <div style={{ marginTop: "20px" }}>
              {votes.map((v, i) => (
                <div key={i} style={{ marginBottom: "15px" }}>
                  <p>{options[i]} — {v}</p>

                  <div style={{
                    height: "12px",
                    width: `${v * 50}px`,
                    background: "linear-gradient(90deg,#00f5ff,#00ff88)",
                    borderRadius: "10px",
                    transition: "0.3s"
                  }} />
                </div>
              ))}
            </div>
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
  border: "none",
  outline: "none"
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

const btn2 = {
  padding: "10px 14px",
  margin: "8px",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  background: "linear-gradient(135deg,#ff512f,#dd2476)",
  color: "white",
  fontWeight: "bold"
};

const codeBox = {
  padding: "10px",
  margin: "10px 0",
  background: "rgba(255,255,255,0.1)",
  borderRadius: "10px",
  textAlign: "center"
};