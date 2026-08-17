import { useState, useEffect } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import OnlineUsers from './OnlineUsers';

function ChatScreen({ socket, username }) {
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(true);

  useEffect(() => {
    if (!socket) return;

    // Listen for incoming messages
    socket.on('receiveMessage', (data) => {
      setMessages((prev) => [...prev, { ...data, type: 'message' }]);
    });

    // Listen for user joined events
    socket.on('userJoined', (data) => {
      setMessages((prev) => [...prev, { ...data, type: 'system' }]);
    });

    // Listen for user left events
    socket.on('userLeft', (data) => {
      setMessages((prev) => [...prev, { ...data, type: 'system' }]);
    });

    // Listen for online users updates
    socket.on('getOnlineUsers', (users) => {
      setOnlineUsers(users);
    });

    // Cleanup listeners
    return () => {
      socket.off('receiveMessage');
      socket.off('userJoined');
      socket.off('userLeft');
      socket.off('getOnlineUsers');
    };
  }, [socket]);

  const handleSendMessage = (message) => {
    if (socket && message.trim()) {
      socket.emit('sendMessage', { message: message.trim() });
    }
  };

  return (
    <div className="chat-screen">
      <div className={`chat-container ${showUsers ? 'show-sidebar' : ''}`}>
        <OnlineUsers 
          users={onlineUsers} 
          currentUser={username}
          showUsers={showUsers}
          onToggle={() => setShowUsers(!showUsers)}
        />
        <div className="chat-main">
          <div className="chat-header">
            <button 
              className="toggle-users-btn"
              onClick={() => setShowUsers(!showUsers)}
            >
              ☰
            </button>
            <h2>Chat Room</h2>
            <div className="user-badge">{username}</div>
          </div>
          <MessageList messages={messages} currentUser={username} />
          <MessageInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}

export default ChatScreen;
