import { createStyles, Container, Title, Text, rem, em } from "@mantine/core";
import { FetchQuery } from "../../utils/ApiCall";
import { HERO } from "../../utils/ApiRoutes";
import { useQuery } from "@tanstack/react-query";
import ReactHtmlParser from "react-html-parser";
import { Searchbar } from "./Searchbar";

const useStyles = createStyles((theme) => ({
  root: {
    // backgroundColor: "#11284b",
    backgroundSize: "cover",
    backgroundPosition: "center",
    // backgroundImage:
    //   "linear-gradient(250deg, rgba(130, 201, 30, 0) 0%, #062343 70%), url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80)",
    paddingTop: `calc(${theme.spacing.xl} * 3)`,
    paddingBottom: `calc(${theme.spacing.xl} * 3)`,
    [`@media (max-width: ${em(579)}) `]: {
      paddingTop: `0`,
    },
  },
  headerbg: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundImage: " url(https://wallsproperty.netlify.app/images/bg7.jpg)",
    backgroundAttachment: "fixed",
    WebkitBackgroundSize: "cover",
    position: "relative",
    backgroundColor: "#d1e6f9",
    // height: "90vh",
    minHeight: "25rem",
    width: "100%",
    padding: "0",
    margin: "0",
    zIndex: 2,

    // [`@media (max-width: ${em(579)}) and (min-width:${em(384)})`]: {
    //   height: "120vh",
    // },
    // [`@media (max-width: ${em(383)}) `]: {
    //   height: "160vh",
    // },
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",

    [theme.fn.smallerThan("md")]: {
      flexDirection: "column",
    },
  },

  image: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  content: {
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    paddingBottom: `calc(${theme.spacing.xl} * 2)`,
    // marginRight: `calc(${theme.spacing.xl} * 3)`,

    [theme.fn.smallerThan("md")]: {
      marginRight: 0,
    },
  },

  title: {
    color: theme.white,
    position: "relative",
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    lineHeight: 1.05,
    maxWidth: rem(500),
    fontSize: rem(48),

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      fontSize: rem(34),
      lineHeight: 1.15,
    },
  },

  description: {
    color: theme.white,
    opacity: 0.75,
    maxWidth: rem(500),

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
    },
  },

  control: {
    paddingLeft: rem(50),
    paddingRight: rem(50),
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(22),

    [theme.fn.smallerThan("md")]: {
      width: "100%",
    },
  },
  search: {
    backgroundPosition: "center",
  },
  overlay: {
    backgroundColor: "rgba(27,33,39,0.5)",
    position: "absolute",
    height: "100%",
    width: "100%",
    top: 0,
    right: 0,
  },
}));



export function HeroSection() {
  const { classes } = useStyles();


  return (
    <header
      className={classes.headerbg}
    // style={{ backgroundImage: `url(${data?.data.image})` }}
    >
      <div className={classes.overlay} />
      <div
        className={classes.root}
      // style={{ backgroundImage: `url(${data?.data.image})` }}
      >
        <Container size="lg">
          <div className={classes.inner}>
            <div className={classes.content}>
              <Title className={classes.title}>
                <Text
                  component="span"
                  inherit
                  variant="gradient"
                  gradient={{ from: "pink", to: "yellow" }}
                >
                  {/* {ReactHtmlParser(heading)} */}
                  Find Your Dream Property
                </Text>{" "}
                {/* {ReactHtmlParser(subHeading)} */}
              </Title>

              <Text className={classes.description} mt={30}>
                {/* {ReactHtmlParser(description)} */}
                Your Property, Our Priority and From as low as $10 per day with limited time offer discounts
              </Text>
              {/* <Button
              variant="gradient"
              size="xl"
              className={
                (classes.control,
                "text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 ")
              }
              mt={40}
            >
              Get started
            </Button> */}
              {/* <Searchbar /> */}
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
}
