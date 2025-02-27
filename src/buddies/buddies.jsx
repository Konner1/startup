
import './buddies.css';
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export function Buddies({setLoginState}) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [buddiesList, setBuddiesList] = useState([]);


  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('allUsers')) || [];
    setAllUsers(storedUsers);
  
    const storedBuddies = JSON.parse(localStorage.getItem('buddiesList')) || []; 
    setBuddiesList(storedBuddies); // Load buddies from storage
  }, []);
  const handleLogout = () => {
    navigate('/');  
  };

  const handleSearchClick = () => {
    setShowModal(true);
  };

  const handleToggleBuddy = (buddyName) => {
    const updatedBuddies = buddiesList.includes(buddyName)
      ? buddiesList.filter(buddy => buddy !== buddyName) // Remove buddy if already selected
      : [...buddiesList, buddyName]; // Add buddy if not selected

    setBuddiesList(updatedBuddies);
    localStorage.setItem('buddiesList', JSON.stringify(updatedBuddies));
  };


  const filteredUsers = allUsers.filter((user) =>
    user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  

  return (
    <main className="container-fluid bg-secondary text-center">
      <header>
        <div className="nav">
          <h1>Lib Buddies</h1>
          {/* NavLink buttons */}
          <NavLink to="/page">
            <button>My Page</button>
          </NavLink>
          <NavLink to="/buddies">
            <button>Buddies</button>
          </NavLink>
          {/* Logout button */}
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
                    <input 
                      type="checkbox" 
                      checked={buddiesList.includes(user)} 
                      readOnly 
                    />
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



