export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Forward request to backend server
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ai`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    
    return Response.json(data);
  } catch (error) {
    console.error('API route error:', error);
    return Response.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}