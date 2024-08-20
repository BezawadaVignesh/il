const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');


const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathName = parsedUrl.pathname;
  if (pathName === '/') {
    // Serve the HTML page
    fs.readFile(path.join(__dirname, 'index.html'), (err, content) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// The server listens on port 3000
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
