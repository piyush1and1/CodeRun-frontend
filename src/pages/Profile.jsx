import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { getSnippets, getSnippetById } from '../api/user';
import toast from 'react-hot-toast';

function BackgroundAnimation() {
  return (
    <div className="absolute top-0 left-0 w-full h-full">
      <div className="ball style1"></div>
      <div className="ball style2"></div>
      <div className="ball style3"></div>
      <div className="ball style4"></div>
      <div className="ball style5"></div>
      <div className="ball style6"></div>
      <div className="ball style7"></div>
    </div>
  );
}

function Profile({ user }) {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSnippet, setSelectedSnippet] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  // Fetch all snippet metadata
  useEffect(() => {
    async function fetchSnippets() {
      try {
        const data = await getSnippets();
        setSnippets(data.snippets);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to load snippets');
      } finally {
        setLoading(false);
      }
    }
    fetchSnippets();
  }, []);

  // Extract username from email
  const username = user?.email ? user.email.split('@')[0] : 'User';

  // Fetch full snippet when clicked
  const handleSnippetClick = async (snippetId) => {
    try {
      setModalLoading(true);
      const fullSnippet = await getSnippetById(snippetId);
      setSelectedSnippet(fullSnippet);
    } catch (error) {
      toast.error('Failed to load snippet code');
    } finally {
      setModalLoading(false);
    }
  };

  // Copy code to clipboard
  const copyCode = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success('Code copied to clipboard!');
    } catch {
      toast.error('Failed to copy code');
    }
  };

  return (
    <>
      {/* Prevent global scroll */}
      

      {/* Fullscreen layout */}
      <div className="animated-gradient-bg fixed inset-0 flex flex-col justify-start items-center text-gray-900 pt-[6rem] overflow-hidden">
        <BackgroundAnimation />

        <main className="relative z-20 w-full max-w-5xl px-6 flex flex-col gap-8 justify-center items-center">
          {/* Profile Info Card */}
          <div className="rounded-lg border border-black/10 bg-white/40 p-6 shadow-lg backdrop-blur-md w-full max-w-2xl">
            <h2 className="mb-2 text-3xl font-bold text-gray-900 text-center">Profile</h2>
            <p className="text-lg text-gray-800 text-center">
              Welcome, <strong>{username}</strong>
            </p>
            <p className="text-sm text-gray-600 text-center">
              Member since: {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Snippets Section */}
          <div className="rounded-lg border border-black/10 bg-white/40 p-6 shadow-lg backdrop-blur-md w-full max-w-5xl h-[55vh] overflow-y-auto">
            <h3 className="mb-6 text-2xl font-bold text-gray-900 text-center">Saved Snippets</h3>

            {loading ? (
              <div className="flex items-center justify-center gap-2 text-lg text-gray-700">
                <Loader2 className="h-6 w-6 animate-spin text-indigo-500" />
                <span>Loading snippets...</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {snippets.length === 0 ? (
                  <p className="rounded-lg border border-black/10 bg-white/40 p-10 text-lg italic text-gray-700 backdrop-blur-md md:col-span-2 text-center">
                    You have no saved snippets.
                  </p>
                ) : (
                  snippets.map((snippet) => (
                    <div
                      key={snippet._id}
                      onClick={() => handleSnippetClick(snippet._id)}
                      className="cursor-pointer rounded-lg border border-black/10 bg-white/40 p-5 shadow-md backdrop-blur-md transition-all duration-300 hover:bg-white/60 hover:shadow-lg"
                    >
                      <div className="mb-1 text-xl font-semibold text-indigo-600">
                        {snippet.title}
                      </div>
                      <div className="mb-3 font-mono text-sm text-gray-700">
                        Language: {snippet.language}
                      </div>
                      <div className="text-xs text-gray-500">
                        Saved on: {new Date(snippet.createdAt).toLocaleString()}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </main>

        {/* Modal Popup */}
        {selectedSnippet && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-3xl relative">
              {modalLoading ? (
                <div className="flex items-center justify-center gap-2 text-lg text-gray-700 py-10">
                  <Loader2 className="h-6 w-6 animate-spin text-indigo-500" />
                  <span>Loading snippet...</span>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold mb-3 text-indigo-600">{selectedSnippet.title}</h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Language: {selectedSnippet.language}
                  </p>
                  <pre className="bg-gray-900 text-green-400 text-sm p-4 rounded-lg overflow-x-auto max-h-[60vh] whitespace-pre-wrap">
                    {selectedSnippet.code || '// No code available'}
                  </pre>

                  <div className="flex justify-end gap-3 mt-5">
                    <button
                      onClick={() => copyCode(selectedSnippet.code)}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg"
                    >
                      Copy Code
                    </button>
                    <button
                      onClick={() => setSelectedSnippet(null)}
                      className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg"
                    >
                      Close
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Background Animation CSS */}
        <style>{`
          @keyframes animated-gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animated-gradient-bg {
            background-image: linear-gradient(135deg, #FFD6E0, #E7C6FF, #C8B6FF);
            background-size: 200% 200%;
            animation: animated-gradient 15s ease-in-out infinite;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -10;
          }
          .ball {
            position: absolute;
            top: 0;
            border-radius: 50%;
            animation: run 20s linear infinite;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
            filter: blur(1px);
            z-index: 10;
          }
          @keyframes run {
            0% { transform: translateX(-150px) translateY(0); }
            100% { transform: translateX(110vw) translateY(10vh); }
          }
          .ball.style1 { width: 50px; height: 50px; top: 10%; animation-duration: 25s; animation-delay: -5s; background-color: rgba(254, 240, 138, 0.8); }
          .ball.style2 { width: 80px; height: 80px; top: 30%; animation-duration: 20s; animation-delay: -10s; background-color: rgba(192, 132, 252, 0.8); }
          .ball.style3 { width: 30px; height: 30px; top: 50%; animation-duration: 30s; animation-delay: -2s; background-color: rgba(251, 146, 60, 0.8); }
          .ball.style4 { width: 60px; height: 60px; top: 70%; animation-duration: 18s; animation-delay: -18s; background-color: rgba(125, 211, 252, 0.8); }
          .ball.style5 { width: 40px; height: 40px; top: 85%; animation-duration: 22s; animation-delay: -3s; background-color: rgba(248, 113, 113, 0.8); }
          .ball.style6 { width: 120px; height: 120px; top: 5%; animation-duration: 40s; animation-delay: -20s; background-color: rgba(74, 222, 128, 0.8); }
          .ball.style7 { width: 70px; height: 70px; top: 60%; animation-duration: 28s; animation-delay: -15s; background-color: rgba(250, 204, 21, 0.8); }
        `}</style>
      </div>
    </>
  );
}

export default Profile;
