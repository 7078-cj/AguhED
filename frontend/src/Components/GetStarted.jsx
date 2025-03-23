import React from "react";
import { alpha, Button, Container, Title, Text } from "@mantine/core";
import classes from "../css/HeroTitle.module.css";
// import grid from "../assets/grid.png";

function Landing() {
  return (
    <div className={classes.root}>
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.content}>
            <h1 className={classes.title}>
              Visualize Your Lessons & Interactions in a {" "}
              <Text
                component="span"
                variant="gradient"
                gradient={{ from: alpha("#443DFF", 1), to: "cyan" }}
                inherit
              >
                Seamless Learning Experience
              </Text>{" "}
              .
            </h1>
            <Text className={classes.description} mt={30}>
              Enhancing learning with gesture control, sign language
              translation, and AI features for a more interactive and inclusive
              experience.
            </Text>

            <Button
              variant="gradient"
              gradient={{ from: alpha("#443DFF", 1), to: "cyan" }}
              size="xl"
              className={classes.control}
              mt={40}
            >
              Get started
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Landing;
