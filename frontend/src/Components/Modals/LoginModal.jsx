import React, { useContext, useState } from "react";
// import { useNavigate } from 'react-router-dom';
import {
  Modal,
  Container,
  Title,
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Text,
  Button,
  Flex,
  Group,
} from "@mantine/core";
import AuthContext from "../../Context/AuthContext";
import classes from "../../css/Modal/LoginModal.module.css";
// import Logo from "../src/assets/Logo.png";

function LoginModal({ opened, onClose, onSwitchToSignup }) {
  const { loginUser } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  // const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(credentials);

    if (!credentials.username) {
      setError("Username is not registered.");
      return;
    }
    if (!credentials.password) {
      setError("Password is incorrect.");
      return;
    }


    const isValidLogin = mockValidateLogin(credentials);
    if (!isValidLogin) {
      setError("Invalid username or password.");
      return;
    }

    alert("Login successful!");
  };

  const mockValidateLogin = ({ username, password }) => {
    return username === "testUser" && password === "testPass";
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      centered
      classNames={{ content: classes.modalContent }}
    >
      <Container size={820} my={40} className={classes.modalContainer}>
        <Title className={classes.modalTitle} mt={10}>
          <Flex justify="center" align="center">
        <p className={classes.logo} > AguhEd</p>
          </Flex>
        </Title>

        <Title ta="center" className={classes.welcomeTitle} mb={25}>
Log in Your Acccount        </Title>

        <form onSubmit={handleSubmit}>
          <TextInput
            label="Username"
            placeholder="Username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
            mt="md"
            classNames={{ input: classes.input, label: classes.inputLabel }}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}

          <PasswordInput
            label="Password"
            placeholder="Your password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
            mt="md"
            classNames={{ input: classes.input, label: classes.inputLabel }}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Button
            fullWidth
            mt="xl"
            className={classes.submitButton}
            type="submit"
          >
            Log in
          </Button>
        </form>
        {/* <Text c="dimmed" size="md" ta="center" mt={15}>
          Do not have an account yet?{" "}
          <Anchor
            size="md"
            component="button"
            className={classes.link}
            onClick={onSwitchToSignup}
          >
            Create account
          </Anchor>
        </Text> */}
      </Container>
    </Modal>
  );
}

export default LoginModal;
