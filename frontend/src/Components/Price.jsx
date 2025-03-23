import React from "react";
import { Card, Container, Title, SimpleGrid, Text } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

import classes from "../css/FeaturesCards.module.css";

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
    price: "$10 / month",
    features: [
      "Upload up to 100 PDFs",
      "Unlimited presentation time",
      "Access to Word and Sign Language Translation ",
      "Access to Object Analysis",
    ],
  },
  {
    title: "ACADEMIA",
    price: "Custom Pricing",
    features: [
      "Upload up to 100 PDFs",
      "Unlimited presentation time",
      "Access to Word and Sign Language Translation",
      "Access to Object Analysis",
      "Custom institutional features",
    ],
  },
];

function PriceCards() {
  return (
    <Container size="lg" py="xl">
      <Title order={2} className={classes.title} ta="center" mb="md">
        Choose Your Plan
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        {pricingData.map((plan, index) => (
          <Card
            key={plan.title}
            shadow="md"
            radius="md"
            p={30}
            pt={50}
            pb={50}
            style={{
              backgroundColor: index === 1 ? "#2A295A" : "#0A7175",
              height: "600px",
            }}
            sx={(theme) => ({
              color: "white",
              textAlign: "center",
              height: "600px", // Default height
              [`@media (max-width: ${theme.breakpoints.md}px)`]: {
                height: "400px", // Medium screen height
              },
              [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
                height: "300px", // Small screen height
              },
            })}
          >
            <Text fz={50} fw={700} mb="sm">
              {plan.title}
            </Text>
            <Text fz={25} fw={500} mb="md">
              {plan.price}
            </Text>
            <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
              {plan.features.map((feature, index) => (
                <li
                  key={index}
                  style={{
                    marginBottom: "0.5rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <IconCheck
                    size={20}
                    color="cyan"
                    style={{ marginRight: "8px" }}
                  />
                  <Text fz={15}>{feature}</Text>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
}

export default PriceCards;
