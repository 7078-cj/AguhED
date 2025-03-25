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
  import classes from '../../css/Modal/SignupModal.module.css';
  import Logo from '../../assets/logo.svg';
  
  function SignupModal({ opened, onClose, onSwitchToLogin }) {
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
            Create an Account
          </Title>
  
          <Paper className={classes.formPaper}>
            <TextInput
              label="Full Name"
              placeholder="John Doe"
              required
              mt="md"
              classNames={{ input: classes.input, label: classes.inputLabel }}
            />
            <TextInput
              label="Email"
              placeholder="your@email.com"
              required
              mt="md"
              classNames={{ input: classes.input, label: classes.inputLabel }}
            />
            <TextInput
              label="Username"
              placeholder="username"
              required
              mt="md"
              classNames={{ input: classes.input, label: classes.inputLabel }}
            />
            <PasswordInput
              label="Password"
              placeholder="Create a strong password"
              required
              mt="md"
              classNames={{ input: classes.input, label: classes.inputLabel }}
            />
            <PasswordInput
              label="Confirm Password"
              placeholder="Confirm your password"
              required
              mt="md"
              classNames={{ input: classes.input, label: classes.inputLabel }}
            />
  
            <Button fullWidth mt="xl" className={classes.submitButton}>
              Sign up
            </Button>
  
            <Text c="dimmed" size="md" ta="center" mt={15}>
              Already have an account?{" "}
              <Anchor
                size="md"
                component="button"
                className={classes.link}
                onClick={onSwitchToLogin}
              >
                Log in
              </Anchor>
            </Text>
          </Paper>
        </Container>
      </Modal>
    );
  }
  
  export default SignupModal;