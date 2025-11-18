import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { getProfile } from "./api/user";

// Components
import Navbar from "./components/Navbar.jsx";
import TypingLoader from "./components/TypingLoader.jsx";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import VerifyOTP from "./pages/VerifyOTP";
import Editor from "./pages/Editor";
import Profile from "./pages/Profile";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Runs only once on first load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const result = await getProfile();

        // backend returns { user: {...} }
        if (result?.user) {
          setUser(result.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Show loader until login check finished
  if (loading) return <TypingLoader />;

  return (
    <>
      <Navbar user={user} setUser={setUser} />

      <Toaster position="top-center" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<Editor />} />

        {/* Public routes */}
        <Route
          path="/login"
          element={user ? <Navigate to="/profile" /> : <Login />}
        />

        <Route
          path="/verify-otp"
          element={
            user ? <Navigate to="/profile" /> : <VerifyOTP setUser={setUser} />
          }
        />

        {/* Protected route */}
        <Route
          path="/profile"
          element={user ? <Profile user={user} /> : <Navigate to="/login" />}
        />

        {/* Redirect unknown paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
