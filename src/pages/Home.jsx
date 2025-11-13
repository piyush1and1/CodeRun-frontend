import React from "react";
import { Link } from "react-router-dom";
import { FaNodeJs, FaPython, FaJava, FaJsSquare } from "react-icons/fa";

const AnimationStyles = () => (
  <style>{`
    @keyframes float-1 {
      0% { transform: translate(0, 0); opacity: 0.7; }
      25% { transform: translate(30vw, -20vh) scale(1.1); }
      50% { transform: translate(10vw, 20vh); opacity: 1; }
      75% { transform: translate(-20vw, -10vh) scale(0.9); }
      100% { transform: translate(0, 0); opacity: 0.7; }
    }
    @keyframes float-2 {
      0% { transform: translate(0, 0); opacity: 0.8; }
      25% { transform: translate(-25vw, 15vh); }
      50% { transform: translate(10vw, -30vh) scale(1.1); opacity: 1; }
      75% { transform: translate(20vw, 10vh); }
      100% { transform: translate(0, 0); opacity: 0.8; }
    }
    @keyframes float-3 {
      0% { transform: translate(0, 0); opacity: 0.9; }
      25% { transform: translate(-20vw, -20vh) scale(0.9); }
      50% { transform: translate(15vw, 30vh); opacity: 0.7; }
      75% { transform: translate(30vw, -10vh) scale(1.1); }
      100% { transform: translate(0, 0); opacity: 0.9; }
    }
    @keyframes float-4 {
      0% { transform: translate(0, 0); opacity: 1; }
      25% { transform: translate(10vw, 30vh); }
      50% { transform: translate(-30vw, 10vh) scale(1); }
      75% { transform: translate(15vw, -25vh) opacity: 0.8; }
      100% { transform: translate(0, 0); opacity: 1; }
    }

    .animate-float-1 { animation: float-1 15s ease-in-out infinite; }
    .animate-float-2 { animation: float-2 20s ease-in-out infinite; }
    .animate-float-3 { animation: float-3 18s ease-in-out infinite; }
    .animate-float-4 { animation: float-4 16s ease-in-out infinite; }

    /* Match Login.jsx behavior: no scroll, full viewport, clean edges */
    html, body {
      height: 100%;
      overflow: hidden;
      font-family: "Inter", sans-serif;
    }
  `}</style>
);

export default function Home() {
  const NAV_HEIGHT = 0;

  return (
    <>
      <AnimationStyles />

      <div
        className="fixed left-0 right-0 bottom-0 flex flex-col justify-center items-center text-center overflow-hidden"
        style={{
          top: `${NAV_HEIGHT}px`,
          height: `calc(100vh - ${NAV_HEIGHT}px)`,
          background: "linear-gradient(135deg, #FFD1DC, #E0BBE4, #C2E9FB)",
        }}
      >
        <div
          className="animate-float-1 absolute flex items-center justify-center rounded-full bg-white/60 w-24 h-24 top-1/4 left-1/4"
          style={{ animationDelay: "-1s" }}
        >
          <FaJava className="text-[#f89820] text-5xl" />
        </div>

        <div
          className="animate-float-2 absolute flex items-center justify-center rounded-full bg-white/60 w-20 h-20 top-1/2 left-[15%]"
          style={{ animationDuration: "18s" }}
        >
          <FaPython className="text-[#3776AB] text-4xl" />
        </div>

        <div
          className="animate-float-3 absolute flex items-center justify-center rounded-full bg-white/60 w-28 h-28 top-[15%] right-[20%]"
          style={{ animationDelay: "-3s" }}
        >
          <FaJsSquare className="text-[#F7DF1E] text-6xl" />
        </div>

        <div
          className="animate-float-4 absolute flex items-center justify-center rounded-full bg-white/60 w-24 h-24 top-3/4 right-[25%]"
          style={{ animationDuration: "14s" }}
        >
          <FaNodeJs className="text-[#68A063] text-5xl" />
        </div>

        <div className="relative z-20 bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl p-8 md:p-12 max-w-3xl border border-white/30">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight text-gray-900">
            Welcome to CodeRun!
            <br/>
          </h1>

          <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed">
            Instantly compile and run C++, Java, Python, and JavaScript online. Login to save your code and snippets.
          </p>

          <Link
            to="/editor"
            className="inline-block px-10 py-3 bg-gradient-to-r from-pink-500 to-blue-500 text-white text-lg font-semibold 
                       rounded-lg shadow-lg transform transition-all duration-300 ease-in-out
                       hover:scale-105 hover:shadow-blue-500/30 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            start coding now
          </Link>
        </div>
      </div>
    </>
  );
}