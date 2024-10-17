const express = require('express');
const axios = require('axios');
require('dotenv').config();
const cors = require('cors'); // Import the CORS middleware
const app = express();
const PORT = process.env.PORT || 5000;

// Replace with your actual RapidAPI key
const RAPIDAPI_KEY = process.env.RAPID_API;
// Enable CORS for all routes
app.use(cors());

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




app.get('/', (req, res) => {

    res.send('Server is running');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
  })

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
