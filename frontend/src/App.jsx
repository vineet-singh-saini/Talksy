import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import { BrowserRouter as Router, Navigate } from 'react-router-dom';
import { useEffect } from 'react';

function App() {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const token = sessionStorage.getItem('token');

  useEffect(() => {
  const handleUnloaded = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
  };

  window.addEventListener('beforeunload', handleUnloaded);

  return () => {
    window.removeEventListener('beforeunload', handleUnloaded);
  };
}, []);

  // useEffect(() => {
  //   sessionStorage.removeItem('token');
  //   sessionStorage.removeItem('user');
  // }, []);

  return (
    <>
      <div className="app">
        
          <Routes>
            {/* <Route
              path="/"
              element={token && user ? <Home /> : <Navigate to="/login" />}
            /> */}
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        
      </div>
    </>
  )
}

export default App
