import React, { useState, useEffect } from "react";
import {
  IconBook,
  IconChartPie3,
  IconChevronDown,
  IconCode,
  IconCoin,
  IconFingerprint,
  IconNotification,
} from "@tabler/icons-react";
import {
  Anchor,
  Box,
  Burger,
  Button,
  Center,
  Checkbox,
  Collapse,
  Container,
  Divider,
  Drawer,
  Flex,
  Group,
  Paper,
  PasswordInput,
  ScrollArea,
  Text,
  TextInput,
  Title,
  ThemeIcon,
  UnstyledButton,
  useMantineTheme,
  Modal,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Logo from "../../assets/logo.svg";
import classes from "../../css/LandingPage/HeaderMegaMenu.module.css";

const mockdata = [
  {
    icon: IconCode,
    title: "Open source",
    description: "This Pokémon’s cry is very loud and distracting",
  },
  {
    icon: IconCoin,
    title: "Free for everyone",
    description: "The fluid of Smeargle’s tail secretions changes",
  },
  {
    icon: IconBook,
    title: "Documentation",
    description: "Yanma is capable of seeing 360 degrees without",
  },
  {
    icon: IconFingerprint,
    title: "Security",
    description: "The shell’s rounded shape and the grooves on its.",
  },
  {
    icon: IconChartPie3,
    title: "Analytics",
    description: "This Pokémon uses its flying ability to quickly chase",
  },
  {
    icon: IconNotification,
    title: "Notifications",
    description: "Combusken battles with the intensely hot flames it spews",
  },
];

function Navbar() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  //   const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();

  const [loginModalOpened, setLoginModalOpened] = useState(false);
  const [signupModalOpened, setSignupModalOpened] = useState(false);

  const [activeSection, setActiveSection] = useState("home");

  const sections = [
    { id: "home", label: "Home" },
    { id: "features", label: "Features" },
    { id: "services", label: "Services" },
    { id: "about", label: "About" },
  ];

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

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <img src={Logo} size={30} />

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
            <>
              <Modal
                opened={loginModalOpened}
                onClose={() => setLoginModalOpened(false)}
                withCloseButton={false}
                centered
                size={550}
                classNames={{ content: classes.modalContent }}
              >
                <Container size={550} className={classes.modalContainer}>
                  <Title className={classes.modalTitle}>
                    <Flex justify="center" align="center">
                      <img src={Logo} alt="logo" className={classes.logo} />
                    </Flex>
                  </Title>

                  <Title ta="center" className={classes.welcomeTitle}>
                    Welcome Back
                  </Title>

                  <Paper className={classes.formPaper}>
                    <TextInput
                      label="Username"
                      placeholder="Enter your username"
                      required
                      classNames={{
                        input: classes.input,
                        label: classes.inputLabel,
                      }}
                    />
                    <PasswordInput
                      label="Password"
                      placeholder="Enter your password"
                      required
                      mt="xl"
                      classNames={{
                        input: classes.input,
                        label: classes.inputLabel,
                      }}
                    />
                    <Group justify="space-between" mt="xl">
                      <Checkbox
                        label="Remember me"
                        classNames={{ label: classes.checkboxLabel }}
                      />
                      <Anchor component="button" className={classes.alink}>
                        Forgot password?
                      </Anchor>
                    </Group>
                    <Button fullWidth mt="xl" className={classes.submitButton}>
                      Sign In
                    </Button>

                    <Text c="dimmed" size="sm" ta="center" mt="xl">
                      Don't have an account yet?{" "}
                      <Anchor
                        component="button"
                        className={classes.alink}
                        onClick={() => {
                          setLoginModalOpened(false);
                          setSignupModalOpened(true);
                        }}
                      >
                        Create account
                      </Anchor>
                    </Text>
                  </Paper>
                </Container>
              </Modal>
              <Button
                variant="subtle"
                className={classes.loginButton}
                onClick={() => setLoginModalOpened(true)}
              >
                <span className={classes.buttonText}>Log in</span>
                <span className={classes.buttonHighlight}></span>
              </Button>
            </>

            <>
              <Modal
                opened={signupModalOpened}
                onClose={() => setSignupModalOpened(false)}
                withCloseButton={false}
                centered
                size={550}
                classNames={{ content: classes.modalContent }}
              >
                <Container size={550} className={classes.modalContainer}>
                  <Title className={classes.modalTitle}>
                    <Flex justify="center" align="center">
                      <img src={Logo} alt="logo" className={classes.logo} />
                    </Flex>
                  </Title>

                  <Title ta="center" className={classes.welcomeTitle}>
                    Create Account
                  </Title>

                  <Paper className={classes.formPaper}>
                    <TextInput
                      label="Email"
                      placeholder="you@aguhed.dev"
                      required
                      classNames={{
                        input: classes.input,
                        label: classes.inputLabel,
                      }}
                    />
                    <TextInput
                      label="Username"
                      placeholder="Enter your username"
                      required
                      mt="xl"
                      classNames={{
                        input: classes.input,
                        label: classes.inputLabel,
                      }}
                    />
                    <PasswordInput
                      label="Password"
                      placeholder="Create a strong password"
                      required
                      mt="xl"
                      classNames={{
                        input: classes.input,
                        label: classes.inputLabel,
                      }}
                    />
                    <Button fullWidth mt="xl" className={classes.submitButton}>
                      Create Account
                    </Button>

                    <Text c="dimmed" size="sm" ta="center" mt="xl">
                      Already have an account?{" "}
                      <Anchor
                        component="button"
                        className={classes.alink}
                        onClick={() => {
                          setLoginModalOpened(true);
                          setSignupModalOpened(false);
                        }}
                      >
                        Sign in
                      </Anchor>
                    </Text>
                  </Paper>
                </Container>
              </Modal>
              <Button
                variant="gradient"
                gradient={{ from: "#6CA5C0", to: "#34505e" }}
                className={classes.signupButton}
                onClick={() => setSignupModalOpened(true)}
              >
                Sign up
              </Button>
            </>
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>

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
          <Divider my="sm" />

          <a href="#" className={classes.link}>
            Home
          </a>
          <a href="#" className={classes.link}>
            Features
          </a>
          <a href="#" className={classes.link}>
            Services
          </a>
          <a href="#" className={classes.link}>
            About
          </a>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <>
              <Modal
                opened={loginModalOpened}
                onClose={() => setLoginModalOpened(false)}
                withCloseButton={false}
                centered
              >
                <Container size={820} my={40} h={500} m={15}>
                  <Title className={classes.title} mt={10}>
                    <Flex justify="center" align="center">
                      <img src={Logo} alt="logo" />
                    </Flex>
                  </Title>

                  <Title ta="center" className={classes.title} mb={25}>
                    Welcome to AguhEd{" "}
                  </Title>

                  <Paper radius="xl" padding="lg">
                    <TextInput
                      label="Username"
                      placeholder="you"
                      required
                      mt="md"
                    />
                    <PasswordInput
                      label="Password"
                      placeholder="Your password"
                      required
                      mt="md"
                    />
                    <Group justify="space-between" mt="lg">
                      <Checkbox label="Remember me" />
                      <Anchor component="button" size="sm" c="#3D5DFF">
                        Forgot password?
                      </Anchor>
                    </Group>
                    <Button fullWidth mt="xl" bg="#443DFF">
                      Log in
                    </Button>

                    <Text c="dimmed" size="md" ta="center" mt={15}>
                      Do not have an account yet?{" "}
                      <Anchor
                        size="md"
                        component="button"
                        c="#3D5DFF"
                        onClick={() => {
                          setLoginModalOpened(false);
                          setSignupModalOpened(true);
                        }}
                      >
                        Create account
                      </Anchor>
                    </Text>
                  </Paper>
                </Container>
              </Modal>
              <Button
                variant="default"
                onClick={() => setLoginModalOpened(true)}
              >
                Log in
              </Button>
            </>

            <>
              <Modal
                opened={signupModalOpened}
                onClose={() => setSignupModalOpened(false)}
                withCloseButton={false}
                centered
                classNames={{ content: classes.modalContent }}
              >
                <Container size={450} className={classes.modalContainer}>
                  <Title className={classes.modalTitle}>
                    <Flex justify="center" align="center">
                      <img src={Logo} alt="logo" className={classes.logo} />
                    </Flex>
                  </Title>

                  <Title ta="center" className={classes.welcomeTitle}>
                    Create Account
                  </Title>

                  <Paper className={classes.formPaper}>
                    <TextInput
                      label="Email"
                      placeholder="you@aguhed.dev"
                      required
                      classNames={{
                        input: classes.input,
                        label: classes.inputLabel,
                      }}
                    />
                    <TextInput
                      label="Username"
                      placeholder="Enter your username"
                      required
                      mt="xl"
                      classNames={{
                        input: classes.input,
                        label: classes.inputLabel,
                      }}
                    />
                    <PasswordInput
                      label="Password"
                      placeholder="Create a strong password"
                      required
                      mt="xl"
                      classNames={{
                        input: classes.input,
                        label: classes.inputLabel,
                      }}
                    />
                    <Button fullWidth mt="xl" className={classes.submitButton}>
                      Create Account
                    </Button>

                    <Text c="dimmed" size="sm" ta="center" mt="xl">
                      Already have an account?{" "}
                      <Anchor
                        component="button"
                        className={classes.link}
                        onClick={() => {
                          setLoginModalOpened(true);
                          setSignupModalOpened(false);
                        }}
                      >
                        Sign in
                      </Anchor>
                    </Text>
                  </Paper>
                </Container>
              </Modal>
              <Button onClick={() => setSignupModalOpened(true)}>
                Sign up{" "}
              </Button>
            </>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}

export default Navbar;
