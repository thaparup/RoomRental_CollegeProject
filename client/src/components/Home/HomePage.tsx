import { Container, createStyles, em } from "@mantine/core";
import { HeroSection } from "./HeroSection";
import { PopularCity } from "./PopularCity";
import { FeaturedProperty } from "./FeaturedProperty";
import { RecentProperty } from "./RecentProperty";
import { WhyChooseUs } from "./WhyChooseUs";
import { Team } from "./Team";
import { TopHeader } from "../Navbar/TopHeader";
import { FetchQuery } from "../../utils/ApiCall";
import {
  BOOKHOUSE,
  GETALLHOUSE,
  GETALLROOM,
  GETHOUSEBYID,
  GETSINGLEIMAGEFORROOM,
  GETUSER,
  HERO,
} from "../../utils/ApiRoutes";
import { useQuery } from "@tanstack/react-query";
import Partners from "./Partners";
import Testimonial from "./Testimonial";
import HomeVedio from "./HomeVedio";
import { News } from "./News";
import CallToAction from "./CallToAction";
import axios from "axios";
import ListingCard from "../My Listing/ListingCard";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ViewCard from "../ViewCard";
import AllRoomCard from "../AllRoomCard";
import ShortTermBooking from "../ShortTermBooking";
import LongTermBooking from "../LongTermBooking";
import HouseRent from "../HouseRent";
import HouseSell from "../HouseSell";
import { useUserContext } from "../../context/user";

const useStyles = createStyles((theme) => ({
  Contenttop: {
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    paddingBottom: `calc(${theme.spacing.xl} * 2)`,
    width: "-webkit-fill-available",
    [theme.fn.smallerThan("md")]: {
      marginRight: 0,
    },
  },

  inner: {
    display: "flex",
    justifyContent: "center",

    [theme.fn.smallerThan("md")]: {
      flexDirection: "column",
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
    height: "100vh",
    minHeight: "25rem",
    width: "100%",
    padding: "0",
    margin: "0",
    zIndex: 2,

    [`@media (max-width: ${em(579)}) and (min-width:${em(384)})`]: {
      height: "120vh",
    },
    [`@media (max-width: ${em(383)}) `]: {
      height: "160vh",
    },
  },
  overlay: {
    backgroundColor: "rgba(27,33,39,0.5)",
    position: "absolute",
    height: "100%",
    width: "100%",
    top: 0,
    right: 0,
  },
  partners: {
    backgroundColor: theme.colorScheme === "dark" ? "transparent" : "#f9f9f8",
  },
  calltoaction: {
    background:
      theme.colorScheme === "dark"
        ? "linear-gradient(90deg, #0d0330 0%, #061344 61%, #022236 100%)"
        : "linear-gradient(90deg, #443088 0%, #3454d1 61%, #009fff 100%)",
    marginTop: `calc(${theme.spacing.xl} * 2)`,
  },
}));

export default function HomePage() {
  // const { data } = useQuery(["members"], heroSecton);
  // const heroSecton = async () => {
  //   return await FetchQuery(HERO);
  // };
  const { user, setUser } = useUserContext()

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await axios.get(GETUSER, { withCredentials: true });
        setUser(response.data);



      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(user)


  const { classes } = useStyles();

  ;
  const getAllRoom = async () => {
    try {
      const response = await axios.get(GETALLROOM, { withCredentials: true });

      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const { data: roomData } = useQuery(["getAllRoom"], getAllRoom);




  const getAllHouse = async () => {
    try {
      const response = await axios.get(GETALLHOUSE, { withCredentials: true });

      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const { data: houseData } = useQuery(["getAllHouse"], getAllHouse);


  return (
    <>
      <header
        className={classes.headerbg}
      // style={{ backgroundImage: `url(${data?.data.image})` }}
      >
        <div className={classes.overlay} />

        <HeroSection />
      </header>

      <Container size="lg" style={{ paddingTop: "42px" }}>

        <ShortTermBooking roomBooking={roomData?.data.filter((room: any) => room.roomtype === "SHORT_TERM_BOOKING")} />
        <LongTermBooking roomRent={roomData?.data.filter((room: any) => room.roomtype === "LONG_TERM_BOOKING")} />
        <HouseRent houseRent={houseData?.data.filter((house: any) => house.type === "RENT")} />
        <HouseSell houseSell={houseData?.data.filter((house: any) => house.type === "SELL")} />
        <div className={classes.inner}>
          <div className={classes.Contenttop}>
            {/* <PopularCity /> */}
          </div>
        </div>
      </Container>
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.Contenttop}>
            {/* <FeaturedProperty /> */}
          </div>
        </div>
      </Container>
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.Contenttop}>
            {/* <RecentProperty /> */}
          </div>
        </div>
      </Container>
      <div className={classes.Contenttop}>
        <WhyChooseUs />
      </div>
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.Contenttop}>
            {/* <Team />{" "} */}
          </div>
        </div>
      </Container>
      <div className={classes.inner}>
        <div className={classes.Contenttop}>
          {/* <HomeVedio />{" "} */}
        </div>
      </div>
      <div className={classes.partners}>
        <Container size="lg">
          <div className={classes.inner}>
            <div className={classes.Contenttop}>
              {/* <Partners />{" "} */}
            </div>
          </div>
        </Container>
      </div>
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.Contenttop}>
            {/* <Testimonial />{" "} */}
          </div>
        </div>
      </Container>
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.Contenttop}>
            {/* <News />{" "} */}
          </div>
        </div>
      </Container>
      <div className={classes.calltoaction}>
        <Container size="lg">
          <div className={classes.inner}>
            <div className={classes.Contenttop}>
              {/* <CallToAction />{" "} */}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
