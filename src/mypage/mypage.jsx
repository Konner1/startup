import './mypage.css';
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export function MyPage({setLoginState}) {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState('');
  const [buddiesList, setBuddiesList] = useState([]);
  const [inLibrary, setInLibrary] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      setLoggedInUser(user);
  
      const storedBuddies = JSON.parse(localStorage.getItem(`buddiesList_${user}`)) || [];
      setBuddiesList(storedBuddies);
    }
  
    const storedStatus = JSON.parse(localStorage.getItem('inLibrary'));
    if (storedStatus !== null) setInLibrary(storedStatus);
  }, []);
  

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setLoginState(false);  // Update login state
    navigate('/');  // Redirect to login page
  };

  const toggleLibraryStatus = (status) => {
    setInLibrary(status);
    localStorage.setItem('inLibrary', JSON.stringify(status));
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
        <button onClick={handleLogout}>Logout</button>
      </header>

      <div className="profile-info">
      <h2>{loggedInUser || 'User'}</h2>
        <img
          className="profile"
          src={`https://picsum.photos/150/100?random=${Math.random()}`}
          alt="profile pic"
          width="150"
          height="100"
        />
        {/* <p>My name is Konner Kinghorn and I'm studying Computer Science</p> */}

        <div className="library-status">
          <button
            className={inLibrary ? 'active' : ''}
            onClick={() => toggleLibraryStatus(true)}
          >
            In Library
          </button>
          <button
            className="out-btn"
            onClick={() => toggleLibraryStatus(false)}
          >
            Out
          </button>
        </div>

        <h3>Buddies In Library</h3>

        <footer className="list">
          <ul>
            {buddiesList.map((buddy, index) => (
              <li key={index}>
                <label>
                  <input type="checkbox" checked readOnly /> {buddy}
                </label>
              </li>
            ))}
          </ul>
        </footer>
      </div>
    </div>
  );
}



