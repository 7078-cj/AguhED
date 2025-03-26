import {
  Modal,
  Container,
  Title,
  TextInput,
  PasswordInput,
  Paper,
  Text,
  Button,
  Flex,
  Anchor,
} from '@mantine/core';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext';
import classes from '../../css/Modal/SignupModal.module.css';
import Logo from '../../assets/logo.svg';

function SignupModal({ opened, onClose, onSwitchToLogin }) {
  const nav = useNavigate();
  let { loginUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
  
    email: '',
    username: '',
    password: '',
    
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    let response = await fetch('http://127.0.0.1:8000/api/registerUser/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      }),
    });

    let data = await response.json();
    console.log(data);
    if (response.status === 200) {
      loginUser(e);
      nav('/');
      onClose();
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} withCloseButton={false} centered classNames={{ content: classes.modalContent }}>
      <Container size={820} my={40} className={classes.modalContainer}>
        <Title className={classes.modalTitle} mt={10}>
          <Flex justify="center" align="center">
            <img src={Logo} alt="logo" className={classes.logo} />
          </Flex>
        </Title>

        <Title ta="center" className={classes.welcomeTitle} mb={25}>
          Create an Account
        </Title>

        <Paper className={classes.formPaper}>
          <form onSubmit={handleSubmit}>
            
            <TextInput label="Email" name="email" placeholder="your@email.com" required mt="md" value={formData.email} onChange={handleChange} classNames={{ input: classes.input, label: classes.inputLabel }} />
            <TextInput label="Username" name="username" placeholder="username" required mt="md" value={formData.username} onChange={handleChange} classNames={{ input: classes.input, label: classes.inputLabel }} />
            <PasswordInput label="Password" name="password" placeholder="Create a strong password" required mt="md" value={formData.password} onChange={handleChange} classNames={{ input: classes.input, label: classes.inputLabel }} />
            <PasswordInput label="Confirm Password" name="confirmPassword" placeholder="Confirm your password" required mt="md" value={formData.confirmPassword} onChange={handleChange} classNames={{ input: classes.input, label: classes.inputLabel }} />
            <Button type="submit" fullWidth mt="xl" className={classes.submitButton}>
              Sign up
            </Button>
          </form>

          <Text c="dimmed" size="md" ta="center" mt={15}>
            Already have an account?{' '}
            <Anchor size="md" component="button" className={classes.link} onClick={onSwitchToLogin}>
              Log in
            </Anchor>
          </Text>
        </Paper>
      </Container>
    </Modal>
  );
}

export default SignupModal;
