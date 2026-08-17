# Real-Time Chat Application

A simple and fully functional real-time chat application built for Novexa Technologies Task 9.

## Project Overview

This is a real-time chat application that allows multiple users to join a chat room, send messages instantly, and see who else is online. The application uses Socket.IO for real-time bidirectional communication between the client and server.

## Features

- Real-time messaging using Socket.IO
- User join/leave notifications
- Online users list
- Message timestamps
- Clean and modern UI
- Responsive design (desktop and mobile)
- No database required (in-memory storage)
- Simple and straightforward implementation

## Technologies Used

**Frontend:**
- React.js (with Vite)
- Socket.IO Client
- CSS3

**Backend:**
- Node.js
- Express.js
- Socket.IO
- CORS

## Folder Structure

```
REALTIME-CHAT-APP/
├── backend/
│   ├── server.js          # Express + Socket.IO server
│   └── package.json       # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── JoinScreen.jsx      # Username entry screen
│   │   │   ├── ChatScreen.jsx      # Main chat container
│   │   │   ├── MessageList.jsx     # Message display area
│   │   │   ├── MessageInput.jsx    # Message input field
│   │   │   └── OnlineUsers.jsx     # Online users sidebar
│   │   ├── App.jsx        # Main app component
│   │   ├── main.jsx       # React entry point
│   │   └── index.css      # Global styles
│   ├── index.html         # HTML template
│   ├── vite.config.js     # Vite configuration
│   └── package.json       # Frontend dependencies
├── .gitignore
└── README.md
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend folder:
```bash
cd realtime-chat-app/backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm run dev
```

The backend server will run on **http://localhost:5000**

### Frontend Setup

1. Open a new terminal and navigate to the frontend folder:
```bash
cd realtime-chat-app/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on **http://localhost:5173**

## How to Run

1. Start the backend server first (port 5000)
2. Start the frontend development server (port 5173)
3. Open http://localhost:5173 in your browser
4. Enter a username and click "Join Chat"
5. Open another browser tab/window and repeat steps 3-4 with a different username
6. Start chatting in real-time!

## How Socket.IO Works in This Project

Socket.IO enables real-time, bidirectional communication between the client (React frontend) and server (Node.js backend).

### Connection Flow:
1. Frontend connects to Socket.IO server when app loads
2. User enters username and clicks "Join Chat"
3. Frontend emits 'join' event with username
4. Backend receives event, stores user, and broadcasts to all clients
5. All connected clients receive updates about new user
6. Users can now send/receive messages in real-time

### Data Flow:
- **Client → Server**: User actions (join, send message)
- **Server → All Clients**: Broadcasts (new message, user joined/left, online users)
- **No HTTP polling**: Persistent connection maintained via WebSocket

## Socket Events Used

### Client-Side Events (Emitted):
- `join` - User joins the chat with username
- `sendMessage` - User sends a message

### Server-Side Events (Emitted):
- `receiveMessage` - Broadcast new message to all users
- `userJoined` - Notify all users when someone joins
- `userLeft` - Notify all users when someone disconnects
- `getOnlineUsers` - Send updated list of online users

### Built-in Events:
- `connection` - New client connects to server
- `disconnect` - Client disconnects from server

## Testing Instructions

### Test with Two Browser Windows:

1. **Window 1**: Open http://localhost:5173
   - Enter username "Alice"
   - Click "Join Chat"
   - Verify: Alice appears in online users list

2. **Window 2**: Open http://localhost:5173 in a new window/tab
   - Enter username "Bob"
   - Click "Join Chat"
   - Verify: Bob appears in online users list
   - Verify: Both windows show "Bob joined the chat" notification

3. **In Window 1 (Alice)**:
   - Type "Hello Bob!"
   - Click Send
   - Verify: Message appears on the right side with Alice's name

4. **In Window 2 (Bob)**:
   - Verify: Alice's message appears instantly on the left side
   - Type "Hi Alice!"
   - Click Send
   - Verify: Message appears on the right side

5. **In Window 1 (Alice)**:
   - Verify: Bob's reply appears instantly on the left side

6. **Close Window 2 (Bob)**:
   - In Window 1: Verify "Bob left the chat" notification
   - Verify: Bob removed from online users list

### What to Verify:
- ✅ Users can join with username
- ✅ Online users list updates correctly
- ✅ Messages appear instantly for all users
- ✅ Current user's messages on right (purple)
- ✅ Other users' messages on left (white)
- ✅ Timestamps display correctly
- ✅ Join/leave notifications work
- ✅ No CORS errors in console
- ✅ No Socket.IO connection errors
- ✅ Responsive UI on mobile (resize browser)

## Author

**Awadh Lal**

---

## Notes

- This is a simple version without authentication, database, or file uploads
- Messages are stored in memory only (lost on server restart)
- Perfect for learning Socket.IO basics
- Ready for expansion with additional features later
