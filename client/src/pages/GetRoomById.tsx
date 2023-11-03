import { Carousel } from "@mantine/carousel";
import axios from "axios";
import React, { useState, forwardRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import {
  Anchor,
  Avatar,
  Button,
  Card,
  Checkbox,
  Divider,
  Flex,
  Image,
  Spoiler,
  Text,
  TextInput,
} from "@mantine/core";
import { parse, stringify, toJSON, fromJSON } from "flatted";
import { MdBathtub, MdOutlinePeopleAlt } from "react-icons/md";
import { AiFillStar, AiOutlineSend } from "react-icons/ai";
import SwimmingIcon from "../components/SwimmingIcon";
import WifiIcon from "../components/WifiIcon";
import Washer from "../components/Washer";
import Pets from "./Pets";
import HotWater from "../components/HotWater";
import Balcony from "../components/Balcony";
import Parking from "../components/Parking";
import Yard from "../components/Yard";
import Microwave from "../components/Microwave";
import {
  GETIMAGESROOM,
  GETROOMBYID,
  GETROOMRESERVATION,
  SENDMESSAGE,
  GETCOMMENTS,
  BETWEENTWO,
  BOOKROOM,
  ROOMRESERVATION,
} from "../utils/ApiRoutes";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import {
  eachDayOfInterval,
  startOfDay,
  differenceInDays,
  parseISO,
} from "date-fns";
import { useForm } from "@mantine/form";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import { useFormik } from "formik";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Group, ScrollArea } from "@mantine/core";
import Comment from "../components/Comment";
import MessageFrom from "../components/MessageInput";
import MessageInput from "../components/MessageInput";
import Demo from "../components/RoomReservation";
import RoomReservation from "../components/RoomReservation";
import RoomBook from "./RoomBook";
import LeafletView from "../components/LeafletView";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import WriteComment from "../components/WriteComment";

