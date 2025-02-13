import React from 'react';
import './app.css';
import {Login} from './login/login'
import {Library} from './library/library'


export default function App() {
    const [loginState, setloginState] = React.useState(false)
    let content = <div className="body bg-dark text-light">App will display here</div>;
    if (loginState) {
        content = <Library />;
    } else{
        content = <Login setLogin = {setloginState} />
    }
    return content
}
  