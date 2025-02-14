
import './login.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Login({setLogin}) {
  const navigate = useNavigate();

  const handleLogin = () => {
    setLogin(true);
    navigate('/page');  // Navigate to the "MyPage" after login
  };

  return (
    <main className='container-fluid bg-secondary text-center'>
      <h1 className ="Title" >Lib Buddies</h1>
      
      <form action="mypage.html" method="get">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username"/>

          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password"/>
          <div className="inLine">
              <button type="button" onClick={handleLogin}>Login</button> 
              <button type="submit">New User</button>
          </div>
      </form>

      <footer>
          <span className="text-reset"> Konner Kinghorn</span>
          <a href="https://github.com/Konner1/startup"> GitHub </a>
      </footer>
    </main>
  );
}
