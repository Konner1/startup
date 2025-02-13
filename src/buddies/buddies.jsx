import './buddies.css';
import React from 'react';

export function Buddies() {
  return (
    <main className="container-fluid bg-secondary text-center">
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