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
      const response = await fetch('https://api.quotable.io/random').then((response) => response.json()).then((data) => setQuote(data.content));
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

  const socketRef = React.useRef(null);

  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    setLoggedInUser(user);
  
    if (user) {
      socketRef.current = new WebSocket('ws://localhost:4000');
  
      socketRef.current.addEventListener('open', () => {
        socketRef.current.send(JSON.stringify({ type: 'register', email: user }));
      });
  
      socketRef.current.addEventListener('message', (event) => {
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
      if (socketRef.current) {
        socketRef.current.close();
      }
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
  
    const email = localStorage.getItem('loggedInUser');
  
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({
        type: 'status',
        email,
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



