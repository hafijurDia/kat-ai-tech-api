const express = require('express');
const axios = require('axios');
require('dotenv').config();
const cors = require('cors'); // Import the CORS middleware
const app = express();
const PORT = process.env.PORT || 5001;

// Replace with your actual RapidAPI key
const RAPIDAPI_KEY = process.env.RAPID_API;
// Enable CORS for all routes

const corsOptions = {
  origin: ['https://appkat63.live', 'https://kataitech.live','https://kat-ai-tech-api.vercel.app'], 
  methods: ['GET', 'POST'], // Add other methods if needed
  credentials: true,
};
app.use(cors(corsOptions));

// Middleware to parse JSON
app.use(express.json());

// API route to get TikTok user data based on the username
app.get('/api/tiktok/:username', async (req, res) => {
    const { username } = req.params;

    // Set up options for the axios request to RapidAPI
    const options = {
        method: 'GET',
        url: 'https://tiktok-api23.p.rapidapi.com/api/user/info',
        params: { uniqueId: username },
        headers: {
            'x-rapidapi-key': RAPIDAPI_KEY,
            'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com',
        },
    };

    try {
        // Make the request to RapidAPI TikTok API
        const response = await axios.request(options);

        // Send the user data back to the frontend
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching TikTok user data:', error);
        res.status(500).json({ message: 'Error fetching TikTok user data' });
    }
});

// getting video information

app.get('/api/tiktok/video/:seconderyId', async (req, res) => {
    const { seconderyId } = req.params;
    
    const options = {
        method: 'GET',
        url: 'https://tiktok-api23.p.rapidapi.com/api/user/posts',
        params: {
          secUid: seconderyId,
          count: '15',
          cursor: '0'
        },
        headers: {
          'x-rapidapi-key': RAPIDAPI_KEY, // Use the environment variable here
          'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
        }
      };
      
      try {
        // Make the request to the RapidAPI TikTok API
        const response = await axios.request(options);
        // Send the user data back to the frontend and return immediately to avoid further execution
        return res.json(response.data);

      } catch (error) {
        // Log the exact error for debugging
        console.error('Error fetching TikTok user data:', error.response?.data || error.message);

        // Return the error response to the client
        return res.status(500).json({ message: 'Error fetching TikTok user data' });
      }
});




app.get('/', (req, res) => {

    res.send('Server is running');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
  })

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
