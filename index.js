import http from 'http';
import fetch from 'node-fetch';

const server = http.createServer(async (req, res) => {
  // Discord webhook URL
  const discordWebhookURL = process.env.WEBHOOK; // Assuming you've set the environment variable

  try {
    // Store request details
    const requestMethod = req.method;
    const requestUrl = req.url;
    const requestHeaders = Object.entries(req.headers).map(([key, value]) => `${key}: ${value}`).join('\n');

    // Get the client's IP address from x-forwarded-for
    const xForwardedFor = req.headers['x-forwarded-for'];
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
${requestHeaders}
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

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Request details sent to Discord webhook!');
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end(`Error occurred while sending request details to Discord! ${error}`);
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
