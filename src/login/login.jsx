import './login.css';
import React from 'react';

export function Login({setLogin}) {
  return (
    <main className='container-fluid bg-secondary text-center'>
      <div className="body bg-dark text-light">Logged Out
      <button onClick = {()=>setLogin(true)}>Login</button></div>;

    <h1>Lib Buddies</h1>
    
    <form action="mypage.html" method="get">
        <label for="username">Username</label>
        <input type="text" id="username" name="username"/>

        <label for="password">Password</label>
        <input type="password" id="password" name="password"/>
        <div class="inLine">
            <button type="submit">Login</button> 
            <button type="submit">New User</button>
        </div>
    </form>

<footer>
    <span class = "text-reset"> Konner Kinghorn</span>
    <a href = "https://github.com/Konner1/startup"> GitHub </a>
</footer>
    </main>
  );
}