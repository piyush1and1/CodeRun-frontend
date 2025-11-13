import React, { useState, useRef, useEffect } from "react";
import { FaPython, FaJava, FaJsSquare } from "react-icons/fa";
import { SiCplusplus } from "react-icons/si";

const supportedLanguages = [
  { value: "javascript", label: "JavaScript", icon: <FaJsSquare className="text-yellow-400" /> },
  { value: "python", label: "Python", icon: <FaPython className="text-blue-500" /> },
  { value: "java", label: "Java", icon: <FaJava className="text-orange-500" /> },
  { value: "cpp", label: "C++", icon: <SiCplusplus className="text-sky-400" /> },
];

function LanguageSelector({ language, onSelectLanguage }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLang =
    supportedLanguages.find((lang) => lang.value === language) || supportedLanguages[0];

  return (
    <div className="relative inline-block text-left w-60" ref={dropdownRef}>
      {/*<label className="block text-lg font-semibold text-gray-800 mb-2">Language:</label>*/}

      {/* Selected box */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full rounded-xl px-4 py-2 bg-white/20 
                    backdrop-blur-xl border border-white/30 shadow-lg transition-all duration-300 
                    hover:bg-white/30 focus:ring-2 focus:ring-purple-400`}
      >
        <div className="flex items-center gap-2 text-gray-900 font-medium">
          {selectedLang.icon}
          {selectedLang.label}
        </div>
        <span
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          } text-gray-800`}
        >
          ▼
        </span>
      </button>

      {/* Dropdown list */}
      {isOpen && (
        <div
          className="absolute left-0 right-0 mt-2 bg-white/20 backdrop-blur-2xl border border-white/30 
                     rounded-xl shadow-2xl z-50 overflow-hidden animate-fadeIn"
        >
          {supportedLanguages.map((lang) => (
            <button
              key={lang.value}
              onClick={() => {
                onSelectLanguage(lang.value);
                setIsOpen(false);
              }}
              className={`flex items-center gap-3 w-full px-4 py-2 text-gray-900 font-medium 
                         transition-all duration-200 hover:bg-white/40 ${
                           language === lang.value ? "bg-white/40 text-indigo-700" : ""
                         }`}
            >
              {lang.icon}
              {lang.label}
            </button>
          ))}
        </div>
      )}

      {/* Smooth fade-in animation */}
      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(-6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
      `}</style>
    </div>
  );
}

export default LanguageSelector;
