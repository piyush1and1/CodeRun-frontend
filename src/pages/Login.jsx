import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { requestOTP } from '../api/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await requestOTP(email);
      toast.success('OTP sent to your email!');
      navigate('/verify-otp', { state: { email } });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

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
          animation: gradientMove 10s ease infinite; 
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
        }
      `}</style>

      {/* Full screen container */}
      <div className="animated-bg fixed inset-0 flex justify-center items-center bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600">
        {/* Blob 1 */}
        <div className="absolute top-20 -left-20 w-72 h-72 bg-yellow-300 rounded-full opacity-80 blur-3xl animate-blob-1"></div>
        {/* Blob 2 */}
        <div className="absolute bottom-20 -right-20 w-80 h-80 bg-teal-300 rounded-full opacity-70 blur-3xl animate-blob-2"></div>

        {/* Glassmorphism Card */}
        <div className="relative z-10 max-w-md w-full mx-auto p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20">
          <h2 className="text-3xl font-bold text-center text-white mb-8">
            Secure Login
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-200 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 bg-white/20 text-white border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-gray-300"
                placeholder="you@example.com"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-white text-purple-700 font-semibold rounded-lg shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {loading ? 'Sending...' : 'Request OTP'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
