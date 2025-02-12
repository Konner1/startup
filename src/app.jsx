import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
    const [loginState, setloginset] = React.useState(false)
    const content = <div className="body bg-dark text-light">App will display here</div>;
    return content
}
  