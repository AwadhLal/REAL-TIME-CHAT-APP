import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import JoinScreen from './components/JoinScreen';
import ChatScreen from './components/ChatScreen';

function App() {
  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState('');
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    // Connect to Socket.IO server
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    // Cleanup on unmount
    return () => {
      newSocket.close();
    };
  }, []);

  const handleJoin = (name) => {
    if (socket && name.trim()) {
      setUsername(name.trim());
      socket.emit('join', name.trim());
      setIsJoined(true);
    }
  };

  return (
    <div className="app">
      {!isJoined ? (
        <JoinScreen onJoin={handleJoin} />
      ) : (
        <ChatScreen socket={socket} username={username} />
      )}
    </div>
  );
}

export default App;
