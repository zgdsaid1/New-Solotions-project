"use client";

interface ResponseDisplayProps {
  response: string;
  error?: string;
}

export function ResponseDisplay({ response, error }: ResponseDisplayProps) {
  return (
    <div className="mt-6 p-4 rounded bg-neutral-800 text-white min-h-[100px]">
      {error ? (
        <div className="text-red-400">
          <strong>Error:</strong> {error}
        </div>
      ) : response ? (
        <div className="whitespace-pre-wrap">{response}</div>
      ) : (
        <div className="text-neutral-400 italic">
          Generated text will appear here...
        </div>
      )}
    </div>
  );
}
