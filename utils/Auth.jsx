// import React from "react";
// import { useNavigate } from "react-router-dom";

// const Auth = () => {
//   const history = useNavigate();

//   const handleLogin = () => {
//     //OAuth 2.0 logic
//     //redirect the user to the spotify authorization url

//     window.location.href = "SPOTIFY_AUTHORIZATION_URL";
//   };

//   //handle callback from Spotify after the user grants permission

//   React.useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const code = urlParams.get("code");

//     if (code) {
//       //exchange auth code for an access token
//       // perform any additional logic (storing token, etc)
//       // redirect to a different route or component if needed
//       history.push("/random-number");
//     }
//   }, [history]);

//   return (
//     <div>
//       <h1>Login Page</h1>
//       <button onClick={handleLogin}>Log In with Spotify</button>
//     </div>
//   );
// };

// export default Auth;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// const [accessToken, setAccessToken] = useState(null);

// const Auth = () => {
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     // Replace these values with your actual client ID, redirect URI, and desired scopes
//     const clientId = "094e5ee858064f6da716b8205087c963";
//     const redirectUri = "http://localhost:3000/callback";
//     const scopes = "user-library-modify"; // Add additional scopes as needed

//     // Construct the Spotify authorization URL
//     const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes}`;

//     // Redirect the user to the Spotify authorization URL
//     window.location.href = authUrl;
//   };

//   const exchangeCodeForToken = async (code) => {
//     try {
//       const response = await fetch(
//         "http://localhost:3001/auth/spotify/callback",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ code }),
//         }
//       );

//       if (response.ok) {
//         const data = await response.json();
//         const { access_token, refresh_token } = data;

//         // Set the obtained access token in state or a secure storage
//         setAccessToken(access_token);

//         // Redirect to the desired route
//         navigate("/random-number");
//       } else {
//         console.error("Token exchange failed:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error exchanging authorization code:", error);
//     }
//   };

//   useEffect(() => {
//     // Check if the URL contains an authorization code
//     const urlParams = new URLSearchParams(window.location.search);
//     const code = urlParams.get("code");

//     if (code) {
//       // Handle the authorization code (e.g., exchange it for an access token)
//       // Perform any additional logic, then redirect to a different route or component if needed
//       navigate("/random-number"); // Replace with your desired route
//     }
//   }, [navigate]);

//   return (
//     <div>
//       <h1>Login Page</h1>
//       <button onClick={handleLogin}>Log In with Spotify</button>
//     </div>
//   );
// };

// export default Auth;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Replace these values with your actual client ID, redirect URI, and desired scopes
    const clientId = "094e5ee858064f6da716b8205087c963";
    const redirectUri = "http://localhost:3000/auth/spotify/callback";
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
      console.log("Authorization Code:", code);
      // Handle the authorization code (e.g., exchange it for an access token)
      // Perform any additional logic, then redirect to a different route or component if needed
      // Example: navigate("/dashboard");
      navigate("/"); // Replace with your desired route
    }
  }, [navigate]);

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Log In with Spotify</button>
    </div>
  );
};

export default Auth;
