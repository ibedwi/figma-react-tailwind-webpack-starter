import React, { useEffect, useCallback, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { FigmaMessage } from "../messages";
import { HiOutlineCog } from "react-icons/hi";

function App() {
  const onSendMessage = () => {
    const message: FigmaMessage = {
      type: "send-message-to-backend",
    };
    parent.postMessage({ pluginMessage: message }, "*");
  };

  const figmaMessageListener = useCallback((event: MessageEvent) => {
    const message = event.data.pluginMessage as FigmaMessage;

    if (message.type === "send-message-to-ui") {
      console.log("message from backend");
    }
  }, []);

  useEffect(() => {
    window.addEventListener("message", figmaMessageListener);
    return () => {
      window.removeEventListener("message", figmaMessageListener);
    };
  }, [figmaMessageListener]);

  return (
    <div className="p-4">
      <div className="w-full flex flex-col items-center mb-5">
        <HiOutlineCog size={50} className="animate-spin" />
        <h1 className="text-xl">Figma React + Tailwind + Webpack Starter</h1>
        <h2 className="text-md text-gray-400">Plugin starter</h2>
      </div>

      <div className="mt-6 w-full flex justify-center">
        <button
          onClick={onSendMessage}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Send Message to Figma
        </button>
      </div>
    </div>
  );
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("react-page")!;
  const root = createRoot(container);
  root.render(<App />);
});
