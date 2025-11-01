"use client";

import { useState } from "react";
import { callTextGenerationApi } from "./api-call";
import { TextArea } from "./components/TextArea";
import { GenerateButton } from "./components/GenerateButton";
import { ResponseDisplay } from "./components/ResponseDisplay";

export default function TextGenerationPage() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!input.trim()) {
      setError("Please enter a prompt");
      return;
    }

    setLoading(true);
    setError("");
    setResponse("");

    try {
      const result = await callTextGenerationApi({ prompt: input });

      if (result.error) {
        setError(result.error);
      } else {
        setResponse(result.response || "No response received");
      }
    } catch (err) {
      setError("Failed to generate text. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-white">Text Generation</h1>

      <div className="space-y-4">
        <TextArea
          value={input}
          onChange={setInput}
          placeholder="Enter your prompt..."
          rows={4}
        />

        <GenerateButton
          onClick={handleGenerate}
          loading={loading}
          disabled={!input.trim()}
        />

        <ResponseDisplay response={response} error={error} />
      </div>
    </div>
  );
}
