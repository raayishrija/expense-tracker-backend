import { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

export default function App() {
  const [username, setUsername] = useState(localStorage.getItem('username'));

  const handleLogin = (uname) => setUsername(uname);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUsername(null);
  };

  return username
    ? <Dashboard username={username} onLogout={handleLogout} />
    : <Login onLogin={handleLogin} />;
}
