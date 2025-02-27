import './buddies.css';
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export function Buddies({ setLoginState }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [buddiesList, setBuddiesList] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    // Get the logged-in user
    const storedUser = localStorage.getItem('loggedInUser');
    if (!storedUser) {
      navigate('/'); // Redirect if not logged in
      return;
    }

    setLoggedInUser(storedUser);

    // Load all users (excluding the logged-in user)
    const storedUsers = JSON.parse(localStorage.getItem('allUsers')) || [];
    setAllUsers(storedUsers.map(user => user.username));

    // Load buddy list for the logged-in user (only if storedUser is valid)
    const userBuddies = JSON.parse(localStorage.getItem(`buddiesList_${storedUser}`) || '[]');
    setBuddiesList(userBuddies);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/');
  };

  const handleSearchClick = () => {
    setShowModal(true);
  };

  const handleToggleBuddy = (buddyName) => {
    if (!loggedInUser) return;

    const updatedBuddies = buddiesList.includes(buddyName)
      ? buddiesList.filter(buddy => buddy !== buddyName) // Remove buddy
      : [...buddiesList, buddyName]; // Add buddy

    setBuddiesList(updatedBuddies);
    localStorage.setItem(`buddiesList_${loggedInUser}`, JSON.stringify(updatedBuddies));
  };

  // Filter users for search (exclude self)
  const filteredUsers = allUsers
  .filter(user => typeof user === 'string') // Ensure user is a valid string
  .filter(user => user !== loggedInUser && user.toLowerCase().includes(searchTerm.toLowerCase()));


  return (
    <main className="container-fluid bg-secondary text-center">
      <header>
        <div className="nav">
          <h1>Lib Buddies</h1>
          <NavLink to="/page">
            <button>My Page</button>
          </NavLink>
          <NavLink to="/buddies">
            <button>Buddies</button>
          </NavLink>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <h1>My Buddies</h1>
      <button className="search" onClick={handleSearchClick}>🔍 Search </button>
      <br />
      <br />

      <ul>
        {buddiesList.map((buddy, index) => (
          <li key={index}>
            {buddy}
            <input
              type="checkbox"
              checked={buddiesList.includes(buddy)}
              onChange={() => handleToggleBuddy(buddy)}
            />
          </li>
        ))}
      </ul>

      <footer>
        <p>Lib Buddies</p>
      </footer>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Select a Buddy</h2>
            <input
              type="text"
              placeholder="Search for a buddy..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <li key={index} onClick={() => handleToggleBuddy(user)}>
                    <input type="checkbox" checked={buddiesList.includes(user)} readOnly />
                    {user}
                  </li>
                ))
              ) : (
                <li>No users found</li>
              )}
            </ul>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </main>
  );
}




