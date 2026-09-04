const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

const rooms = {};

function generateCode() {
  return Math.random().toString(36).substring(2, 7);
}

// Create Room API
app.post("/create-room", (req, res) => {
  const { question, options } = req.body;

  const code = generateCode();

  rooms[code] = {
    question,
    options,
    votes: Array(options.length).fill(0),
    participants: 0,
    started: false
  };

  res.json({ code });
});

// Socket Logic
io.on("connection", (socket) => {

  socket.on("join-room", (code) => {
    socket.join(code);

    if (rooms[code]) {
      rooms[code].participants++;
      io.to(code).emit("participant-count", rooms[code].participants);
    }
  });

  socket.on("start-voting", (code) => {
    rooms[code].started = true;
    io.to(code).emit("voting-started", rooms[code]);
  });

  socket.on("vote", ({ code, optionIndex }) => {
    rooms[code].votes[optionIndex]++;
    io.to(code).emit("update-results", rooms[code].votes);
  });

  socket.on("end-poll", (code) => {
    io.to(code).emit("poll-ended", rooms[code].votes);
  });

});

server.listen(5001, () => console.log("Server running on 5001"));