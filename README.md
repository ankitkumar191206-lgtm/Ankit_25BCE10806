#  Live Polling / Quiz Application

A real-time full-stack web application where an Admin can create a poll and Participants can join using a room code to vote. The results update instantly across all connected clients without refreshing the page.

---

##  Features

###  Admin

* Create a poll with a question and multiple options (2–6)
* Generate a unique room code
* View number of participants joining in real-time
* Start and end the poll
* Watch live results with dynamic bar visualization

###  Participants

* Join poll using room code
* Wait in lobby until poll starts (server-pushed update)
* Vote once (double voting prevented)
* View live results updating in real-time

---

##  Tech Stack

### Frontend

* React (Vite)
* Socket.IO Client
* Axios

### Backend

* Node.js
* Express.js
* Socket.IO

---

##  How It Works (Architecture)

* The backend maintains in-memory “rooms”
* Each room stores:

  * Question
  * Options
  * Votes
  * Participants count
* WebSockets (Socket.IO) handle:

  * Real-time joining
  * Vote broadcasting
  * Live result updates
* REST API is used for poll creation

---

##  Project Structure

```
live-polling-app/
│
├── server/
│   ├── server.js
│   └── package.json
│
├── client/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── Admin.jsx
│   │   ├── Participant.jsx
│   │   └── main.jsx
│   └── package.json
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <https://github.com/ankitkumar191206-lgtm/Ankit_25BCE10806>
cd live-polling-app
```

---

### 2. Start Backend

```bash
cd server
npm install
node server.js
```

---

### 3. Start Frontend

```bash
cd client
npm install
npm run dev
```

---

### 4. Open in Browser

```
http://localhost:5173
```

---

##  Usage Flow

1. Admin creates a poll and shares the room code
2. Participants join using the code
3. Admin starts the poll
4. Participants vote
5. Results update live across all users

---

##  Key Highlights

* Real-time updates using WebSockets (Socket.IO)
* No page refresh required
* Clean and responsive UI
* Scalable architecture (rooms-based system)
* Demonstrates full-stack integration

---

##  Limitations

* Data stored in memory (resets on server restart)
* No authentication system
* Basic UI (can be enhanced further)

---

##  Future Improvements

* Add database (MongoDB / Firebase)
* User authentication
* Multiple polls per room
* Timer for polls
* Better UI/UX with animations

---

##  Author

Ankit Kumar,
Student at
VIT BHOPAL UNIVERSITY

---

##  Submission Notes

This project demonstrates:

* Full-stack development skills
* Real-time system design
* Clean Git workflow with incremental commits

---

If you like this project, consider giving it a star!
