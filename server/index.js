const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const pollRoutes = require('./routes/pollRoutes');
const { setupSocket } = require('./socket');
const connectDB = require('./config/db');

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use('/api/polls', pollRoutes);
app.get('/', (req, res) => {
  res.send('Live Polling System API is running 🚀');
});

connectDB();
setupSocket(server);

const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
