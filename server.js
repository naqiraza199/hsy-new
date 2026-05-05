import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;
const LISTINGS_PATH = path.join(process.cwd(), 'listings.json');
const BROKERS_PATH = path.join(process.cwd(), 'broker.json');
const BLOGS_PATH = path.join(process.cwd(), 'blogs.json');
const EVENTS_PATH = path.join(process.cwd(), 'events.json');
const YACHT_MLS_PATH = path.join(process.cwd(), 'yacht-mls.json');

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
  fs.writeFileSync(YACHT_MLS_PATH, JSON.stringify(yachtMls, null, 2));
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
      const existingListings = loadListings();
      const combinedListings = [...existingListings, ...newListings];
      saveListings(combinedListings);

      console.log(`Saved ${newListings.length} listings`);

      res.json({ 
        success: true, 
        message: `Added ${newListings.length} listings`,
        total: combinedListings.length 
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
      const existingBrokers = loadBrokers();
      const combinedBrokers = [...existingBrokers, ...newBrokers];
      saveBrokers(combinedBrokers);

      console.log(`Saved ${newBrokers.length} brokers`);

      res.json({ 
        success: true, 
        message: `Added ${newBrokers.length} brokers`,
        total: combinedBrokers.length 
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
      const existingBlogs = loadBlogs();
      const combinedBlogs = [...existingBlogs, ...newBlogs];
      saveBlogs(combinedBlogs);

      console.log(`Saved ${newBlogs.length} blogs`);

      res.json({ 
        success: true, 
        message: `Added ${newBlogs.length} blogs`,
        total: combinedBlogs.length 
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
      const existingEvents = loadEvents();
      const combinedEvents = [...existingEvents, ...newEvents];
      saveEvents(combinedEvents);

      console.log(`Saved ${newEvents.length} events`);

      res.json({ 
        success: true, 
        message: `Added ${newEvents.length} events`,
        total: combinedEvents.length 
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
      const existingYachtMls = loadYachtMls();
      const combinedYachtMls = [...existingYachtMls, ...newYachtMls];
      saveYachtMls(combinedYachtMls);

      console.log(`Saved ${newYachtMls.length} yacht-mls`);

      res.json({ 
        success: true, 
        message: `Added ${newYachtMls.length} yacht-mls`,
        total: combinedYachtMls.length 
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

const DIST_PATH = path.join(process.cwd(), 'dist');

app.use(express.static(DIST_PATH));

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
  console.log(`Static files served from: ${DIST_PATH}`);
});