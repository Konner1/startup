import './login.css';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

export function Login({setLogin}) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    const storedUser = localStorage.getItem('username');
    const storedPass = localStorage.getItem('password');

    if (username === storedUser && password === storedPass) {
      localStorage.setItem('loggedInUser', username);
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
    
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
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
