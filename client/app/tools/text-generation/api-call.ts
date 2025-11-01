interface ApiCallParams {
  prompt: string;
}

interface ApiResponse {
  response?: string;
  error?: string;
}

export async function callTextGenerationApi(
  params: ApiCallParams,
): Promise<ApiResponse> {
  try {
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: params.prompt }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("API call failed:", error);
    return {
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
