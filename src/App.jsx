import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { getProfile } from './api/user';

// Components
import Navbar from './components/Navbar.jsx';
import TypingLoader from './components/TypingLoader.jsx';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import VerifyOTP from './pages/VerifyOTP';
import Editor from './pages/Editor';
import Profile from './pages/Profile';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check auth status when app loads
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await getProfile();
        setUser(res.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  // Loading screen while checking authentication
  if (loading) {
    return <TypingLoader />;
  }

  return (
    <>
      {/* Navbar receives user state */}
      <Navbar user={user} setUser={setUser} />

      <Toaster position="top-center" />

      <div className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor" element={<Editor />} />

          {/* Login & OTP */}
          <Route
            path="/login"
            element={user ? <Navigate to="/profile" /> : <Login />}
          />

          <Route
            path="/verify-otp"
            element={
              user ? (
                <Navigate to="/profile" />
              ) : (
                <VerifyOTP setUser={setUser} />
              )
            }
          />

          {/* Protected Profile Route */}
          <Route
            path="/profile"
            element={
              user ? (
                <Profile user={user} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
