import http from 'http';
import fetch from 'node-fetch';

const server = http.createServer(async (req, res) => {
  // Discord webhook URL
  const discordWebhookURL = process.env.WEBHOOK; // Assuming you've set the environment variable

  try {
    // Function to send request details to Discord
    const sendToDiscord = async (method, url, headers, ip, body) => {
      // Format request details for Discord message
      let discordMessage = `
🚀 **Received Request Details** 🛰️
\`\`\`plaintext
📌 Method: ${method}
🌐 URL: ${url}
💻 Remote IP: ${ip}
\`\`\`
📎 **Headers** 📄
\`\`\`
${headers}
\`\`\``;

      // Include body section if request body exists
      if (body.trim() !== '') {
        discordMessage += `
📦 **Body** 📦
\`\`\`
${body}
\`\`\`
`;
      }

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
    };

    // Store request details
    const requestMethod = req.method;
    const requestUrl = req.url;
    const requestHeaders = Object.entries(req.headers).map(([key, value]) => `${key}: ${value}`).join('\n');

    // Get the client's IP address from x-forwarded-for
    const xForwardedFor = req.headers['x-forwarded-for'];
    const remoteIP = xForwardedFor ? xForwardedFor.split(',')[0] : 'Not available';

    let requestBody = '';

    // Capture request body for all request types except GET
    if (requestMethod !== 'GET') {
      let bodyChunks = [];
      req.on('data', (chunk) => {
        bodyChunks.push(chunk);
      });
      req.on('end', () => {
        requestBody = Buffer.concat(bodyChunks).toString();
        sendToDiscord(requestMethod, requestUrl, requestHeaders, remoteIP, requestBody);
      });
    } else {
      sendToDiscord(requestMethod, requestUrl, requestHeaders, remoteIP, requestBody);
    }
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end(`Error occurred while sending request details to Discord! ${error}`);
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
