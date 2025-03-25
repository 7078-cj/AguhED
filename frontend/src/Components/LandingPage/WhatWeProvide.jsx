import { Card, Container, SimpleGrid, Text, Title } from "@mantine/core";
import { IconHandFinger, IconLanguage, IconBrain } from '@tabler/icons-react';
import classes from "../../css/LandingPage/FeaturesCards.module.css";

const mockdata = [
  {
    title: "Gesture Control",
    description:
      "Navigate lessons and interact with digital content effortlessly using intuitive hand gestures, enhancing the learning experience.",
    icon: IconHandFinger,
  },
  {
    title: "Language Translation",
    description:
      "Seamlessly translate between languages, including sign language, Filipino, and English, ensuring clear communication for all learners.",
    icon: IconLanguage,
  },
  {
    title: "AI-Powered Features",
    description:
      "Utilize real-time object detection and AI-driven tools to enrich lessons, making learning more interactive and accessible.",
    icon: IconBrain,
  },
];

function FeaturesCards() {
  const features = mockdata.map((feature) => (
    <Card key={feature.title} className={classes.card} padding="xl">
      <div className={classes.iconWrapper}>
        <feature.icon 
          size={40} 
          stroke={1.5} 
          color="#FFFFFF"
          style={{ width: '40px', height: '40px' }}
        />
      </div>
      <Text className={classes.cardTitle}>{feature.title}</Text>
      <Text className={classes.cardDescription}>{feature.description}</Text>
    </Card>
  ));

  return (
    <div className={classes.wrapper}>
      <Container size="lg">
        <Title className={classes.title}>Our Features</Title>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">
          {features}
        </SimpleGrid>
      </Container>
    </div>
  );
}

export default FeaturesCards;