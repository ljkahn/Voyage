import React from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const history = useNavigate();

  const handleLogin = () => {
    //OAuth 2.0 logic
    //redirect the user to the spotify authorization url

    window.location.href = "SPOTIFY_AUTHORIZATION_URL";
  };

  //handle callback from Spotify after the user grants permission

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      //exchange auth code for an access token
      // perform any additional logic (storing token, etc)
      // redirect to a different route or component if needed
      history.push("/random-number");
    }
  }, [history]);

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Log In with Spotify</button>
    </div>
  );
};

export default Auth;
