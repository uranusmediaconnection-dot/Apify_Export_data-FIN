const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from the frontend
app.use(express.static(path.join(__dirname, '../frontend/public')));

// API routes
const DATA_FILE = path.join(__dirname, 'data/events.json');

function readEvents() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch {
    return [];
  }
}

function writeEvents(events) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(events, null, 2));
}

app.get('/api/events', (req, res) => {
  res.json(readEvents());
});

app.post('/api/events', (req, res) => {
  const events = readEvents();
  const newEvent = { ...req.body, id: Date.now().toString() };
  events.push(newEvent);
  writeEvents(events);
  res.json(newEvent);
});

app.put('/api/events/:id', (req, res) => {
  const events = readEvents();
  const idx = events.findIndex(e => e.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Event not found' });
  events[idx] = { ...events[idx], ...req.body };
  writeEvents(events);
  res.json(events[idx]);
});

app.delete('/api/events/:id', (req, res) => {
  const events = readEvents();
  const filtered = events.filter(e => e.id !== req.params.id);
  writeEvents(filtered);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
