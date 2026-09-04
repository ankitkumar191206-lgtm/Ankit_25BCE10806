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
    socket.on("update-results", (v) => setVotes(v));

    return () => socket.off("update-results");
  }, []);

  const create = async () => {
    const res = await axios.post("http://localhost:5001/create-room", {
      question,
      options,
    });

    setCode(res.data.code);
    socket.emit("join-room", res.data.code);
  };

  const start = () => {
    socket.emit("start-voting", code);
  };

  return (
    <div style={container}>
      <h2>Admin Panel</h2>

      {!code && (
        <>
          <input
            placeholder="Question"
            onChange={(e) => setQuestion(e.target.value)}
            style={input}
          />

          {options.map((_, i) => (
            <input
              key={i}
              placeholder={"Option " + (i + 1)}
              onChange={(e) => {
                let arr = [...options];
                arr[i] = e.target.value;
                setOptions(arr);
              }}
              style={input}
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

              <div
                style={{
                  height: "10px",
                  width: `${v * 40}px`,
                  backgroundColor: "#00ffcc",
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