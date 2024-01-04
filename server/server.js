const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3001; // Choose your desired port
const SPOTIFY_CLIENT_ID = '094e5ee858064f6da716b8205087c963';
const SPOTIFY_CLIENT_SECRET = '22b74326de674489abc5c92c74a1cc55';
const SPOTIFY_REDIRECT_URI = 'http://localhost:3000/callback';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/auth/spotify/callback', async (req, res) => {
  const { code } = req.query;
  console.log('Authorization code:', code);

  try {
    // Exchange authorization code for access token
    // Use your SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, and SPOTIFY_REDIRECT_URI
    const tokenResponse = await axios.post(
      'https://accounts.spotify.com/api/token',
      `grant_type=authorization_code&code=${code}&redirect_uri=${SPOTIFY_REDIRECT_URI}&client_id=${SPOTIFY_CLIENT_ID}&client_secret=${SPOTIFY_CLIENT_SECRET}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );


    const { access_token, refresh_token } = tokenResponse.data;
        console.log('Token response:', tokenResponse.status, tokenResponse.data)
    // Store the access_token and refresh_token securely
    // Redirect or respond as needed
    res.send('Authentication successful. You can close this window.');
  } catch (error) {
    console.error('Error exchanging authorization code:', error);
    res.status(500).send('Internal Server Error');
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});