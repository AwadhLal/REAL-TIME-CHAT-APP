import { useEffect, useRef } from 'react';

function MessageList({ messages, currentUser }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="message-list">
      {messages.length === 0 && (
        <div className="empty-state">
          <p>No messages yet. Start the conversation!</p>
        </div>
      )}
      {messages.map((msg, index) => {
        if (msg.type === 'system') {
          return (
            <div key={index} className="system-message">
              <span>{msg.message}</span>
            </div>
          );
        }

        const isCurrentUser = msg.username === currentUser;
        return (
          <div 
            key={index} 
            className={`message ${isCurrentUser ? 'message-right' : 'message-left'}`}
          >
            <div className="message-bubble">
              <div className="message-header">
                <span className="message-username">{msg.username}</span>
                <span className="message-time">{formatTime(msg.timestamp)}</span>
              </div>
              <div className="message-text">{msg.message}</div>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default MessageList;
