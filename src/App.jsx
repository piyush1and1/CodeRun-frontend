import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { getProfile } from './api/user';

// Components
import Navbar from './components/navbar.jsx';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import VerifyOTP from './pages/VerifyOTP';
import Editor from './pages/Editor';
import Profile from './pages/Profile';
import TypingLoader from './components/TypingLoader.jsx';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On initial app load, check if we're already logged in (via cookie)
  useEffect(() => {
    async function checkAuth() {
      try {
        const { user } = await getProfile();
        setUser(user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  // Show a loading spinner or message while checking auth
  if (loading) {
    return <TypingLoader />;
  }

  return (
    <>
      {/* Pass user state to Navbar so it can show correct links */}
      <Navbar user={user} setUser={setUser} />
      
      {/* Main content area */}
      <div className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor" element={<Editor />} />
          
          {/* Pass the setUser function to Login and VerifyOTP */}
          <Route 
            path="/login" 
            element={user ? <Navigate to="/profile" /> : <Login />} 
          />
          <Route 
            path="/verify-otp" 
            element={user ? <Navigate to="/profile" /> : <VerifyOTP setUser={setUser} />} 
          />
          
          {/* Protected Route: Only allow if 'user' is not null */}
          <Route 
            path="/profile" 
            element={user ? <Profile user={user} /> : <Navigate to="/login" />} 
          />
          
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;