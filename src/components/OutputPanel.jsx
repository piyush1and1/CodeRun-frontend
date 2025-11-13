import React from "react";

function OutputPanel({ output, error, isLoading }) {
  // Determine content and style dynamically
  let content = "Click \"Run\" to see the output.";
  let stateColor = "text-gray-700"; // Default text color
  let glow = "shadow-[inset_0_0_10px_rgba(255,255,255,0.1)]"; // Subtle inner glow

  if (isLoading) {
    content = "⏳ Executing...";
    stateColor = "text-indigo-600 animate-pulse";
  } else if (error) {
    content = error;
    stateColor = "text-red-500";
    glow = "shadow-[inset_0_0_15px_rgba(255,0,0,0.2)]";
  } else if (output) {
    content = output;
    stateColor = "text-emerald-600";
    glow = "shadow-[inset_0_0_15px_rgba(16,185,129,0.2)]";
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-2 drop-shadow-sm">
        Output:
      </h3>

      {/* Glass Output Box */}
      <pre
        className={`w-full h-[300px] rounded-xl p-4 font-mono text-sm overflow-y-auto whitespace-pre-wrap 
          bg-white/20 border border-white/30 backdrop-blur-xl 
          ${glow} transition-all duration-300 ease-in-out ${stateColor}`}
      >
        {content}
      </pre>

      {/* Custom scrollbar and effect */}
      <style>{`
        pre::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        pre::-webkit-scrollbar-thumb {
          background-color: rgba(0, 0, 0, 0.25);
          border-radius: 10px;
        }
        pre:hover {
          box-shadow: 0 0 25px rgba(168, 85, 247, 0.25);
        }
      `}</style>
    </div>
  );
}

export default OutputPanel;
