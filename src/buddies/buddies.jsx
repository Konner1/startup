
import './buddies.css';
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export function Buddies() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [buddiesList, setBuddiesList] = useState([]);


  const handleLogout = () => {
    navigate('/');  
  };

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
          {/* <button onClick={handleLogout}>Logout</button> */}
        </div>
      </header>

      <h1>My Buddies</h1>
      <button className="search" onClick={handleSearchClick}>🔍 Search </button>
      <br />
      <br />

      <ul>
        {buddiesList.map((buddy, index) => (
            <li key={index}>
              {buddy} <input type="radio" name="user" />
            </li>
          ))}
      </ul>

      <footer>
        <p>Lib Buddies</p>
      </footer>
    </main>
  );
}



