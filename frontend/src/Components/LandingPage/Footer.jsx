import {
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandGithub,
} from "@tabler/icons-react";
import { ActionIcon, Anchor, Group, Container, Text } from "@mantine/core";
import classes from "../../css/LandingPage/FooterCentered.module.css";

const socialLinks = [
  { icon: IconBrandGithub, link: "#" },
  { icon: IconBrandTwitter, link: "#" },
  { icon: IconBrandInstagram, link: "#" },
  { icon: IconBrandYoutube, link: "#" },
];

function Footer() {
  const social = socialLinks.map((link, index) => (
    <ActionIcon
      key={index}
      size="lg"
      className={classes.socialLink}
      component="a"
      href={link.link}
    >
      <link.icon size={22} />
    </ActionIcon>
  ));

  return (
    <footer className={classes.footer}>
      <Container size="lg">
        <div className={classes.inner}>
          <Text className={classes.copyright}>
            © 2024 AguhEd. All rights reserved.
          </Text>
          <Group gap="xs" className={classes.social}>
            {social}
          </Group>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;