import React from "react";
import {
  Card,
  Container,
  Title,
  SimpleGrid,
  Text,
  Button,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import classes from "../../css/LandingPage/PriceCards.module.css";

const pricingData = [
  {
    title: "BASIC",
    price: "Free",
    features: [
      "Upload up to 30 PDFs",
      "Present for up to 30 minutes",
      "Access to Word Translation only",
    ],
  },
  {
    title: "PRO",
    price: "₱560 / month",
    features: [
      "Upload up to 100 PDFs",
      "Unlimited presentation time",
      "Access to Word and Sign Language Translation ",
    ],
    featured: true,
  },
  {
    title: "ACADEMIA",
    // subtitle: "(Teachers and Students with School Account)",
    price: "Free ",
    features: [
      "Teachers and Students with School Account",
      "Upload up to 100 PDFs",
      "Unlimited presentation time",
      "Access to Word and Sign Language Translation",
    ],
  },
];

function Price() {
  return (
    <div className={classes.wrapper}>
      <Container size="lg">
        <Title className={classes.title}>Choose Your Plan</Title>
        <Text className={classes.description}>
          Select the perfect plan for your needs
        </Text>

        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">
          {pricingData.map((plan) => (
            <Card
              key={plan.title}
              className={`${classes.card} ${
                plan.featured ? classes.featured : ""
              }`}
            >
              <div className={classes.planHeader}>
                <Text className={classes.planTitle}>{plan.title}</Text>
                <Text className={classes.planSubtitle}>{plan.subtitle}</Text>

                <Text className={classes.planPrice}>{plan.price}</Text>
              </div>

              <div className={classes.features}>
                {plan.features.map((feature, index) => (
                  <div key={index} className={classes.feature}>
                    <IconCheck size={20} className={classes.featureIcon} />
                    <Text>{feature}</Text>
                  </div>
                ))}
              </div>

              <Button
                className={classes.button}
                variant={plan.featured ? "gradient" : "outline"}
                gradient={{ from: "#6CA5C0", to: "#34505e" }}
              >
                Get Started
              </Button>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </div>
  );
}

export default Price;
