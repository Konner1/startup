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

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/auth', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Ensures cookies are sent
        body: JSON.stringify({ email: username, password })
      });
  
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('loggedInUser', data.email);
        setLogin(true);
        navigate('/page');
      } else {
        setErrorMessage('Invalid email or password');
      }
    } catch (error) {
      setErrorMessage('Login failed. Please try again.');
    }
  };
  
  const handleRegister = async () => {
    if (!username || !password) {
      setErrorMessage('Please enter an email and password');
      return;
    }
  
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: username, password })
      });
  
      if (response.ok) {
        localStorage.setItem('loggedInUser', username);
        setErrorMessage('Account created! You can now log in.');
      } else {
        setErrorMessage('User already exists!');
      }
    } catch (error) {
      setErrorMessage('Registration failed. Please try again.');
    }
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
