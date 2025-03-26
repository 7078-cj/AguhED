import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
} from '@mantine/core';
import AuthContext from '../../Context/AuthContext';
import classes from '../../css/Modal/LoginModal.module.css';
import Logo from '../../assets/logo.svg';

function LoginModal({ opened, onClose, onSwitchToSignup }) {
  const { loginUser } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(credentials);
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
            <img src={Logo} alt="logo" className={classes.logo} />
          </Flex>
        </Title>

        <Title ta="center" className={classes.welcomeTitle} mb={25}>
          Welcome to AguhEd
        </Title>

        <Paper className={classes.formPaper}>
          <form onSubmit={handleSubmit}>
            <TextInput
              label="Username"
              placeholder="you"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
              mt="md"
              classNames={{ input: classes.input, label: classes.inputLabel }}
            />
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
            <Group justify="space-between" mt="lg">
              <Checkbox label="Remember me" classNames={{ label: classes.checkboxLabel }} />
              <Anchor component="button" size="sm" className={classes.link}>
                Forgot password?
              </Anchor>
            </Group>
            <Button fullWidth mt="xl" className={classes.submitButton} type="submit">
              Log in
            </Button>
          </form>
          <Text c="dimmed" size="md" ta="center" mt={15}>
            Do not have an account yet?{' '}
            <Anchor
              size="md"
              component="button"
              className={classes.link}
              onClick={onSwitchToSignup}
            >
              Create account
            </Anchor>
          </Text>
        </Paper>
      </Container>
    </Modal>
  );
}

export default LoginModal;