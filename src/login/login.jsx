import './login.css';
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

export function Login({setLogin}) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      setLogin(true);
      navigate('/page');
    }
  }, [setLogin, navigate]);

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('allUsers')) || [];
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      localStorage.setItem('loggedInUser', username); // Store active session
      setLogin(true);
      navigate('/page');
    } else {
      setErrorMessage('Invalid username or password');
    }
  };
  const handleRegister = () => {
    if (!username || !password) {
      setErrorMessage('Please enter a username and password');
      return;
    }

    let users = JSON.parse(localStorage.getItem('allUsers')) || [];

    // Check if username already exists
    if (users.some(u => u.username === username)) {
      setErrorMessage('Username already exists! Please choose another.');
      return;
    }

    // Add new user to the array
    users.push({ username, password });
    localStorage.setItem('allUsers', JSON.stringify(users));

    setErrorMessage('Account created! You can now log in.');
  };


  return (
    <main className='container-fluid bg-secondary text-center'>
      <h1 className ="Title" >Lib Buddies</h1>
      
      <form>
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            id="username" 
            name="username"
            value={username}
            onChange={(e)=> setUsername(e.target.value)}
            />

          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            />

          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

          <div className="inLine">
              <button type="button" onClick={handleLogin}>Login</button> 
              <button type="button" onClick={handleRegister}>New User</button>
          </div>
      </form>

      <footer>
          <span className="text-reset"> Konner Kinghorn</span>
          <a href="https://github.com/Konner1/startup"> GitHub </a>
      </footer>
    </main>
  );
}
