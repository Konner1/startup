
import './mypage.css';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export function MyPage() {
  const navigate = useNavigate();  // Initialize the useNavigate hook

  const handleLogout = () => {
    navigate('/');  // Navigate to the Login page when logging out
  };

  return (
    <div className="mypage-container">
      <header className="nav">
        <h1 className = "theNavH">Lib Buddies</h1>
        <NavLink to="/page">
          <button>My Page</button>
        </NavLink>
        <NavLink to="/buddies">
          <button>Buddies</button>
        </NavLink>
        {/* <button onClick={handleLogout}>Logout</button> */}
      </header>

      <div className="profile-info">
        <h2>Konner Kinghorn</h2>
        <img
          className="profile"
          src="2532FCBF-5F2E-469F-899D-4D064E234819_1_105_c.jpeg"
          alt="profile pic"
          width="150"
          height="100"
        />
        <p>My name is Konner Kinghorn and I'm studying Computer Science</p>

        <div className="library-status">
          <button>In Library</button>
          <button>Out</button>
        </div>
        <h3>Buddies In Library</h3>

        <footer className="list">
          <ul>
            <li>
              <label>
                <input type="checkbox" /> Jane Doe
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" /> Alex Smith
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" /> John Mark
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" /> Kyle Connors
              </label>
            </li>
          </ul>
        </footer>
      </div>
    </div>
  );
}



