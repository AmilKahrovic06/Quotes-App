import React, { useState } from "react";
import axios from "axios";
import {
  LoginPageContainer,
  ErrorMessage,
  Form,
  FormField,
  Label,
  Input,
  Button,
} from "./LoginPage.styled";

const LoginPage = ({ setAccessToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/sessions", {
        username,
        password,
      });

      const { accessToken } = response.data;
      setAccessToken(accessToken);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("username", username);
      setError("");
    } catch (error) {
      setError("Invalid username or password");
    }
  };

  return (
    <LoginPageContainer>
      <h2>Hello,can you Login please?</h2>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form onSubmit={handleLogin}>
        <FormField>
          <Label>Username:</Label>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormField>
        <FormField>
          <Label>Password:</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormField>
        <Button type="submit">Login</Button>
      </Form>
    </LoginPageContainer>
  );
};

export default LoginPage;
