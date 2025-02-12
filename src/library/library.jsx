import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import React from 'react';
import {MyPage} from '../mypage/mypage'
import {Buddies} from '../buddies/buddies'

export function Library() {
  return (
    <BrowserRouter>
    <main className='container-fluid bg-secondary text-center'>
            

        <nav>
          <NavLink to="/page">My Page</NavLink>
          <NavLink to="/buddies">Buddies</NavLink>
        </nav>

        <main>
          <Routes>
          <Route path="/" element={<MyPage />} />
            <Route path="/page" element={<MyPage />} />
            <Route path="/buddies" element={<Buddies />} />
          </Routes>
        </main>

    
      <div className="body bg-dark text-light">Library
      </div>;
    </main>
    </BrowserRouter>
  );
}