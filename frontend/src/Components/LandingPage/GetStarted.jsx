import React, { useContext, useState } from "react";
import {
  Button,
  Container,
  Text,
  Anchor,
  Group,
} from "@mantine/core";
import classes from "../../css/LandingPage/HeroTitle.module.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import LoginModal from "../Modals/LoginModal";
import SignupModal from "../Modals/SignupModal";


function GetStarted() {
  let { user } = useContext(AuthContext);
  const nav = useNavigate();
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
                {/* Include Login Modal */}
                <LoginModal
                  opened={loginModalOpened}
                  onClose={() => setLoginModalOpened(false)}
                  onSwitchToSignup={() => {
                    setLoginModalOpened(false);
                    setSignupModalOpened(true);
                  }}
                />

                {/* Include Signup Modal */}
                <SignupModal
                  opened={signupModalOpened}
                  onClose={() => setSignupModalOpened(false)}
                  onSwitchToLogin={() => {
                    setSignupModalOpened(false);
                    setLoginModalOpened(true);
                  }}
                />

                <Button
                  variant="gradient"
                  gradient={{ from: "#6CA5C0", to: "#34505e" }}
                  size="xl"
                  radius="lg"
                  className={classes.control}
                  mt={40}
                  onClick={() => {
                    if (user) {
                      nav("/home");
                    } else {
                      setLoginModalOpened(true);
                      setSignupModalOpened(false);
                    }
                  }}
                >
                  Get started
                </Button>
              </Group>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default GetStarted;
