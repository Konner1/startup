
import './buddies.css';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export function Buddies() {
  const navigate = useNavigate();  // Initialize the useNavigate hook

  const handleLogout = () => {
    navigate('/');  // Navigate to the Login page when logging out
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
      <button className="search">🔍 Search</button>
      <br />
      <br />

      <ul>
        <li>
          John Hans <input type="radio" name="user" />
        </li>
        <li>
          John Bolek <input type="radio" name="user" />
        </li>
        <li>
          John Jackson <input type="radio" name="user" />
        </li>
      </ul>

      <footer>
        <p>Lib Buddies</p>
      </footer>
    </main>
  );
}



