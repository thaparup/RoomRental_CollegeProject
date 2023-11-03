import { Carousel } from "@mantine/carousel";
import axios from "axios";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Card, Divider, Flex, Image, Spoiler, Text } from "@mantine/core";
import { GETIMAGESROOM, GETMYROOMBYID } from "../../utils/ApiRoutes";
import { MdBathtub, MdOutlinePeopleAlt } from "react-icons/md";
import SwimmingIcon from "../../components/SwimmingIcon";
import WifiIcon from "../../components/WifiIcon";
import Washer from "../../components/Washer";
import Pets from "../Pets";
import HotWater from "../../components/HotWater";
import Balcony from "../../components/Balcony";
import Parking from "../../components/Parking";
import Yard from "../../components/Yard";
import Microwave from "../../components/Microwave";
import { AiFillStar } from "react-icons/ai";
import { BsArrowReturnLeft } from "react-icons/bs";

export default function HouseDetailPage() {
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

  const { id } = useParams();

  async function getRoomById() {
    let response = await axios.get(GETMYROOMBYID + `${id}`, {
      headers: {
        // Cookie: myTok
      },
      withCredentials: true,
    });
    return response;
  }
  const { data: roomData, } = useQuery(["getRoom"], getRoomById);
  console.log(roomData)


  async function getImagesRoom() {
    let response = await axios.get(GETIMAGESROOM + `${id}`, {
      headers: {
        // Cookie: myTok
      },
      withCredentials: true,
    });
    return response;
  }
  const {data: imageData, isFetching: fetchingImage} = useQuery(["getImagesRoom"], getImagesRoom);
    

  return (
    <div>
       <div className="flex py-4 px-20">
        <div className="bg-[#00acee] p-3 rounded-md">
          <Link to="/listing/room">
            <BsArrowReturnLeft size={18} className="text-white "/>
          </Link>
        </div>
      </div>
      <div className=" mx-40 ">
       
      <Text className="text-2xl font-medium mt-2">
          {roomData?.data.title}
        </Text>
        <Flex justify={"space-between"} className="mt-1">
          <div className="flex gap-2">
            <AiFillStar size={20} />
            <Text className="font-medium">4.8</Text>
           
            <Text className="font-medium underline">
              {" "}
              {roomData?.data.address}
            </Text>
          </div>

          <div className="font-medium">
            {" "}
            <span className="font-medium pr-2">Rs</span>
            {roomData?.data.cost}
            <span className="font-light">/day</span>
          </div>
        </Flex>

      <div className="flex gap-28 h-[520px]">
      {fetchingImage? 
          <div className="text-xl font-medium"> Fetching Image...</div>:(
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
            
          )
         
        }

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
                {roomData?.data.bathRoom}
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
                {roomData?.data.occupancy}
              </Text>
            </Flex>
          </Card>
        </div>
      </div>
      <div className="mt-16 w-[68%]">
        <Text fw={600}>About Room</Text>

        <Text className="">{roomData?.data.description}</Text>
        <Divider my="sm" />

        <Text fw={600}>Size</Text>

        <Text>{roomData?.data.size}</Text>
        <Divider my="sm" />
        <Text fw={600}>Facilities</Text>

        <Spoiler
          maxHeight={46}
          showLabel="Show more"
          hideLabel="Hide"
          transitionDuration={500}
          styles={{}}
        >
          {roomData?.data.facilitiesArray.map((item, index) => {
            const facilityArray = item.split(",");
            return (
              <div key={index}>
                {facilityArray.map((facilityItem, innerIndex) => {
                  const iconComponent = facilityIcons[facilityItem.trim()];
                  return (
                    <div key={innerIndex} className="flex gap-3 py-1">
                      {/* Render the icon component if it exists */}
                      {iconComponent && iconComponent()}
                      <p className="my-auto font-medium">{facilityItem}</p>{" "}
                      {/* Render the facilityArray element */}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </Spoiler>
        <Divider my="sm" className="mb-10" />
        <Text fw={600}>Your Terms And Conditions</Text>
        <Card shadow="sm" radius="md" withBorder className= "bg-[#00acee] bg-opacity-70 my-3 mb-4">
        <Text className="text-lg text-center font-bold text-white">Terms And Conditions</Text>
        <Card.Section className="p-4 text-white font-semibold">
        <div dangerouslySetInnerHTML={{ __html: roomData?.data.termsAndConditions }} />
      </Card.Section>
        </Card>
        
      </div>
    </div>
    </div>
  );
}
