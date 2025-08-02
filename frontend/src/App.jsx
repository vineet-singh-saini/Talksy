import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import { BrowserRouter as Router, Navigate } from 'react-router-dom';

function App() {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  useEffect(() => {
  const handleUnloaded = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  window.addEventListener('beforeunload', handleUnloaded);

  return () => {
    window.removeEventListener('beforeunload', handleUnloaded);
  };
}, []);

  return (
    <>
      <div className="app">
        <Router>
          <Routes>
            <Route
              path="/"
              element={user && token ? <Home /> : <Navigate to="/login" />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
