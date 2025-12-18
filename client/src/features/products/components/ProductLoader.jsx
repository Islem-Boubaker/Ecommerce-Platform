import React from "react";

export default function ProductLoader({ text = "Loading...", error = false, onRetry }) {
  return (
    <div className="min-h-screen flex items-center justify-center text-center">
      <div>
        <div className="text-6xl mb-4">{error ? "⚠️" : "⏳"}</div>
        <p className="text-xl text-gray-700 mb-4">{text}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
          >
            Go Back
          </button>
        )}
      </div>
    </div>
  );
}
