const fetch = require('node-fetch');

const handleRequest = async (request) => {
  // Discord webhook URL
  const discordWebhookURL = process.env.WEBHOOK; // Assuming you've set the environment variable

  try {
    // Store request details
    const requestMethod = request.method;
    const requestUrl = request.url;
    const requestHeaders = Array.from(request.headers).map(([key, value]) => `${key}: ${value}`);

    // Remote IP (You need to replace this logic with the way you get the IP in Node.js)
    const remoteIP = 'Not available';

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

// Example usage (mocking a request object)
const request = {
  method: 'GET',
  url: 'https://example.com',
  headers: new Map([['Content-Type', 'application/json']]), // Example headers
};

handleRequest(request)
  .then(console.log)
  .catch(console.error);
