import React from "react";
import { Container, Accordion, Title, Text } from "@mantine/core";

const faqData = [
  {
    question: "What is this platform about?",
    answer:
      "Our platform leverages cutting-edge technology like sign language translation, gesture control, and AI tools to make education more inclusive and engaging.",
  },
  {
    question: "Is this platform free to use?",
    answer:
      "We offer a free basic plan that includes key features. For advanced tools and customization options, our Pro and Academia plans are available.",
  },
  {
    question: "Who can benefit from this platform?",
    answer:
      "Students, educators, and administrators can all benefit from our platform's inclusive and accessible features, designed to empower all users.",
  },
];

const Questions = () => {
  return (
    <Container size="lg" py="xl">
      <Title order={2} align="center" mb="lg" style={{ color: "#0A7175" }}>
        Frequently Asked Questions
      </Title>
      <Accordion>
        {faqData.map((faq, index) => (
          <Accordion.Item value={index} key={index}>
            <Accordion.Control>{faq.question}</Accordion.Control>
            <Accordion.Panel>
              <Text size="sm" style={{ lineHeight: 1.6 }}>
                {faq.answer}
              </Text>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
};

export default Questions;