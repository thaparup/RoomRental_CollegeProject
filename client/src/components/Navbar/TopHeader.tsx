import {
  createStyles,
  Header,
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  Menu,
  Avatar,
  ActionIcon,
  useMantineColorScheme,
  Paper,
  keyframes,
  em,
  Image,
} from "@mantine/core";
import HiOutlineLogout from "react-icons/hi2";
import { MantineLogo } from "@mantine/ds";
import { useDisclosure } from "@mantine/hooks";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import {
  IconHeart,
  IconHelp,
  IconHierarchy,
  IconLogout,
  IconMessage,
  IconPlayerPause,
  IconSettings,
  IconStar,
  IconSwitchHorizontal,
  IconTrash,
} from "@tabler/icons-react";
import {
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconChevronDown,
  IconBuildingCommunity,
} from "@tabler/icons-react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import About from "../About/About";
import Logout from "../Auth/Logout";
import { GETUSER, GETUSERANDKYC, LOGOUT, ME } from "../../utils/ApiRoutes";
import axios from "axios";
import Cookies from "js-cookie";
import { useQuery } from "react-query";
import { MdLogout } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import UpdateLand from "../../pages/Land/UpdateLand";
import Logo from "../../assets/logo.png"

const smoothScroll = keyframes({
  "0%": { transform: "translateY(-40px)" },
  "100%": { transform: "translateY(0px)" },
});

