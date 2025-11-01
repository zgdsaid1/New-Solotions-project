"use client";

import { useState } from "react";

export default function TextGenerationPage() {
      const [input, setInput] = useState("");
        const [response, setResponse] = useState("");

          async function handleGenerate() {
                const res = await fetch("/api/ai", {
                          method: "POST",
                                headers: { "Content-Type": "application/json" },
                                      body: JSON.stringify({ prompt: input })
                });
                    const data = await res.json();
                        setResponse(data.output || "No response");
          }

            return (
                    <div className="max-w-2xl mx-auto py-12">
                          <h1 className="text-3xl font-bold mb-4">Text Generation</h1>

                                <textarea
                                        className="w-full p-3 rounded border bg-neutral-900"
                                                rows={4}
                                                        placeholder="Enter your prompt..."
                                                                value={input}
                                                                        onChange={(e) => setInput(e.target.value)}
                                                                              />

                                                                                    <button
                                                                                            onClick={handleGenerate}
                                                                                                    className="mt-4 px-4 py-2 bg-purple-600 rounded hover:bg-purple-700"
                                                                                                          >
                                                                                                                  Generate
                                                                                                                        </button>

                                                                                                                              <div className="mt-6 p-4 rounded bg-neutral-800">
                                                                                                                                      {response}
                                                                                                                                            </div>
                                                                                                                                                </div>
            );
}