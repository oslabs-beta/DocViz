const { app, server } = require('./server');

const PORT = 5003;

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});