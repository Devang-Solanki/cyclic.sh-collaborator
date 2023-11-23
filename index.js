import fetch from 'node-fetch';

const handleRequest = async (request) => {
  // Discord webhook URL
  const discordWebhookURL = process.env.WEBHOOK; // Assuming you've set the environment variable

  try {
    // Store request details
    const requestMethod = request.method;
    const requestUrl = request.url;
    const requestHeaders = Object.entries(request.headers).map(([key, value]) => `${key}: ${value}`);

    // Get the client's IP address from x-forwarded-for
    const xForwardedFor = request.headers['x-forwarded-for'];
    const remoteIP = xForwardedFor ? xForwardedFor.split(',')[0] : 'Not available';

    // Format request details for Discord message
    const discordMessage = `
🚀 **Received Request Details** 🛰️
\`\`\`plaintext
📌 Method: ${requestMethod}
🌐 URL: ${requestUrl}
💻 Remote IP: ${remoteIP}
\`\`\`
📎 **Headers** 📄
\`\`\`
${requestHeaders.join('\n')}
\`\`\`
`;

    // Send formatted message to Discord webhook
    await fetch(discordWebhookURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: discordMessage,
      }),
    });

    return 'Request details sent to Discord webhook!';
  } catch (error) {
    return `Error occurred while sending request details to Discord! ${error}`;
  }
};
