import styled from "styled-components";

export const LoginPageContainer = styled.div`
  max-width: 400px;
  margin: 10% auto;
  padding: 50px;

  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ErrorMessage = styled.p`
  color: #ff0000;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const FormField = styled.div`
  margin-bottom: 10px;
`;

export const Label = styled.label`
  font-weight: bold;
  margin-right: 20px;
`;

export const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 300px;
`;

export const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
`;

// Ako želite promijeniti stil dugmeta za hover efekat
export const ButtonHover = styled(Button)`
  &:hover {
    background-color: #0056b3;
  }
`;
