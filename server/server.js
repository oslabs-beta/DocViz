const app = require('./app');

const PORT = 5003;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
