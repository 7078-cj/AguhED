import React from "react";
import { Container, Text, Title } from "@mantine/core";
import classes from "../../css/LandingPage/About.module.css";

const About = () => {
  return (
    <div className={classes.wrapper}>
      <Container size="lg">
        <div className={classes.content}>
          <Title className={classes.title}>About Us</Title>
          <div className={classes.description}>
            <Text>
              We're committed to creating an inclusive learning environment where
              technology enhances education. By integrating features like sign
              language translation, gesture control, and AI tools, we help educators
              make learning more accessible, engaging, and empowering for all
              students.
            </Text>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default About;