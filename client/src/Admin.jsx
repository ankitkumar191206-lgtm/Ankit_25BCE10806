import { useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5001");

function Admin() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [code, setCode] = useState("");
  const [votes, setVotes] = useState([]);

  const create = async () => {
    const res = await axios.post("http://localhost:5001/create-room", {
      question,
      options,
    });

    setCode(res.data.code);

    socket.emit("join-room", res.data.code);

    socket.on("update-results", (v) => setVotes(v));
  };

  const start = () => {
    socket.emit("start-voting", code);

    socket.on("voting-started", (data) => {
      setVotes(data.votes);
    });
  };

  return (
    <div>
      {!code && (
        <>
          <input placeholder="Question" onChange={(e) => setQuestion(e.target.value)} />
          {options.map((_, i) => (
            <input
              key={i}
              placeholder={"Option " + (i + 1)}
              onChange={(e) => {
                let arr = [...options];
                arr[i] = e.target.value;
                setOptions(arr);
              }}
            />
          ))}
          <button onClick={() => setOptions([...options, ""])}>Add</button>
          <button onClick={create}>Create</button>
        </>
      )}

      {code && (
        <>
          <h3>Code: {code}</h3>
          <button onClick={start}>Start</button>

          {votes.map((v, i) => (
            <p key={i}>
              {options[i]} : {v}
            </p>
          ))}
        </>
      )}
    </div>
  );
}

export default Admin;