// Define the interface for the environment variables passed to the handler
interface Env {
  DISCORD_WEBHOOK_URL: string;
}

// Define the handler for the POST request
export const onRequestPost = async ({ request, env }: { request: Request, env: Env }): Promise<Response> => {
  try {
    // 1. Validate environment secret
    const webhookUrl = env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      return new Response('DISCORD_WEBHOOK_URL not configured.', { status: 500 });
    }

    // 2. Parse the request body containing the Discord payload
    // We assume the client has already constructed the correct Discord payload
    const body = await request.json();

    // 3. Proxy the request to the Discord Webhook
    const discordResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    // 4. Return Discord's response status
    if (!discordResponse.ok) {
      console.error('Discord API Error:', discordResponse.status, discordResponse.statusText);
      return new Response('Failed to submit to Discord.', { status: discordResponse.status });
    }

    return new Response('Submission successful.', { status: 200 });

  } catch (error) {
    console.error('Pages Function error:', error);
    return new Response('Internal Server Error.', { status: 500 });
  }
};
