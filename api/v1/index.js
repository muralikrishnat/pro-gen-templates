import http from 'http';

http.createServer(async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
}).listen(3000, () => {
  console.log('Server is running on port 3000');
});