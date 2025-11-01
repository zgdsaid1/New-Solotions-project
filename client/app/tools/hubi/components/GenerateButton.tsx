"use client";

interface GenerateButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export function GenerateButton({
  onClick,
  disabled = false,
  loading = false,
}: GenerateButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className="mt-4 px-4 py-2 bg-purple-600 rounded hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium"
    >
      {loading ? "Generating..." : "Generate"}
    </button>
  );
}
