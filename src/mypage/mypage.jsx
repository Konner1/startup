import './mypage.css';
import React from 'react';

export function MyPage() {
  return (
    <div>
      <header>
        <div className="nav">
          <h1>Lib Buddies</h1>
          <form action="index.html" method="get">
            <button>Login</button>
          </form>
          <form action="mypage.html" method="get">
            <button>My Page</button>
          </form>
          <form action="buddiespage.html" method="get">
            <button>Buddies</button>
          </form>
        </div>
      </header>

      <h2>Konner Kinghorn</h2>

      <img
        className="profile"
        src="2532FCBF-5F2E-469F-899D-4D064E234819_1_105_c.jpeg"
        alt="profile pic"
        width="150"
        height="100"
      />

      <p>My name is Konner Kinghorn and I'm studying Computer Science</p>

      <div>
        <button>In Library</button>
        <button>Out</button>
      </div>
      <br />
      <h3>Buddies In Library (the websocket things will be stored below)</h3>

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
          <li>
            <label>
              <input type="checkbox" /> Kyle Connors
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
  );
}