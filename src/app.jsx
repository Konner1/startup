
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './login/login';
import { MyPage } from './mypage/mypage';
import { Buddies } from './buddies/buddies';

export default function App() {
  const [loginState, setLoginState] = React.useState(!!localStorage.getItem('loggedInUser'));

  return (
    <BrowserRouter>
      <Routes>
        {/* The root route ("/") is the login page when not logged in */}
        <Route path="/" element={loginState ? <MyPage setLoginState={setLoginState} /> : <Login setLogin={setLoginState} />} />
        <Route path="/page" element={<MyPage setLoginState={setLoginState} />} />
        <Route path="/buddies" element={<Buddies setLoginState={setLoginState} />} />
      </Routes>
    </BrowserRouter>
  );
}


  