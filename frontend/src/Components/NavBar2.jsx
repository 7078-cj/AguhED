import { useState } from "react";
import {
  IconSearch,
  IconHome,
  IconDeviceDesktop,
  IconChevronDown,
  IconHeart,
  IconLogout,
  IconMessage,
  IconPlayerPause,
  IconSettings,
  IconStar,
  IconSwitchHorizontal,
  IconTrash,
} from "@tabler/icons-react";
import {
  Autocomplete,
  Avatar,
  Burger,
  Group,
  Menu,
  Text,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Logo from "../assets/logo.svg";
import classes from "../css/HeaderSearch.module.css";
import cx from "clsx";

const links = [
  { link: "/home", label: "Home", icon: <IconHome size={16} /> },
  {
    link: "/present",
    label: "Presentation",
    icon: <IconDeviceDesktop size={16} />,
  },
];

function HeaderSearch() {
  const theme = useMantineTheme();

  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const activeLink = window.location.pathname;

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={`${classes.link} ${
        activeLink === link.link ? classes.active : ""
      }`}
    >
      {link.icon}
      <span>{link.label}</span>
    </a>
  ));

  const user = {
    name: "Jane Spoonfighter",
    email: "janspoon@fighter.dev",
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png",
  };

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group className={classes.leftGroup}>
          <Burger opened={opened} onClick={toggle} size="md" hiddenFrom="sm" />
          <img src={Logo} size={30} />
          <Autocomplete
            className={classes.search}
            placeholder="Find a file"
            nothingFound="No results found"
            pl={40}
            maw={300}
            miw={220}


            rightSection={
              <IconSearch
                size={16}
                stroke={1.5}
                style={{ color: "#0C959B" }}
              />
            }
            data={[
              "React",
              "Angular",
              "Vue",
              "Next.js",
              "Riot.js",
              "Svelte",
              "Blitz.js",
            ]}
            visibleFrom="xs"
            styles={{
              input: {
                borderColor: "#0C959B",
                borderRadius: 50,
                color: "#0C959B",
              },
              placeholder: {
                color: "#7BAFB3",
              },
            }}
          />
          <Group ml={10} gap={5} className={classes.links} visibleFrom="sm">
            {items}
          </Group>
        </Group>

        <Group className={classes.rightGroup} ml="auto">
          <Menu
            width={200} // Adjusted
            position="bottom-end"
            transitionProps={{ transition: "pop-top-right" }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
          >
            <Menu.Target>
              <UnstyledButton
                className={cx(classes.user, {
                  [classes.userActive]: userMenuOpened,
                })}
              >
                <Group gap={7}>
                  <Avatar
                    src={user.image}
                    alt={user.name}
                    radius="xl"
                    size={20}
                  />
                  <Text fw={500} size="sm" lh={1} mr={3}>
                    {user.name}
                  </Text>
                  <IconChevronDown size={12} stroke={1.5} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={
                  <IconHeart
                    size={16}
                    color={theme.colors.red[6]}
                    stroke={1.5}
                  />
                }
              >
                Liked posts
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconStar
                    size={16}
                    color={theme.colors.yellow[6]}
                    stroke={1.5}
                  />
                }
              >
                Saved posts
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconMessage
                    size={16}
                    color={theme.colors.blue[6]}
                    stroke={1.5}
                  />
                }
              >
                Your comments
              </Menu.Item>
              <Menu.Label>Settings</Menu.Label>
              <Menu.Item
                leftSection={<IconSettings size={16} stroke={1.5} />}
              >
                Account settings
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconSwitchHorizontal size={16} stroke={1.5} />
                }
              >
                Change account
              </Menu.Item>
              <Menu.Item
                leftSection={<IconLogout size={16} stroke={1.5} />}
              >
                Logout
              </Menu.Item>
              <Menu.Divider />
              <Menu.Label>Danger zone</Menu.Label>
              <Menu.Item
                leftSection={
                  <IconPlayerPause size={16} stroke={1.5} />
                }
              >
                Pause subscription
              </Menu.Item>
              <Menu.Item
                color="red"
                leftSection={<IconTrash size={16} stroke={1.5} />}
              >
                Delete account
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </div>
    </header>
  );
}

export default HeaderSearch;