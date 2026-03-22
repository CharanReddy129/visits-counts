const express = require('express');
const redis = require('redis');

const app = express();
const client = redis.createClient({
  url: process.env.REDIS_URL || "redis://redis-server:6379",
});

client.set('visits', 0);



// Serve static files (CSS)
app.use(express.static(__dirname));

// Serve the improved UI
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/ui.html');
});

// API endpoint for visits count
app.get('/visits', (req, res) => {
  client.get('visits', (err, visits) => {
    if (err) {
      return res.status(500).json({ error: 'Redis error' });
    }
    res.json({ visits: visits });
    client.set('visits', parseInt(visits) + 1);
  });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
