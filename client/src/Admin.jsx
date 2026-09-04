import { useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5001");

function Admin() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [roomCode, setRoomCode] = useState("");
  const [participants, setParticipants] = useState(0);
  const [started, setStarted] = useState(false);
  const [votes, setVotes] = useState([]);

  const addOption = () => {
    if (options.length < 6) setOptions([...options, ""]);
  };

  const handleOptionChange = (value, index) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const createPoll = async () => {
    const res = await axios.post("http://localhost:5001/create-room", {
      question,
      options,
    });

    setRoomCode(res.data.code);

    socket.emit("join-room", res.data.code);

    socket.on("participant-count", setParticipants);
    socket.on("update-results", setVotes);
  };

  const startVoting = () => {
    socket.emit("start-voting", roomCode);
    socket.on("voting-started", (data) => {
      setStarted(true);
      setVotes(data.votes);
    });
  };

  return (
    <div>
      <h1>Admin Panel</h1>

      {!roomCode && (
        <>
          <input
            placeholder="Question"
            onChange={(e) => setQuestion(e.target.value)}
          />

          {options.map((opt, i) => (
            <input
              key={i}
              placeholder={`Option ${i + 1}`}
              onChange={(e) => handleOptionChange(e.target.value, i)}
            />
          ))}

          <button onClick={addOption}>Add Option</button>
          <button onClick={createPoll}>Create Poll</button>
        </>
      )}

      {roomCode && !started && (
        <>
          <h2>Room Code: {roomCode}</h2>
          <p>Participants: {participants}</p>
          <button onClick={startVoting}>Start Voting</button>
        </>
      )}

      {started && (
        <>
          <h2>Live Results</h2>
          {votes.map((v, i) => (
            <p key={i}>
              {options[i]} - {v}
            </p>
          ))}
        </>
      )}
    </div>
  );
}

export default Admin;