const useStyles = createStyles((theme) => ({
  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: 0,
    textDecoration: "none",
    color: theme.white,
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    [theme.fn.smallerThan("sm")]: {
      height: rem(42),
      display: "flex",
      alignItems: "center",
      width: "100%",
    },
    ...theme.fn.hover({
      backgroundColor: "transparent",
    }),
    "&:hover": {
      color: "rgb(34,139,230)",
    },
  },
  linkFixed: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: 0,
    textDecoration: "none",
    color: theme.black,
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    [theme.fn.smallerThan("sm")]: {
      height: rem(42),
      display: "flex",
      alignItems: "center",
      width: "100%",
    },
    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[3],
    }),
  },

  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: 0,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    "&:active": theme.activeStyles,
  },
  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
  hiddenTab: {
    [`@media (max-width: ${em(876)})`]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
  user: {
    color: theme.white,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",

    ...theme.fn.hover({
      backgroundColor: "transparent",
    }),

    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },
  userFixed: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[3],
    }),

    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },
  userActive: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
  },
  navbar: {
    position: "relative",
    maxHeight: "5rem",
    height: "5rem",
    background: "transparent",
    borderBottom: 0,
    zIndex: 4,
  },
  navbarFixed: {
    position: "fixed",
    top: "0",
    maxHeight: "5rem",
    height: "5rem",
    zIndex: 4,
    backgroundColor: theme.colorScheme === "dark" ? "#1A1B1E" : "#fff",
    animation: `${smoothScroll} 1s forwards`,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? "transparent" : theme.colors.gray[2]
    }`,
  },

  toggle: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  toggleFixed: {
    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[3],
    },
  },
}));

const mockdata = [
  {
    icon: IconBuildingCommunity,
    title: "Manage Rentals",
    description: "This Pokémon’s cry is very loud and distracting",
  },
  {
    icon: IconCoin,
    title: "Advertise",
    description: "The fluid of Smeargle’s tail secretions changes",
  },
  {
    icon: IconHierarchy,
    title: "Agent Hub",
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
    icon: IconHelp,
    title: "Help",
    description: "Combusken battles with the intensely hot flames it spews",
  },
];

interface HeaderTabsProps {
  user: { name: string; image: string };
}
export function TopHeader() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme, cx } = useStyles();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [navbar, setNavbar] = useState(false);
  const [opened, setOpened] = useState(false);

  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group noWrap align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon size={rem(22)} color={theme.fn.primaryColor()} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" color="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const changeBackground = () => {
    if (window.scrollY >= 64) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  window.addEventListener("scroll", changeBackground);

  const navigate = useNavigate();

  const authToken = Cookies.get("token");

  //
  const handleLogout = async () => {
    try {
      const response = axios.post(LOGOUT, null, { withCredentials: true });

      if (((await response).status = 200)) {
        Cookies.remove("token");
        navigate("/auth");
      } else {
        console.log("not working");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      const response = await axios.get(GETUSER, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const { data: user } = useQuery(["getUserKyc"], getUser);
  // console.log(user);
  return (
    <Box className="bg">
      <Header
        height={60}
        px="md"
        className={navbar ? classes.navbarFixed : classes.navbar}
      >
        <Group position="apart" sx={{ height: "100%" }} className="mx-16">
          <Group>
            {/* <MantineLogo size={30} /> */}
            <Image height={40} mx="auto" radius="xl" src={Logo} alt="Random image" />
          </Group>

          <Group
            sx={{ height: "100%" }}
            spacing={0}
            className={classes.hiddenMobile}
          >
            <NavLink
              to="/"
              className={navbar ? classes.linkFixed : classes.link}
              style={({ isActive }) => {
                return {
                  backgroundColor: isActive
                    ? theme.fn.variant({
                        variant: "light",
                        color: theme.primaryColor,
                      }).background
                    : "",

                  color: isActive
                    ? theme.fn.variant({
                        variant: "light",
                        color: theme.primaryColor,
                      }).color
                    : "",
                  borderRadius: "12px",
                };
              }}
            >
              <Text className="hover:bg-[rgba(37,99,235,0.2)]">Home</Text>
            </NavLink>
            <NavLink
              to="/buy"
              className={navbar ? classes.linkFixed : classes.link}
              style={({ isActive }) => {
                return {
                  backgroundColor: isActive
                    ? theme.fn.variant({
                        variant: "light",
                        color: theme.primaryColor,
                      }).background
                    : "",
                  "&:hover": {
                    backgroundColor: "#00acee",
                  },
                  color: isActive
                    ? theme.fn.variant({
                        variant: "light",
                        color: theme.primaryColor,
                      }).color
                    : "",
                };
              }}
            >
              <Text className="text-black">Buy</Text>
            </NavLink>
            <NavLink
              to="/rent"
              className={navbar ? classes.linkFixed : classes.link}
              style={({ isActive }) => {
                return {
                  backgroundColor: isActive
                    ? theme.fn.variant({
                        variant: "light",
                        color: theme.primaryColor,
                      }).background
                    : "",

                  color: isActive
                    ? theme.fn.variant({
                        variant: "light",
                        color: theme.primaryColor,
                      }).color
                    : "",
                };
              }}
            >
               <Text className="text-black"> Rent</Text>
            </NavLink>
            <NavLink
              to="sale"
              className={navbar ? classes.linkFixed : classes.link}
              style={({ isActive }) => {
                return {
                  backgroundColor: isActive
                    ? theme.fn.variant({
                        variant: "light",
                        color: theme.primaryColor,
                      }).background
                    : "",

                  color: isActive
                    ? theme.fn.variant({
                        variant: "light",
                        color: theme.primaryColor,
                      }).color
                    : "",
                };
              }}
            >
             <Text className="text-black"> Sale</Text>
            </NavLink>

            <NavLink to="">
              <Menu
                trigger="hover"
                openDelay={100}
                closeDelay={400}
                withArrow
                width={200}
                shadow="md"
              >
                <Menu.Target>
                  <Text className=" text-sm translate-y-[-1px] px-[13px] font-medium hover:text-primary">
                    Kyc
                  </Text>
                </Menu.Target>
                <Menu.Dropdown>
                  <Link to="/kyc/edit">
                    <Menu.Item className="hover:text-primary">
                      <Text className="text-sm text-black font-semibold py-1 hover:text-primary">
                        Edit Kyc
                      </Text>
                    </Menu.Item>
                  </Link>
                  <Link to="/kyc/view">
                    <Menu.Item className="hover:text-primary">
                      <Text className="text-sm text-black font-semibold py-1 hover:text-primary">
                        View Kyc
                      </Text>
                    </Menu.Item>
                  </Link>
                </Menu.Dropdown>
              </Menu>
            </NavLink>

            <NavLink
              to=""
              className={navbar ? classes.linkFixed : classes.link}
              // style={({ isActive }) => {
              //   return {
              //     backgroundColor: isActive
              //       ? theme.fn.variant({
              //           variant: "light",
              //           color: theme.primaryColor,
              //         }).background
              //       : "",

              //     color: isActive
              //       ? theme.fn.variant({
              //           variant: "light",
              //           color: theme.primaryColor,
              //         }).color
              //       : "",
              //   };

              // }}
            >
              <Menu
                trigger="hover"
                openDelay={100}
                closeDelay={400}
                withArrow
                width={200}
                shadow="md"
              >
                <Menu.Target>
                  <Text className="text-black">Listing</Text>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label className=" rounded-md">
                    <Link to="/listing/house">
                      <Text className="text-sm text-black font-semibold py-1 hover:text-primary">
                        House
                      </Text>
                    </Link>
                  </Menu.Label>
                  <Menu.Label>
                    <Link to="/listing/room">
                      <Text className="text-sm text-black font-semibold py-1 hover:text-primary">
                        Room
                      </Text>
                    </Link>
                  </Menu.Label>
                  <Menu.Label>
                    <Link to="/listing/land">
                      <Text className="text-sm text-black font-semibold py-1 hover:text-primary">
                        Land
                      </Text>
                    </Link>
                  </Menu.Label>
                  <Menu.Label>
                    <Link to="/listing/hostel">
                      <Text className="text-sm text-black font-semibold py-1 hover:text-primary">
                        Hostel
                      </Text>
                    </Link>
                  </Menu.Label>
                  <Menu.Label>
                    <Link to="/listing/flat">
                      <Text className="text-sm text-black font-semibold py-1 hover:text-primary">
                        Flat
                      </Text>
                    </Link>
                  </Menu.Label>
                </Menu.Dropdown>
              </Menu>
            </NavLink>
          </Group>

          <Group className="">
            {authToken ? (
              ""
            ) : (
              <button className="text-[rgb(34,139,230)] font-semibold">
                <Link to="/auth" className="">
                  Log in
                </Link>
              </button>
            )}

            {authToken ? (
              ""
            ) : (
              <Button className="bg-[#e7f5ffd9] rounded-2xl text-[rgb(34,139,230)] hover:text-white">
                <Link to="/auth">Sign up</Link>
              </Button>
            )}
            {authToken ? (
              <Menu>
                <Menu.Target>
                  <Avatar
                    src={user?.data.profileImage}
                    alt="it's me"
                    radius="xl"
                  />
                  {/* <Image
                         src={data?.data.kyc.profileImage }
                         height={30}
                         width={30}
                         radius="xl"
                       /> */}
                </Menu.Target>

                <Menu.Dropdown className="px-2">
                  <Menu.Item className="">
                    <label htmlFor="" className="text-stand">
                      {user?.data.name}
                    </label>
                  </Menu.Item>
                  <Menu.Item
                    icon={<MdLogout size={14} />}
                    className="translate-y-[-5px] text-primary"
                  >
                    <Link to="" onClick={handleLogout}>
                      <label htmlFor="" className="text-stand">
                        Logout
                      </label>
                    </Link>
                  </Menu.Item>
                  <Menu.Item
                    icon={<AiOutlineEdit size={16} />}
                    className="translate-y-[-5px] text-primary"
                  >
                    <Link to="/account/edit">
                      <label htmlFor="" className="text-stand">
                        Edit Profile
                      </label>
                    </Link>
                  </Menu.Item>
                  <Menu.Item className="translate-y-[-5px] text-primary">
                    <Link to="/admin">
                      <label htmlFor="" className="text-stand">
                        Super Admin
                      </label>
                    </Link>
                  </Menu.Item>
                  <Menu.Item className="translate-y-[-5px] text-primary">
                    <Link to="/messages">
                      <label htmlFor="" className="text-stand">
                        Messages
                      </label>
                    </Link>
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            ) : (
              ""
            )}
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
          />
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />
          <ActionIcon
            onClick={() => toggleColorScheme()}
            size="lg"
            sx={(theme) => ({
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[6]
                  : theme.colors.gray[0],
              color:
                theme.colorScheme === "dark"
                  ? theme.colors.yellow[4]
                  : theme.colors.blue[6],
            })}
            className={navbar ? classes.toggleFixed : classes.toggle}
          >
            {colorScheme === "dark" ? (
              <IconSun size="1.2rem" />
            ) : (
              <IconMoonStars size="1.2rem" />
            )}
          </ActionIcon>
          <NavLink
            to="home"
            onClick={closeDrawer}
            className={navbar ? classes.linkFixed : classes.link}
            style={({ isActive }) => {
              return {
                backgroundColor: isActive
                  ? theme.fn.variant({
                      variant: "light",
                      color: theme.primaryColor,
                    }).background
                  : "",

                color: isActive
                  ? theme.fn.variant({
                      variant: "light",
                      color: theme.primaryColor,
                    }).color
                  : "",
              };
            }}
          >
            Home
          </NavLink>
          <NavLink
            to="buy"
            onClick={closeDrawer}
            className={navbar ? classes.linkFixed : classes.link}
            style={({ isActive }) => {
              return {
                backgroundColor: isActive
                  ? theme.fn.variant({
                      variant: "light",
                      color: theme.primaryColor,
                    }).background
                  : "",

                color: isActive
                  ? theme.fn.variant({
                      variant: "light",
                      color: theme.primaryColor,
                    }).color
                  : "",
              };
            }}
          >
            Buy
          </NavLink>
          <NavLink
            to="rent"
            onClick={closeDrawer}
            className={navbar ? classes.linkFixed : classes.link}
            style={({ isActive }) => {
              return {
                backgroundColor: isActive
                  ? theme.fn.variant({
                      variant: "light",
                      color: theme.primaryColor,
                    }).background
                  : "",

                color: isActive
                  ? theme.fn.variant({
                      variant: "light",
                      color: theme.primaryColor,
                    }).color
                  : "",
              };
            }}
          >
            Rent
          </NavLink>
          <NavLink
            to="sale"
            onClick={closeDrawer}
            className={navbar ? classes.linkFixed : classes.link}
            style={({ isActive }) => {
              return {
                backgroundColor: isActive
                  ? theme.fn.variant({
                      variant: "light",
                      color: theme.primaryColor,
                    }).background
                  : "",

                color: isActive
                  ? theme.fn.variant({
                      variant: "light",
                      color: theme.primaryColor,
                    }).color
                  : "",
              };
            }}
          >
            Sale
          </NavLink>
          <NavLink
            to="about"
            className={navbar ? classes.linkFixed : classes.link}
            style={({ isActive }) => {
              return {
                backgroundColor: isActive
                  ? theme.fn.variant({
                      variant: "light",
                      color: theme.primaryColor,
                    }).background
                  : "",

                color: isActive
                  ? theme.fn.variant({
                      variant: "light",
                      color: theme.primaryColor,
                    }).color
                  : "",
              };
            }}
          >
            About
          </NavLink>
          <NavLink
            to="home-loans"
            onClick={closeDrawer}
            className={navbar ? classes.linkFixed : classes.link}
            style={({ isActive }) => {
              return {
                backgroundColor: isActive
                  ? theme.fn.variant({
                      variant: "light",
                      color: theme.primaryColor,
                    }).background
                  : "",

                color: isActive
                  ? theme.fn.variant({
                      variant: "light",
                      color: theme.primaryColor,
                    }).color
                  : "",
              };
            }}
          >
            Home Loans
          </NavLink>
          <NavLink
            to="agent-finder"
            onClick={closeDrawer}
            className={navbar ? classes.linkFixed : classes.link}
            style={({ isActive }) => {
              return {
                backgroundColor: isActive
                  ? theme.fn.variant({
                      variant: "light",
                      color: theme.primaryColor,
                    }).background
                  : "",

                color: isActive
                  ? theme.fn.variant({
                      variant: "light",
                      color: theme.primaryColor,
                    }).color
                  : "",
              };
            }}
          >
            Agent Finder
          </NavLink>
          <UnstyledButton
            className={navbar ? classes.linkFixed : classes.link}
            onClick={toggleLinks}
          >
            <Center inline>
              <Box component="span" mr={5}>
                Features
              </Box>
              <IconChevronDown size={16} color={theme.fn.primaryColor()} />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{links}</Collapse>

          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          <Group position="center" grow pb="xl" px="md">
            <Button variant="default">
              <a href="/auth">Log in</a>
            </Button>
            <Button className=" bg-blue-600 hover:bg-blue-700">
              {" "}
              <a href="/auth">Sign up</a>
            </Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
