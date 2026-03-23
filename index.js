const express = require('express');
const redis = require('redis');

const app = express();
const client = redis.createClient({
  url: process.env.REDIS_URL || "redis://redis-server:6379",
});

client.connect().then(() => {
  client.set('visits', 0);
}).catch(console.error);



// Serve static files (CSS)
app.use(express.static(__dirname));

// Serve the improved UI
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/ui.html');
});

// API endpoint for visits count
app.get('/visits', async (req, res) => {
  try {
    const visits = await client.get('visits');
    res.json({ visits: visits || 0 });
    await client.set('visits', parseInt(visits || 0) + 1);
  } catch (err) {
    console.error('Redis error:', err);
    return res.status(500).json({ error: 'Redis error' });
  }
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
