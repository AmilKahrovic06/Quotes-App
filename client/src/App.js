import React, { useState } from "react";
import QuoteList from "./components/QuoteList";
import LoginPage from "./components/LoginPage/LoginPage";

const App = () => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || null
  );

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    setAccessToken(null);
  };

  const handleLogin = (token, username) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("username", username);
    setAccessToken(token, username);
  };

  return accessToken ? (
    <>
      <button onClick={handleLogout}>Logout</button>
      <QuoteList user={accessToken} />
    </>
  ) : (
    <LoginPage handleLogin={handleLogin} />
  );
};

export default App;
