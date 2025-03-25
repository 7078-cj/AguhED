import React, { useState } from "react";
import {
  Button,
  Container,
  Text,
  Anchor,
  Modal,
  Title,
  Flex,
  Paper,
  TextInput,
  PasswordInput,
  Checkbox,
  Group,
} from "@mantine/core";
import classes from "../../css/LandingPage/HeroTitle.module.css";
import Logo from "../../assets/logo.svg";

function GetStarted() {
  const [loginModalOpened, setLoginModalOpened] = useState(false);
  const [signupModalOpened, setSignupModalOpened] = useState(false);
  return (
    <div className={classes.root}>
      <div className={classes.overlay} />
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.content}>
            <h1 className={classes.title}>
              Visualize Your Lessons & Interactions in a{" "}
              <Text
                component="span"
                variant="gradient"
                gradient={{ from: "#6CA5C0", to: "#34505e" }}
                inherit
              >
                Seamless Learning Experience
              </Text>
            </h1>
            <Text className={classes.description} mt={30}>
              Enhancing learning with gesture control, sign language
              translation, and AI features for a more interactive and inclusive
              experience.
            </Text>

            <div className={classes.controls}>
              <Group visibleFrom="sm">
                <Modal
                  opened={loginModalOpened}
                  onClose={() => setLoginModalOpened(false)}
                  withCloseButton={false}
                  centered
                  size={550} 
                  classNames={{ content: classes.modalContent }}
                >
                  <Container size={550}  className={classes.modalContainer}>
                    <Title className={classes.modalTitle}>
                      <Flex justify="center" align="center">
                        <img src={Logo} alt="logo" className={classes.logo} />
                      </Flex>
                    </Title>

                    <Title ta="center" className={classes.welcomeTitle}>
                      Welcome Back
                    </Title>

                    <Paper className={classes.formPaper}>
                      <TextInput
                        label="Username"
                        placeholder="Enter your username"
                        required
                        classNames={{
                          input: classes.input,
                          label: classes.inputLabel,
                        }}
                      />
                      <PasswordInput
                        label="Password"
                        placeholder="Enter your password"
                        required
                        mt="xl"
                        classNames={{
                          input: classes.input,
                          label: classes.inputLabel,
                        }}
                      />
                      <Group justify="space-between" mt="xl">
                        <Checkbox
                          label="Remember me"
                          classNames={{ label: classes.checkboxLabel }}
                        />
                        <Anchor component="button" className={classes.link}>
                          Forgot password?
                        </Anchor>
                      </Group>
                      <Button
                        fullWidth
                        mt="xl"
                        className={classes.submitButton}
                      >
                        Sign In
                      </Button>

                      <Text c="dimmed" size="sm" ta="center" mt="xl">
                        Don't have an account yet?{" "}
                        <Anchor
                          component="button"
                          className={classes.link}
                          onClick={() => {
                            setLoginModalOpened(false);
                            setSignupModalOpened(true);
                          }}
                        >
                          Create account
                        </Anchor>
                      </Text>
                    </Paper>
                  </Container>
                </Modal>
                <Button
                  variant="gradient"
                  gradient={{ from: "#6CA5C0", to: "#34505e" }}
                  size="xl"
                  radius="lg"
                  className={classes.control}
                  mt={40}
                  onClick={() => setLoginModalOpened(true)}
                >
                  Get started
                </Button>

                <Modal
                  opened={signupModalOpened}
                  onClose={() => setSignupModalOpened(false)}
                  withCloseButton={false}
                  centered
                  size={550} 
                  classNames={{ content: classes.modalContent }}
                >
                  <Container size={550} className={classes.modalContainer}>
                    <Title className={classes.modalTitle}>
                      <Flex justify="center" align="center">
                        <img src={Logo} alt="logo" className={classes.logo} />
                      </Flex>
                    </Title>

                    <Title ta="center" className={classes.welcomeTitle}>
                      Create Account
                    </Title>

                    <Paper className={classes.formPaper}>
                      <TextInput
                        label="Email"
                        placeholder="you@aguhed.dev"
                        required
                        classNames={{
                          input: classes.input,
                          label: classes.inputLabel,
                        }}
                      />
                      <TextInput
                        label="Username"
                        placeholder="Enter your username"
                        required
                        mt="xl"
                        classNames={{
                          input: classes.input,
                          label: classes.inputLabel,
                        }}
                      />
                      <PasswordInput
                        label="Password"
                        placeholder="Create a strong password"
                        required
                        mt="xl"
                        classNames={{
                          input: classes.input,
                          label: classes.inputLabel,
                        }}
                      />
                      <Button
                        fullWidth
                        mt="xl"
                        className={classes.submitButton}
                      >
                        Create Account
                      </Button>

                      <Text c="dimmed" size="sm" ta="center" mt="xl">
                        Already have an account?{" "}
                        <Anchor
                          component="button"
                          className={classes.link}
                          onClick={() => {
                            setLoginModalOpened(true);
                            setSignupModalOpened(false);
                          }}
                        >
                          Sign in
                        </Anchor>
                      </Text>
                    </Paper>
                  </Container>
                </Modal>
              </Group>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default GetStarted;
