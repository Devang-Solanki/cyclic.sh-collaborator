<p align="center">
  <a href="https://cyclic.sh/"><img src="https://docs.cyclic.sh/img/cyclic-logo.svg" alt="recon.cloud"></a>
  <br>
</p>
<p align="center">
<a href="https://unlicense.org/"><img src="https://img.shields.io/badge/license-Unlicense-_red.svg"></a>
<a href="https://twitter.com/devangsolankii"><img src="https://img.shields.io/twitter/follow/devangsolankii.svg?logo=twitter"></a>
<img src="https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat">
</p>

<h1 align="center">
<img src="https://i.ibb.co/d5rmXM5/Screenshot-2023-11-23-at-14-47-58-Discord-A-New-Way-to-Chat-with-Friends-Communities.png" alt="Screenshot-2023-11-23-at-14-47-58-Discord-A-New-Way-to-Chat-with-Friends-Communities" border="0">
  <br>
</h1>


This project sets up a straightforward HTTP server using Node.js, redirecting all incoming requests to a Discord channel. It is an alternative to tools like Burp Suite Collaborator, forwarding requests to a Discord channel using cyclic.sh.

#### ✨ Features
- HTTP Server: Listens for incoming HTTPS requests. (The current setup doesn't function with HTTP requests. If anyone knows how to address this issue, please create a ticket or issue for further discussion and resolution.)
- Discord Webhook Integration: Sends request details (URL, method, headers, client's IP) to a Discord channel via a provided webhook URL.

#### 🚀 How It Works

The code establishes an HTTP server that monitors incoming requests. When a request is received, it extracts specifics like the request method, URL, headers, and client's IP address. These details are then structured into a message and dispatched to a designated Discord channel using a webhook URL.

#### ⚙️ Setup
- Fork this Repository: Create a copy of this repository in your GitHub account.
- Deploy New App: Use Cyclic.sh to deploy a new app and select the forked repository.
- Set Environment Variables: Please make sure you set the WEBHOOK environment variable with your Discord webhook URL in the Cyclic.sh Variables tab.
- Finalize Configuration: The setup should now be complete and operational.

#### 📝 Usage

Once the server is up and running, it'll capture incoming HTTP requests and relay their details to your Discord channel. Access the server via the URL provided by Cyclic.sh and observe the forwarded request details in Discord.

#### 🤝 Contribution Guidelines

Contributions are welcome! Feel free to enhance this project by forking the repository, implementing improvements, and generating pull requests.

<a href="https://www.buymeacoffee.com/devangsolankii" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174" /></a>
