import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import styled from "styled-components";
import QuoteList from "./components/QuoteList";
import LoginPage from "./components/LoginPage/LoginPage";

const LogoutButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 30px;
`;

const App = () => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || null
  );

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setAccessToken(null);
  };

  return accessToken ? (
    <>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      <QuoteList user={accessToken} />
    </>
  ) : (
    <LoginPage setAccessToken={setAccessToken} />
  );
};

const root = document.getElementById("root");

const rootComponent = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

createRoot(root).render(rootComponent);
