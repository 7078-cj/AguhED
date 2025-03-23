import React from "react";
import { Container, Text, Title, Paper, Space } from "@mantine/core";

const About = () => {
  return (
    <Container fluid py="xl">
      {" "}
      <Paper
       
        shadow="md"
        radius="md"
        p="xl"
        style={{
          backgroundColor: "#151435",
          textAlign: "center",
        }}
      >
        <Title
          order={2}
          style={{
            color: "#FFFFFF", 
          }}
        >
          About Us
        </Title>
        <Space h="md" />
        <Text
          size="lg"
          style={{
            color: "#FFFFFF", 
            lineHeight: 1.6, 
          }}
        >
          We’re committed to creating an inclusive learning environment where
          technology enhances education. By integrating features like sign
          language translation, gesture control, and AI tools, we help educators
          make learning more accessible, engaging, and empowering for all
          students.
        </Text>
      </Paper>
    </Container>
  );
};

export default About;
