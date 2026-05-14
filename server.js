import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import compression from 'compression';

const app = express();
const PORT = process.env.PORT || 3000;
const LISTINGS_PATH = path.join(process.cwd(), 'public', 'data', 'listings.json');
const BROKERS_PATH = path.join(process.cwd(), 'public', 'data', 'brokers.json');
const BLOGS_PATH = path.join(process.cwd(), 'public', 'data', 'blogs.json');
const EVENTS_PATH = path.join(process.cwd(), 'public', 'data', 'events.json');
const YACHT_MLS_PATH = path.join(process.cwd(), 'public', 'data', 'yacht-mls.json');
const ITINERARIES_PATH = path.join(process.cwd(), 'public', 'data', 'itineraries.json');

app.use(compression());

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

function loadListings() {
  try {
    if (fs.existsSync(LISTINGS_PATH)) {
      const data = fs.readFileSync(LISTINGS_PATH, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading listings:', error);
  }
  return [];
}

function saveListings(listings) {
  const dir = path.dirname(LISTINGS_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(LISTINGS_PATH, JSON.stringify(listings, null, 2));
}

function loadBrokers() {
  try {
    if (fs.existsSync(BROKERS_PATH)) {
      const data = fs.readFileSync(BROKERS_PATH, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading brokers:', error);
  }
  return [];
}

function saveBrokers(brokers) {
  const dir = path.dirname(BROKERS_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(BROKERS_PATH, JSON.stringify(brokers, null, 2));
}

function loadBlogs() {
  try {
    if (fs.existsSync(BLOGS_PATH)) {
      const data = fs.readFileSync(BLOGS_PATH, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading blogs:', error);
  }
  return [];
}

function saveBlogs(blogs) {
  const dir = path.dirname(BLOGS_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(BLOGS_PATH, JSON.stringify(blogs, null, 2));
}

function loadEvents() {
  try {
    if (fs.existsSync(EVENTS_PATH)) {
      const data = fs.readFileSync(EVENTS_PATH, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading events:', error);
  }
  return [];
}

function saveEvents(events) {
  const dir = path.dirname(EVENTS_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(EVENTS_PATH, JSON.stringify(events, null, 2));
}

function loadYachtMls() {
  try {
    if (fs.existsSync(YACHT_MLS_PATH)) {
      const data = fs.readFileSync(YACHT_MLS_PATH, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading yacht-mls:', error);
  }
  return [];
}

function saveYachtMls(yachtMls) {
  const dir = path.dirname(YACHT_MLS_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(YACHT_MLS_PATH, JSON.stringify(yachtMls, null, 2));
}

function loadItineraries() {
  try {
    if (fs.existsSync(ITINERARIES_PATH)) {
      const data = fs.readFileSync(ITINERARIES_PATH, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading itineraries:', error);
  }
  return [];
}

function saveItineraries(itineraries) {
  const dir = path.dirname(ITINERARIES_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(ITINERARIES_PATH, JSON.stringify(itineraries, null, 2));
}

app.post('/api/listings', (req, res) => {
  try {
    console.log('Received data type:', typeof req.body);
    console.log('Is array:', Array.isArray(req.body));
    
    let newListings = req.body;

    if (typeof newListings === 'object' && !Array.isArray(newListings)) {
      const possibleArrays = [newListings.data, newListings.listings, newListings.items, newListings.results];
      for (const arr of possibleArrays) {
        if (Array.isArray(arr)) {
          newListings = arr;
          break;
        }
      }
    }

    if (!Array.isArray(newListings)) {
      newListings = [newListings];
    }

    if (newListings.length > 0 && newListings[0] !== undefined && newListings[0] !== null) {
      saveListings(newListings);

      console.log(`Saved ${newListings.length} listings`);

      res.json({
        success: true,
        message: `Replaced listings with ${newListings.length} new listings`,
        total: newListings.length
      });
    } else {
      res.json({ success: true, message: 'No data to save' });
    }
  } catch (error) {
    console.error('Error saving listings:', error);
    res.status(500).json({ error: 'Failed to save listings' });
  }
});

app.get('/api/listings', (req, res) => {
  try {
    const listings = loadListings();
    res.json(listings);
  } catch (error) {
    console.error('Error reading listings:', error);
    res.status(500).json({ error: 'Failed to read listings' });
  }
});

app.post('/api/brokers', (req, res) => {
  try {
    console.log('Received brokers data type:', typeof req.body);
    console.log('Is array:', Array.isArray(req.body));
    
    let newBrokers = req.body;

    if (typeof newBrokers === 'object' && !Array.isArray(newBrokers)) {
      const possibleArrays = [newBrokers.data, newBrokers.brokers, newBrokers.items, newBrokers.results];
      for (const arr of possibleArrays) {
        if (Array.isArray(arr)) {
          newBrokers = arr;
          break;
        }
      }
    }

    if (!Array.isArray(newBrokers)) {
      newBrokers = [newBrokers];
    }

    if (newBrokers.length > 0 && newBrokers[0] !== undefined && newBrokers[0] !== null) {
      saveBrokers(newBrokers);

      console.log(`Saved ${newBrokers.length} brokers`);

      res.json({
        success: true,
        message: `Replaced brokers with ${newBrokers.length} new brokers`,
        total: newBrokers.length
      });
    } else {
      res.json({ success: true, message: 'No data to save' });
    }
  } catch (error) {
    console.error('Error saving brokers:', error);
    res.status(500).json({ error: 'Failed to save brokers' });
  }
});

app.get('/api/brokers', (req, res) => {
  try {
    const brokers = loadBrokers();
    res.json(brokers);
  } catch (error) {
    console.error('Error reading brokers:', error);
    res.status(500).json({ error: 'Failed to read brokers' });
  }
});

app.post('/api/blogs', (req, res) => {
  try {
    console.log('Received blogs data type:', typeof req.body);
    console.log('Is array:', Array.isArray(req.body));
    
    let newBlogs = req.body;

    if (typeof newBlogs === 'object' && !Array.isArray(newBlogs)) {
      const possibleArrays = [newBlogs.data, newBlogs.blogs, newBlogs.items, newBlogs.results];
      for (const arr of possibleArrays) {
        if (Array.isArray(arr)) {
          newBlogs = arr;
          break;
        }
      }
    }

    if (!Array.isArray(newBlogs)) {
      newBlogs = [newBlogs];
    }

    if (newBlogs.length > 0 && newBlogs[0] !== undefined && newBlogs[0] !== null) {
      saveBlogs(newBlogs);

      console.log(`Saved ${newBlogs.length} blogs`);

      res.json({
        success: true,
        message: `Replaced blogs with ${newBlogs.length} new blogs`,
        total: newBlogs.length
      });
    } else {
      res.json({ success: true, message: 'No data to save' });
    }
  } catch (error) {
    console.error('Error saving blogs:', error);
    res.status(500).json({ error: 'Failed to save blogs' });
  }
});

app.get('/api/blogs', (req, res) => {
  try {
    const blogs = loadBlogs();
    res.json(blogs);
  } catch (error) {
    console.error('Error reading blogs:', error);
    res.status(500).json({ error: 'Failed to read blogs' });
  }
});

app.post('/api/events', (req, res) => {
  try {
    console.log('Received events data type:', typeof req.body);
    console.log('Is array:', Array.isArray(req.body));
    
    let newEvents = req.body;

    if (typeof newEvents === 'object' && !Array.isArray(newEvents)) {
      const possibleArrays = [newEvents.data, newEvents.events, newEvents.items, newEvents.results];
      for (const arr of possibleArrays) {
        if (Array.isArray(arr)) {
          newEvents = arr;
          break;
        }
      }
    }

    if (!Array.isArray(newEvents)) {
      newEvents = [newEvents];
    }

    if (newEvents.length > 0 && newEvents[0] !== undefined && newEvents[0] !== null) {
      saveEvents(newEvents);

      console.log(`Saved ${newEvents.length} events`);

      res.json({
        success: true,
        message: `Replaced events with ${newEvents.length} new events`,
        total: newEvents.length
      });
    } else {
      res.json({ success: true, message: 'No data to save' });
    }
  } catch (error) {
    console.error('Error saving events:', error);
    res.status(500).json({ error: 'Failed to save events' });
  }
});

app.get('/api/events', (req, res) => {
  try {
    const events = loadEvents();
    res.json(events);
  } catch (error) {
    console.error('Error reading events:', error);
    res.status(500).json({ error: 'Failed to read events' });
  }
});

app.post('/api/yacht-mls', (req, res) => {
  try {
    console.log('Received yacht-mls data type:', typeof req.body);
    console.log('Is array:', Array.isArray(req.body));
    
    let newYachtMls = req.body;

    if (typeof newYachtMls === 'object' && !Array.isArray(newYachtMls)) {
      const possibleArrays = [newYachtMls.data, newYachtMls.yachtMls, newYachtMls.items, newYachtMls.results];
      for (const arr of possibleArrays) {
        if (Array.isArray(arr)) {
          newYachtMls = arr;
          break;
        }
      }
    }

    if (!Array.isArray(newYachtMls)) {
      newYachtMls = [newYachtMls];
    }

    if (newYachtMls.length > 0 && newYachtMls[0] !== undefined && newYachtMls[0] !== null) {
      saveYachtMls(newYachtMls);

      console.log(`Saved ${newYachtMls.length} yacht-mls`);

      res.json({
        success: true,
        message: `Replaced yacht-mls with ${newYachtMls.length} new yacht-mls`,
        total: newYachtMls.length
      });
    } else {
      res.json({ success: true, message: 'No data to save' });
    }
  } catch (error) {
    console.error('Error saving yacht-mls:', error);
    res.status(500).json({ error: 'Failed to save yacht-mls' });
  }
});

app.get('/api/yacht-mls', (req, res) => {
  try {
    const yachtMls = loadYachtMls();
    res.json(yachtMls);
  } catch (error) {
    console.error('Error reading yacht-mls:', error);
    res.status(500).json({ error: 'Failed to read yacht-mls' });
  }
});

app.post('/api/itineraries', (req, res) => {
  try {
    console.log('Received itineraries data type:', typeof req.body);
    console.log('Is array:', Array.isArray(req.body));
    
    let newItineraries = req.body;

    if (typeof newItineraries === 'object' && !Array.isArray(newItineraries)) {
      const possibleArrays = [newItineraries.data, newItineraries.itineraries, newItineraries.items, newItineraries.results];
      for (const arr of possibleArrays) {
        if (Array.isArray(arr)) {
          newItineraries = arr;
          break;
        }
      }
    }

    if (!Array.isArray(newItineraries)) {
      newItineraries = [newItineraries];
    }

    if (newItineraries.length > 0 && newItineraries[0] !== undefined && newItineraries[0] !== null) {
      saveItineraries(newItineraries);

      console.log(`Saved ${newItineraries.length} itineraries`);

      res.json({
        success: true,
        message: `Replaced itineraries with ${newItineraries.length} new itineraries`,
        total: newItineraries.length
      });
    } else {
      res.json({ success: true, message: 'No data to save' });
    }
  } catch (error) {
    console.error('Error saving itineraries:', error);
    res.status(500).json({ error: 'Failed to save itineraries' });
  }
});

app.get('/api/itineraries', (req, res) => {
  try {
    const itineraries = loadItineraries();
    res.json(itineraries);
  } catch (error) {
    console.error('Error reading itineraries:', error);
    res.status(500).json({ error: 'Failed to read itineraries' });
  }
});

const DIST_PATH = path.join(process.cwd(), 'dist');

app.use(express.static(DIST_PATH, {
  maxAge: '1y',
  etag: true,
  setHeaders(res, filePath) {
    if (filePath.endsWith('.json')) {
      res.setHeader('Cache-Control', 'public, max-age=300');
    }
  }
}));

app.use((req, res) => {
  res.sendFile(path.join(DIST_PATH, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API endpoints:`);
  console.log(`  POST /api/listings - Add listings`);
  console.log(`  GET  /api/listings - Get all listings`);
  console.log(`  POST /api/brokers - Add brokers`);
  console.log(`  GET  /api/brokers - Get all brokers`);
  console.log(`  POST /api/blogs - Add blogs`);
  console.log(`  GET  /api/blogs - Get all blogs`);
  console.log(`  POST /api/events - Add events`);
  console.log(`  GET  /api/events - Get all events`);
  console.log(`  POST /api/yacht-mls - Add yacht-mls`);
  console.log(`  GET  /api/yacht-mls - Get all yacht-mls`);
  console.log(`  POST /api/itineraries - Add itineraries`);
  console.log(`  GET  /api/itineraries - Get all itineraries`);
  console.log(`Static files served from: ${DIST_PATH}`);
});