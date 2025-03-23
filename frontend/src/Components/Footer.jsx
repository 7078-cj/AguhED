import {
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube,
} from "@tabler/icons-react";
import { ActionIcon, Anchor, Group } from "@mantine/core";
import classes from "../css/FooterCentered.module.css";

const links = [{ link: "#", label: "© 2024 AguhEd. All rights reserved." }];

function FooterCentered() {
  const items = links.map((link) => (
    <Anchor
      
      c="dimmed"
      key={link.label}
      href={link.link}
      lh={1}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        <Group className={classes.links}>{items}</Group>
      </div>
    </div>
  );
}

export default FooterCentered;
