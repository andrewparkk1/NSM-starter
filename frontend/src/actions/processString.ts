export async function processString(text: string) {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_DEV_BACKEND_URL;
    if (!backendUrl) throw new Error('Backend URL is not defined');
    
    const response = await fetch(`${backendUrl}/process_string`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error processing string:', error);
    return { status: 'error', message: error instanceof Error ? error.message : 'Unknown error' };
  }
}
