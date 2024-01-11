const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3001; // Choose your desired port
const SPOTIFY_CLIENT_ID = 'your-client-id';
const SPOTIFY_CLIENT_SECRET = 'your-client-secret';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/getAccessToken', async (req, res) => {
  try {
    const tokenResponse = await axios.post(
      'https://accounts.spotify.com/api/token',
      `grant_type=client_credentials&client_id=${SPOTIFY_CLIENT_ID}&client_secret=${SPOTIFY_CLIENT_SECRET}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    res.json(tokenResponse.data);
  } catch (error) {
    console.error('Error getting access token:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});