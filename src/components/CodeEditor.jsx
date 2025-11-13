import React from "react";
import Editor from "@monaco-editor/react";

// Maps simple language names to Monaco's internal IDs
const languageMap = {
  python: "python",
  javascript: "javascript",
  java: "java",
  cpp: "cpp",
};

function CodeEditor({ language, code, onChange }) {
  const monacoLanguage = languageMap[language] || "javascript";

  function handleEditorChange(value) {
    onChange(value);
  }

  return (
    <div
      className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 backdrop-blur-xl"
      style={{
        background: "rgba(255, 255, 255, 0.08)",
        boxShadow: "0 8px 32px rgba(31, 38, 135, 0.2)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.05))",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
        }}
      ></div>

      <Editor
        height="60vh"
        width="100%"
        language={monacoLanguage}
        value={code}
        onChange={handleEditorChange}
        theme="vs-dark"
        options={{
          fontSize: 15,
          minimap: { enabled: false },
          selectOnLineNumbers: true,
          wordWrap: "on",
          scrollBeyondLastLine: false,
          smoothScrolling: true,
          cursorSmoothCaretAnimation: true,
          scrollbar: {
            verticalScrollbarSize: 8,
            horizontalScrollbarSize: 8,
            alwaysConsumeMouseWheel: false,
          },
          lineNumbersMinChars: 3,
          roundedSelection: true,
          padding: { top: 10, bottom: 10 },
        }}
      />
    </div>
  );
}

export default CodeEditor;
