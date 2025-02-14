const { app, server } = require('./app');

const PORT = 5003;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
