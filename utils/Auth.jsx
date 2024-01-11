import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Replace these values with your actual client ID, redirect URI, and desired scopes
    const clientId = "094e5ee858064f6da716b8205087c963";
    const redirectUri = "http://localhost:3001/auth/spotify/callback";
    const scopes = "user-library-modify"; // Add additional scopes as needed

    // Construct the Spotify authorization URL
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes}`;

    // Redirect the user to the Spotify authorization URL
    window.location.href = authUrl;
  };

  useEffect(() => {
    // Check if the URL contains an authorization code
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      // Handle the authorization code (e.g., exchange it for an access token)
      exchangeCodeForToken(code);
    }
  }, []);

  const exchangeCodeForToken = async (code) => {
    try {
      // Use your server to exchange the authorization code for an access token
      const response = await fetch(
        `http://localhost:3001/auth/spotify/callback?code=${code}`
      );
      const data = await response.json();

      if (response.ok) {
        const { access_token, refresh_token } = data;

        // Set the obtained access token in state or a secure storage
        // You can use a state management solution or localStorage/sessionStorage for this
        // For example, setAccessToken(access_token);

        // Redirect to the desired route
        navigate("/random-number");
      } else {
        console.error("Token exchange failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error exchanging authorization code:", error);
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Log In with Spotify</button>
    </div>
  );
};

export default Auth;
