import './login.css';
import React from 'react';

export function Login({setLogin}) {
  return (
    <main className='container-fluid bg-secondary text-center'>
      <div className="body bg-dark text-light">Logged Out
      <button onClick = {()=>setLogin(true)}>Login</button></div>;
    </main>
  );
}