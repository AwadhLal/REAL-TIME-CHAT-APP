import { useState } from 'react';

function JoinScreen({ onJoin }) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onJoin(username);
    }
  };

  return (
    <div className="join-screen">
      <div className="join-container">
        <h1>Real-Time Chat</h1>
        <p>Enter your username to join</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            maxLength={20}
            autoFocus
          />
          <button type="submit" disabled={!username.trim()}>
            Join Chat
          </button>
        </form>
      </div>
    </div>
  );
}

export default JoinScreen;
