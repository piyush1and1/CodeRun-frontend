import React from "react";

function InputBox({ value, onChange }) {
  return (
    <div className="w-full mt-6">
      {/* Label */}
      <h3 className="text-lg font-semibold text-gray-800 mb-2 drop-shadow-sm">
        Input <span className="text-gray-500 text-sm">(stdin):</span>
      </h3>

      {/* Glass textarea */}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter standard input (if any)"
        className="w-full h-48 p-3 rounded-xl font-mono text-gray-900 placeholder-gray-400
                   bg-white/20 border border-white/30 backdrop-blur-xl
                   shadow-lg resize-none transition-all duration-300 
                   focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/30"
      ></textarea>

      {/* Internal glow hover animation */}
      <style>{`
        textarea::-webkit-scrollbar {
          width: 8px;
        }
        textarea::-webkit-scrollbar-thumb {
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
        }
        textarea:hover {
          box-shadow: 0 0 20px rgba(168, 85, 247, 0.2);
        }
      `}</style>
    </div>
  );
}

export default InputBox;
