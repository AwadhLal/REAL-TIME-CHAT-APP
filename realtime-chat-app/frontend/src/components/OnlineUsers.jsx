function OnlineUsers({ users, currentUser, showUsers, onToggle }) {
  return (
    <div className={`online-users ${showUsers ? 'show' : 'hide'}`}>
      <div className="online-users-header">
        <h3>Online Users ({users.length})</h3>
        <button className="close-btn" onClick={onToggle}>×</button>
      </div>
      <div className="users-list">
        {users.length === 0 ? (
          <p className="no-users">No users online</p>
        ) : (
          users.map((user, index) => (
            <div key={index} className="user-item">
              <span className="user-status"></span>
              <span className="user-name">
                {user} {user === currentUser && '(You)'}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default OnlineUsers;
