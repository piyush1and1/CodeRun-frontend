import React from "react";

export default function TypingLoader() {
  const codeLines = [
    "Initializing Compiler...",
    "Fetching Environment Variables...",
    "Connecting to Execution Sandbox...",
    "Running Code...",
  ];

  return (
    <>
      {/* Inline Styles for CSS Animations */}
      <style>
        {`
          /* Line fade-in + upward motion */
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(5px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* Dots pulse animation */
          @keyframes pulseOpacity {
            0%, 100% {
              opacity: 0.4;
            }
            50% {
              opacity: 1;
            }
          }

          .motion-line {
            opacity: 0;
            animation: fadeInUp 0.5s ease-out forwards;
          }

          .motion-dots {
            animation: pulseOpacity 1.5s infinite;
          }
        `}
      </style>

      {/* Main Loader */}
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-pink-100 to-pink-200 text-pink-700 font-mono text-sm">
        {/* Terminal Box */}
        <div className="w-[350px] bg-white/50 p-6 rounded-lg shadow-lg border border-pink-300">
          {codeLines.map((line, index) => (
            <div
              key={index}
              className="motion-line"
              style={{ animationDelay: `${index * 0.8}s` }}
            >
              <span className="text-pink-600">❯</span> {line}
            </div>
          ))}
        </div>

        {/* Dots Loader */}
        <div className="motion-dots mt-6 flex space-x-2">
          <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
          <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
          <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
        </div>
      </div>
    </>
  );
}
