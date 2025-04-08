import './mypage.css';
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export function MyPage({setLoginState}) {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState('');
  const [buddiesList, setBuddiesList] = useState([]);
  const [inLibrary, setInLibrary] = useState(false);
  const [quote, setQuote] = useState('');


  const fetchQuote = async () => {
    try {
      const response = await fetch('https://api.quotable.io/random').then((response) => response.json()).then(setQuote(data.content));
    } catch (error) {
      console.error('Error fetching quote:', error);
      setQuote('“Life is what happens when you’re busy making other plans.”');
    }
  };
  React.useEffect(() => {

    fetch('https://quote.cs260.click')
      .then((response) => response.json())
      .then((data) => {
        setQuote(data.quote);
        // setQuoteAuthor(data.author);
      })
      .catch();
  }, []);

  let socket;

  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
  
    if (user) {
      socket = new WebSocket('ws://localhost:4000');
  
      socket.addEventListener('open', () => {
        socket.send(JSON.stringify({ type: 'register', email: user }));
      });
  
      socket.addEventListener('message', (event) => {
        const msg = JSON.parse(event.data);
  
        if (msg.type === 'status-update') {
          setBuddiesList(prevList => {
            let newList = [...prevList];
  
            if (msg.inLibrary) {
              if (!newList.includes(msg.email)) {
                newList.push(msg.email);
              }
            } else {
              newList = newList.filter(b => b !== msg.email);
            }
  
            return newList;
          });
        }
      });
    }
  
    return () => {
      if (socket) socket.close();
    };
  }, []);


  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setLoginState(false); 
    navigate('/'); 
  };

  const toggleLibraryStatus = (status) => {
    setInLibrary(status);
    localStorage.setItem('inLibrary', JSON.stringify(status));
  
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({
        type: 'status',
        email: loggedInUser,
        inLibrary: status
      }));
    }
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
        <p>{quote || 'Loading quote...'}</p>

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



