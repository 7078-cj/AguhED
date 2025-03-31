import React, { useState, useEffect } from "react";
import { Box, Burger, Button, Drawer, Group, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Logo from "../../assets/Logo.png";
import classes from "../../css/LandingPage/HeaderMegaMenu.module.css";
import LoginModal from "../Modals/LoginModal";
import SignupModal from "../Modals/SignupModal";

function Navbar() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [loginModalOpened, setLoginModalOpened] = useState(false);
  const [signupModalOpened, setSignupModalOpened] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const sections = [
    { id: "home", label: "Home" },
    { id: "features", label: "Features" },
    { id: "services", label: "Services" },
    { id: "about", label: "About" },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map((section) => ({
        id: section.id,
        element: document.getElementById(section.id),
      }));

      const currentSection = sectionElements.find((section) => {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
        <p className={classes.logo} > AguhEd</p>

          <Group h="100%" gap={0} visibleFrom="sm">
            {sections.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`${classes.link} ${
                  activeSection === id ? classes.active : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(id);
                }}
              >
                <span>{label}</span>
                <span className={classes.bookmark}></span>
              </a>
            ))}
          </Group>

          <Group visibleFrom="sm">
            {/* Log in Button */}
            <Button
              variant="subtle"
              className={classes.loginButton}
              onClick={() => setLoginModalOpened(true)}
            >
              <span className={classes.buttonText}>Log in</span>
              <span className={classes.buttonHighlight}></span>
            </Button>

            {/* Sign up Button */}
            <Button
              variant="gradient"
              gradient={{ from: "#6CA5C0", to: "#34505e" }}
              className={classes.signupButton}
              onClick={() => setSignupModalOpened(true)}
            >
              Sign up
            </Button>
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>

      {/* Login Modal */}
      <LoginModal
        opened={loginModalOpened}
        onClose={() => setLoginModalOpened(false)}
      />

      {/* Signup Modal */}
      <SignupModal
        opened={signupModalOpened}
        onClose={() => setSignupModalOpened(false)}
      />

      {/* Drawer for Mobile Navigation */}
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px" mx="-md">
          {sections.map(({ id, label }) => (
            <a key={id} href={`#${id}`} className={classes.link}>
              {label}
            </a>
          ))}

          <Group justify="center" grow pb="xl" px="md">
            <Button variant="default" onClick={() => setLoginModalOpened(true)}>
              Log in
            </Button>
            <Button onClick={() => setSignupModalOpened(true)}>Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}

export default Navbar;