export default function GetRoomById({}) {
  const { id } = useParams();
  const authToken = Cookies.get("token");
  const [convertedDates, setConvertedDates] = useState([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [roomData, setRoomData] = useState(null);
  const [messages, setMessages] = useState([]);
  const content = Array(100)
    .fill(0)
    .map((_, index) => <p key={index}>Modal with scroll</p>);
  
  const [reservationDates, setReservationDates] = useState([]);


  // Merging to single Array
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(GETROOMRESERVATION + id, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        // Assuming the response data has the same structure as your provided example
        const data = response.data;

        // Extract and flatten the reservation dates
        const dates = data.reduce((datesArray, item) => {
          return datesArray.concat(item.reservations);
        }, []);

        setReservationDates(dates);
        const conDates = reservationDates.map((dateString) => {
          const date = parseISO(dateString);
          return startOfDay(date);
        });
        setConvertedDates(conDates);
      } catch (error) {
        // Handle errors
        console.error(error);
      }
    };

    fetchData();
  }, [id]);


  // Date Parse
  useEffect(() => {
    const conDates = reservationDates.map((dateString) => {
      const date = parseISO(dateString);
      return startOfDay(date);
    });
    setConvertedDates(conDates);
  }, [reservationDates]);


  

  const facilityIcons = {
    Swimming: () => <SwimmingIcon height={36} width={36} />,
    Wifi: () => <WifiIcon height={36} width={36} />,
    Washer: () => <Washer height={36} width={36} />,
    Pets: () => <Pets height={36} width={36} />,
    Hot_Water: () => <HotWater height={36} width={36} />,
    Balcony: () => <Balcony height={36} width={36} />,
    Parking: () => <Parking height={36} width={36} />,
    Yard: () => <Yard height={36} width={36} />,
    Microwave: () => <Microwave height={36} width={36} />,
  };

  // const calculateTotalDays = () => {
  //   const startDate = date[0].startDate;
  //   const endDate = date[0].endDate || new Date(); // Use today's date if endDate is null
  //   const totalDays = differenceInDays(endDate, startDate);
  //   return totalDays;
  // };

  const form = useForm({
    initialValues: {},
    //
  });

  // const reservationsString = JSON.stringify(individualDates);
  // form.values.reservations = reservationsString

  //   console.log( form.values.reservations)

  const handleSubmit = (values: any, event: any) => {
    event.preventDefault();
  };




  // Room Fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(GETROOMBYID + `${id}`, {
          headers: {
            // Add any headers you need here
          },
          withCredentials: true,
        });

        // Assuming your API response structure has latitude and longitude fields
        // const { latitude, longitude } = response.data;

        // // Set the latitude and longitude in the component's state
        // setLat(parseFloat(latitude));
        // setLong(parseFloat(longitude));
        setRoomData(response.data);
        const { latitude, longitude } = response.data;

        // Set the latitude and longitude in the component's state as floats
        setLat(parseFloat(latitude));
        setLong(parseFloat(longitude));
      } catch (error) {
        // Handle errors here
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]); // Run this effect whenever the 'id' prop changes
  
  const userId = roomData?.user.id;

  async function getImagesRoom({}) {
    let response = await axios.get(GETIMAGESROOM + `${id}`, {
      headers: {
        // Cookie: myTok
      },
      withCredentials: true,
    });
    return response;
  }

  const { data: imageData, isFetching: imageFetching } = useQuery(
    ["getImagesRoom"],
    getImagesRoom
  );

  async function getComment() {
    try {
      const response = await axios.get(GETCOMMENTS + `${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      return response;
    } catch (error) {}
  }

  const { data: commentData, isFetching: commentDataFetching } = useQuery(
    ["getComment"],
    getComment
  );

  //   Fetch Messages
  useEffect(() => {
    // console.log("Before API Request - userId:", userId);

    if (userId) {
      axios
        .get(BETWEENTWO + `${userId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((response) => {
          setMessages(response.data);
        })
        .catch((error) => {
          console.error("Error fetching messages:", error);
        });
    }

    // console.log("After API Request - userId:", userId);
  }, [userId]);

  const sendText = async (values: any) => {
    try {
      console.log(values.messsages);
      // await axios
      //   .post(SENDMESSAGE + `${userId}`, values, { withCredentials: true })
      //   .then(() => {
      //     toast("Message sent ", {
      //       position: "top-right",
      //       autoClose: 1000,
      //       hideProgressBar: false,
      //       closeOnClick: true,
      //       pauseOnHover: true,
      //       draggable: true,
      //       progress: undefined,
      //       theme: "light",
      //     });
      //     // formik.resetForm();
      //   });
    } catch (error) {
      console.log(error);
      toast.warn("problem while sending the request");
    }
  };
  const xxx = parseFloat(roomData?.room.myLat);
  const yyy = parseFloat(roomData?.room.myLong);
  console.log(yyy);
  console.log(xxx);
  const sendMutation = useMutation(sendText, {
    onMutate(variables) {},
  });

  const handleMessage = (values: any, event: any) => {
    event.preventDefault();

    sendMutation.mutate(values);
  };



  return (
    <div className=" mx-40 ">
      <Text className="text-2xl font-medium mt-2">{roomData?.room.title}</Text>
      <Flex justify={"space-between"} className="mt-1">
        <div className="flex gap-2 ">
          <AiFillStar size={20} />
          <Text className="font-medium">4.8</Text>
          <Modal
            opened={opened}
            onClose={close}
            title="Reviews"
            size="70%"
            transitionProps={{ transition: "fade", duration: 200 }}
            scrollAreaComponent={ScrollArea.Autosize}
            // className=" min-h-[500px]"
          >
            {commentDataFetching ? (
              <div>Comment is Fetching.....</div>
            ) : commentData?.data.length < 1 ? (
              <p className="text-lg font-medium">No comments yet</p>
            ) : (
              commentData?.data.map((ele) => {
                return (
                  <Comment
                    text={ele.text}
                    url={ele.commenterProfileImage}
                    name={ele.commenterName}
                  />
                );
              })
            )}
          </Modal>

          <Group position="center">
            <Text
              className="font-medium underline cursor-pointer"
              onClick={open}
            >
              {" "}
              {commentData?.data.length} reviews
            </Text>
          </Group>
          <Text className="font-medium underline">
            {" "}
            {roomData?.room.address}
          </Text>
        </div>

        <div className="font-medium">
          {" "}
          <span className="font-medium pr-2">Rs</span>
          {roomData?.room.cost}
          <span className="font-light"></span>
        </div>
      </Flex>

      <div className="flex gap-28 h-[520px]">
        {imageFetching ? (
          <div className="text-xl font-medium"> Fetching Image...</div>
        ) : (
          <Carousel
            maw={800}
            mx="auto"
            withIndicators
            height="100%"
            // slideGap="xl"
            className="my-4 "
            // slideSize="33.333333%"
          >
            {imageData?.data.map((img: any) => (
              <Carousel.Slide>
                <Image src={img.image} radius="md" className="" />
              </Carousel.Slide>
            ))}
          </Carousel>
        )}
        <div className=" flex flex-col gap-2 flex-grow max-w-[25%]">
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            className="mt-3"
          >
            <MdBathtub size={34} />

            <Flex className="gap-2 mb-1">
              <Text className="text-xl font-semibold  translate-y-[-1px]">
                BathRoom
              </Text>
              <Text className="text-lg font-medium ">
                {roomData?.room.bathRoom}
              </Text>
            </Flex>
          </Card>
          <Card shadow="sm" padding="lg" radius="md" withBorder className="">
            <MdOutlinePeopleAlt size={34} />

            <Flex className="gap-2  mb-1">
              <Text className="text-xl font-semibold  translate-y-[-1px]">
                Occupancy
              </Text>
              <Text className="text-lg font-medium ">
                {roomData?.room.occupancy}
              </Text>
            </Flex>
          </Card>
        </div>
      </div>
      {/* <form
      action=""
      onSubmit={form.onSubmit((values) => {
        handleSubmit(values, event);
      })}
    > */}
      <section className=" flex gap-24 pt-8 ">
        <div className=" w-[68%] ">
          <Flex justify={"space-between"}>
            <div>
              <h1 className="text-2xl font-medium">
                Room Hosted By {roomData?.user.name}
              </h1>
              <h2>
                {" "}
                <span className="font-light">Type:</span>{" "}
                {roomData?.room.roomtype.replaceAll("_"," ")}
              </h2>
            </div>
            <Avatar src={roomData?.kyc.documentImage} radius="xl" size={48} />
          </Flex>
          <Text fw={600} mt={20}>
            About Room
          </Text>

          <Text className="">{roomData?.room.description}</Text>
          <Divider my="sm" />

          <Text fw={600}>Size</Text>

          <Text>{roomData?.room.size}</Text>
          <Divider my="sm" />
          <Text fw={600}>Facilities</Text>

          <Spoiler
            maxHeight={46}
            showLabel="Show more"
            hideLabel="Hide"
            transitionDuration={500}
            styles={{}}
          >
            {roomData?.room.facilitiesArray.map((item, index) => {
              const facilityArray = item.split(",");
              return (
                <div key={index}>
                  {facilityArray.map((facilityItem, innerIndex) => {
                    const iconComponent = facilityIcons[facilityItem.trim()];
                    return (
                      <div key={innerIndex} className="flex gap-3 py-1">
                        {/* Render the icon component if it exists */}
                        {iconComponent && iconComponent()}
                        <p className="my-auto font-medium">
                          {facilityItem}
                        </p>{" "}
                        {/* Render the facilityArray element */}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </Spoiler>
          <Divider my="sm" className="mb-8" />
          <Text fw={600}>LandLord's Terms And Conditions</Text>
          <Card
            shadow="sm"
            radius="md"
            withBorder
            className="bg-primary bg-opacity-900 my-3 mb-4"
          >
            <Text className="text-lg text-center font-bold text-white">
              Terms And Conditions
            </Text>
            <Card.Section className="p-4 text-white font-semibold">
              <div
                dangerouslySetInnerHTML={{
                  __html: roomData?.room.termsAndConditions,
                }}
              />
            </Card.Section>
          </Card>
          {roomData?.room.roomtype === "LONG_TERM_BOOKING" ? (
            <RoomBook id={id} userId={userId} />
          ) : null}
        </div>
        {roomData?.room.roomtype === "SHORT_TERM_BOOKING" ? (
          <RoomReservation id={id} cost={roomData?.room.cost} convertedDates ={convertedDates} userId={userId}/>
        ) : null}
      </section>

      <section className="shadow-lg max-w-screen-md ">
      <div className="max-w-screen-md ">
        <div className="bg-white  p-4 rounded-lg">
          <p className="text-center text-lg font-medium">
            Your Chat with {roomData?.user.name}
          </p>
          <ul className="space-y-2  pt-4">
            {messages.length === 0 ? (
              <p className="text-md font-medium">
                Conversation hasn't yet started
              </p>
            ) : (
              messages.map((message, index) => (
                <div>
                  {message.receiverId === userId ? (
                    <div className=" flex justify-end">
                      <div className="bg-[#228BE6] text-white  max-w-[200px] min-w-[200px] p-2 rounded-lg text-sm">
                        {message.message}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-200 text-gray-700  max-w-[200px] p-2 rounded-lg min-w-[200px] ">
                      {message.message}
                    </div>
                  )}
                </div>
              ))
            )}
          </ul>
        </div>
      </div>
      {/* </form> */}
      <div className="max-w-screen-md ">
        <MessageInput id={userId} />
      </div>
      </section>
         

        
       
         <WriteComment id={id}/>
       
        
      {xxx !== null && yyy !== null ? (
        <div className="py-12"><LeafletView lat={xxx} long={yyy} /></div>
      ) : (
        <p>Loading or no data available</p>
      )}
      <ToastContainer />
    </div>
  );
}
