import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './Login';
import Home from './Home';
function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  return (
    <div className="App">
      {!token ? <Login onLogin={handleLogin} /> : <Home />}
    </div>
  );
}

export default App
