import React, { useState } from "react";
import { compileCode } from "../api/compiler";
import { saveSnippet } from "../api/user";
import toast from "react-hot-toast";
import CodeEditor from "../components/CodeEditor";
import LanguageSelector from "../components/LanguageSelector";
import InputBox from "../components/InputBox";
import OutputPanel from "../components/OutputPanel";
import { Play, Save } from "lucide-react";


function Editor() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("// Welcome to CodeRun!\n");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [snippetTitle, setSnippetTitle] = useState("");

  const handleRun = async () => {
    setIsLoading(true);
    setOutput(null);
    setError(null);
    try {
      const result = await compileCode(language, code, input);
      if (result.statusId === 3) {
        setOutput(result.output);
        toast.success("Execution successful!");
      } else {
        setError(result.error || result.output || "Unknown error");
        toast.error("Execution failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to connect to server");
      toast.error(err.response?.data?.message || "Execution failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!snippetTitle) {
      toast.error("Please enter a title for your snippet.");
      return;
    }
    try {
      await saveSnippet({ title: snippetTitle, language, code });
      toast.success("Snippet saved successfully!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "You must be logged in to save."
      );
    }
  };

  return (
    <>
      <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        body {
          overflow: hidden;
        }
        .editor-bg {
          background: linear-gradient(120deg, #a18cd1, #fbc2eb, #fad0c4, #a6c1ee);
          background-size: 400% 400%;
          animation: gradientMove 12s ease infinite;
        }
      `}</style>

<div
  className="editor-bg fixed inset-0 p-6 md:p-16 flex flex-col md:flex-row gap-6 backdrop-blur-xl overflow-hidden"
  style={{
    paddingTop: "90px", // adjust if you have a navbar
  }}
>

        {/* Left Side — Editor Panel */}
        <div className=" flex flex-col flex-[3] bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl shadow-2xl p-5 space-y-4">
          <LanguageSelector language={language} onSelectLanguage={setLanguage} />

          <div className="flex-1 min-h-[300px]">
            <CodeEditor language={language} code={code} onChange={setCode} />
          </div>

          <div className="flex flex-col md:flex-row gap-3 mt-2">
            <button
              onClick={handleRun}
              disabled={isLoading}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-gradient-to-r from-green-400 to-emerald-600 text-white font-semibold shadow-md hover:opacity-90 transition disabled:opacity-60"
            >
              <Play className="h-5 w-5" />
              {isLoading ? "Running..." : "Run Code"}
            </button>

            <input
              type="text"
              placeholder="Snippet Title..."
              value={snippetTitle}
              onChange={(e) => setSnippetTitle(e.target.value)}
              className="flex-1 px-4 py-2 bg-white/20 text-gray-900 placeholder-gray-600 rounded-xl border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-300"
            />

            <button
              onClick={handleSave}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-md hover:opacity-90 transition"
            >
              <Save className="h-5 w-5" />
              Save Snippet
            </button>
          </div>
        </div>

        {/* Right Side — Input/Output Panel */}
        <div className="flex flex-col flex-[2] bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl shadow-2xl p-5 space-y-4">
          <InputBox value={input} onChange={setInput} />

          <OutputPanel output={output} error={error} isLoading={isLoading} />
        </div>
      </div>
    </>
  );
}

export default Editor;
