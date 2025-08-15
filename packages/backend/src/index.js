import express from 'express';
import cors from 'cors';
import { nanoid } from 'nanoid';
import db from './db.js';

const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;
const API_KEY = 'super-secret-key'; // In a real app, use environment variables

// Middleware for API key authentication
const apiKeyAuth = (req, res, next) => {
  const apiKey = req.get('X-API-KEY');
  if (apiKey && apiKey === API_KEY) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Mock race data
const races = [
  { id: 1, name: 'Monaco Grand Prix', location: 'Monte Carlo, Monaco', date: '2025-05-25', image: 'https://i.imgur.com/3aG1YfM.png', description: 'The Monaco Grand Prix is a Formula One motor race held annually on the Circuit de Monaco.', price: '€150' },
  { id: 2, name: '24 Hours of Le Mans', location: 'Le Mans, France', date: '2025-06-14', image: 'https://i.imgur.com/3aG1YfM.png', description: 'The 24 Hours of Le Mans is the world\'s oldest active sports car race in endurance racing.', price: '€200' },
  { id: 3, name: 'Indianapolis 500', location: 'Speedway, Indiana, USA', date: '2025-05-25', image: 'https://i.imgur.com/3aG1YfM.png', description: 'The Indianapolis 500 is an annual automobile race held at Indianapolis Motor Speedway.', price: '€100' },
  { id: 4, name: 'Daytona 500', location: 'Daytona Beach, Florida, USA', date: '2025-02-16', image: 'https://i.imgur.com/3aG1YfM.png', description: 'The Daytona 500 is a 500-mile-long Monster Energy NASCAR Cup Series motor race held annually at Daytona International Speedway.', price: '€120' }
];

const participants = [
    { id: 1, raceId: 1, name: 'John Doe', dateAdded: '2024-07-20', reason: 'Injury' },
    { id: 2, raceId: 1, name: 'Jane Smith', dateAdded: '2024-07-21', reason: 'Work conflict' },
    { id: 3, raceId: 2, name: 'Peter Jones', dateAdded: '2024-07-22', reason: 'Personal reasons' },
];

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

// Endpoint to get all races
app.get('/api/races', apiKeyAuth, (req, res) => {
  res.json(races);
});

// Endpoint to get a single race by ID
app.get('/api/races/:id', apiKeyAuth, (req, res) => {
  const race = races.find(r => r.id === parseInt(req.params.id));
  if (race) {
    res.json(race);
  } else {
    res.status(404).json({ error: 'Race not found' });
  }
});

// Endpoint to get participants for a race
app.get('/api/races/:id/participants', apiKeyAuth, (req, res) => {
    const raceParticipants = participants.filter(p => p.raceId === parseInt(req.params.id));
    res.json(raceParticipants);
});

// Endpoint to send verification email
app.post('/api/verify-email', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const token = nanoid();
  const user = {
    email,
    token,
    verified: false,
    name: 'John Doe', // Mock data
    dob: '1990-01-01', // Mock data
    raceEntries: [1, 3] // Mock data - user has entries for races with id 1 and 3
  };

  db.data.users.push(user);
  await db.write();

  // In a real app, you would send an email here.
  // For this example, we'll just log the verification link.
  console.log(`Verification link for ${email}: http://localhost:5174/verify/${token}`);

  res.json({ message: 'Verification email sent' });
});

// Endpoint to validate token
app.get('/api/validate-token/:token', async (req, res) => {
    const { token } = req.params;
    const user = db.data.users.find(u => u.token === token);

    if (user) {
        user.verified = true;
        await db.write();
        res.json({ message: 'Email verified successfully', token: user.token });
    } else {
        res.status(404).json({ error: 'Invalid token' });
    }
});

// Middleware to protect routes
const userAuth = (req, res, next) => {
    const token = req.get('X-AUTH-TOKEN');
    const user = db.data.users.find(u => u.token === token && u.verified);
    if (user) {
        req.user = user;
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

// Endpoint to get user data
app.get('/api/user', userAuth, (req, res) => {
    const user = req.user;
    const userRaceEntries = races.filter(race => user.raceEntries.includes(race.id));
    res.json({
        name: user.name,
        email: user.email,
        dob: user.dob,
        raceEntries: userRaceEntries
    });
});

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
