import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyOTP } from '../api/auth';
import toast, { Toaster } from 'react-hot-toast';

export default function VerifyOTP({ setUser }) {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get email passed from Login page
  const email = location.state?.email;

  // Redirect to login if no email
  useEffect(() => {
    if (!email) {
      navigate('/login');
    }
  }, [email, navigate]);

  // Handle OTP verification
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await verifyOTP(email, otp);
      setUser(data.user); // Update global auth state
      toast.success(data.message);
      navigate('/profile');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid or expired OTP');
    } finally {
      setLoading(false);
    }
  };

  if (!email) return null; // Prevent rendering before redirect

  return (
    <>
      <Toaster position="top-center" />

      <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animated-bg {
          background-size: 400% 400%;
          animation: gradientMove 15s ease infinite; 
        }
        @keyframes blobMove1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(40px, -60px) scale(1.1); }
          50% { transform: translate(0, 80px) scale(0.9); }
          75% { transform: translate(-50px, -30px) scale(1.05); }
        }
        @keyframes blobMove2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(-30px, 50px) scale(0.9); }
          50% { transform: translate(40px, -40px) scale(1.1); }
          75% { transform: translate(-20px, 60px) scale(1.0); }
        }
        .animate-blob-1 { animation: blobMove1 8s ease infinite; }
        .animate-blob-2 { animation: blobMove2 7s ease infinite 2s; }

        /* Prevent scrolling and fix viewport */
        html, body {
          height: 100%;
          overflow: hidden;
      `}</style>

      <div className="animated-bg fixed inset-0 flex justify-center items-center h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 overflow-hidden">
        <div className="absolute top-20 -left-20 w-72 h-72 bg-yellow-300 rounded-full opacity-80 blur-3xl animate-blob-1"></div>
        <div className="absolute bottom-20 -right-20 w-80 h-80 bg-teal-300 rounded-full opacity-70 blur-3xl animate-blob-2"></div>

        <div className="relative z-10 max-w-md w-full mx-auto p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20">
          <h2 className="text-3xl font-bold text-center text-white mb-4">
            Verify OTP
          </h2>

          <p className="text-center text-gray-200 mb-6">
            An OTP was sent to <strong>{email}</strong>.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-200 mb-2"
              >
                OTP
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                maxLength={6}
                className="w-full px-4 py-2 bg-white/20 text-white border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-gray-300"
                placeholder="Enter 6-digit OTP"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-white text-purple-700 font-semibold rounded-lg shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {loading ? 'Verifying...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
