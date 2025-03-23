import {
  Badge,
  Card,
  Container,
  Group,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import classes from "../css/FeaturesCards.module.css";

import AI from "../assets/ai.png";
import Gesture from "../assets/gesture.png";
import TextImg from "../assets/translate.png";

const mockdata = [
  {
    title: "Gesture Control",
    description:
      "Navigate lessons and interact with digital content effortlessly using intuitive hand gestures, enhancing the learning experience.",
    image: Gesture,
  },
  {
    title: "Language Translation",
    description:
      "Seamlessly translate between languages, including sign language, Filipino, and English, ensuring clear communication for all learners.",
    image: TextImg,
  },
  {
    title: "AI-Powered Features",
    description:
      "Utilize real-time object detection and AI-driven tools to enrich lessons, making learning more interactive and accessible.",
    image: AI,
  },
];

function FeaturesCards() {
  const features = mockdata.map((feature) => (
    <Card
      key={feature.title}
      shadow="md"
      radius="md"
      className={classes.card}
      padding={50}  
      styles={{
        root: {
          backgroundColor: "#031716",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage:
            "linear-gradient(250deg, rgba(130, 201, 30, 0) 0%, #062343 70%)",
          paddingTop: "calc(var(--mantine-spacing-xl) * 3)",
          paddingBottom: "calc(var(--mantine-spacing-xl) * 3)",
        },
      }}
    >
      <img
        src={feature.image}
        alt={feature.title}
        style={{ width: 50, height: 50 }}
      />
      <Text fz="xl" fw={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text fz="md" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));

  return (
    <Container
      pt={100}
      pb={100}
      fluid
      py="xl"
      style={{
        backgroundColor: "#0F8F94",
        padding: "70px",
      }}
    >
      <Title
        order={1}
        className={classes.title}
        ta="center"
        mt="sm"
        f
        style={{ color: "white" }} // Sets title color for better readability
      >
        What We Provide{" "}
      </Title>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
        {features}
      </SimpleGrid>
    </Container>
  );
}

export default FeaturesCards;
