import React, { useState, useEffect } from "react";

const Access = () => {
  const [accessToken, setAccessToken] = useState(null);

  const getAccessToken = async () => {
    try {
      const response = await fetch("http://localhost:3001/getAccessToken", {
        method: "POST",
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.access_token;
        setAccessToken(token);
        console.log("Access Token:", token);
      } else {
        console.error("Access token request failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error getting access token:", error);
    }
  };

  useEffect(() => {
    // Call getAccessToken when the component mounts
    getAccessToken();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  // Now you can use the accessToken state variable wherever you need it in your component

  return (
    <div>
      <h1>Your Component</h1>
      {/* Your component content here */}
    </div>
  );
};

export default Access;
