import React, { useState } from "react";
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
import Logo from "../assets/logo.svg";
import classes from "../css/HeaderMegaMenu.module.css";

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

  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group wrap="nowrap" align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon size={22} color={theme.colors.blue[6]} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" c="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <img src={Logo} size={30} />

          <Group h="100%" gap={0} visibleFrom="sm">
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
          </Group>

          <Group visibleFrom="sm">
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
              >
                {
                  <Container size={820} my={40} h={500} m={15}>
                    <Title className={classes.title} mt={10}>
                      <Flex justify="center" align="center">
                        <img src={Logo} alt="logo" />
                      </Flex>
                    </Title>

                    <Title ta="center" className={classes.title} mb={25}>
                      Sign up to AguhEd{" "}
                    </Title>

                    <Paper radius="xl" padding="lg">
                      <TextInput
                        label="Email"
                        placeholder="you@aguhed.dev"
                        required
                        mt="md"
                      />
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

                      <Button fullWidth mt="xl" bg="#443DFF">
                        Sign up
                      </Button>

                      <Text c="dimmed" size="md" ta="center" mt={15}>
                        Already have an account yet?{" "}
                        <Anchor
                          size="md"
                          component="button"
                          c="#3D5DFF"
                          onClick={() => {
                            setLoginModalOpened(true);
                            setSignupModalOpened(false);
                          }}
                        >
                          Log in
                        </Anchor>
                      </Text>
                    </Paper>
                  </Container>
                }
              </Modal>
              <Button onClick={() => setSignupModalOpened(true)}>
                Sign up{" "}
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
              >
                {
                  <Container size={820} my={40} h={500} m={15}>
                    <Title className={classes.title} mt={10}>
                      <Flex justify="center" align="center">
                        <img src={Logo} alt="logo" />
                      </Flex>
                    </Title>

                    <Title ta="center" className={classes.title} mb={25}>
                      Sign up to AguhEd{" "}
                    </Title>

                    <Paper radius="xl" padding="lg">
                      <TextInput
                        label="Email"
                        placeholder="you@aguhed.dev"
                        required
                        mt="md"
                      />
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

                      <Button fullWidth mt="xl" bg="#443DFF">
                        Sign up
                      </Button>

                      <Text c="dimmed" size="md" ta="center" mt={15}>
                        Already have an account yet?{" "}
                        <Anchor
                          size="md"
                          component="button"
                          c="#3D5DFF"
                          onClick={() => {
                            setLoginModalOpened(true);
                            setSignupModalOpened(false);
                          }}
                        >
                          Log in
                        </Anchor>
                      </Text>
                    </Paper>
                  </Container>
                }
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
