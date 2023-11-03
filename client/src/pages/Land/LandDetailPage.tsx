import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { GETIMAGESLAND, GETLANDBYID } from "../../utils/ApiRoutes";
import axios from "axios";
import { useQuery } from "react-query";
import {
  Divider,
  Card,
  Flex,
  Text,
  Image,
  Container,
  SelectItemProps,
  CloseButton,
  Box,
} from "@mantine/core";
import RatingIcon from "../../components/My Listing/ListingIcon";
import { Carousel } from "@mantine/carousel";
import SwimmingIcon from "../../components/SwimmingIcon";
import WifiIcon from "../../components/WifiIcon";
import Washer from "../../components/Washer";
import Pets from "../Pets";

export default function LandDetailPage() {
  const { id } = useParams();

  const [imageData, setImageData] = useState();

  const facilityIcons = {
    React: () => (
      <SwimmingIcon/>

    ),
    Svelte: () => (
      <WifiIcon/>
    ),
    Pets:()=>(
      <Pets/>
    ),
 
    Angular: () => (
      <Washer/>


    ),

  };

  async function getLandById() {
    let response = await axios.get(GETLANDBYID + `${id}`, {
      headers: {
        // Cookie: myTok
      },
      withCredentials: true,
    });
    return response;
  }
  const { data, error } = useQuery(["getLand"], getLandById);

  if (error) return <div>Request Failed</div>;
  if (data) {
    console.log(data);
  }
  async function getImagesLand() {
    let response = await axios.get(GETIMAGESLAND + `${id}`, {
      headers: {
        // Cookie: myTok
      },
      withCredentials: true,
    });
    return response;
  }
  const landImages = useQuery(["getImagesLand"], getImagesLand);
  if (landImages.error) {
    <div>Request failed</div>;
  }
  if (landImages.data) {
    console.log(landImages.data);
  }

  // console.log(typeof data?.data.land.facilities)

  return (
    <div className="mx-40">
      <div className="flex justify-between ">
        <div className=" mt-6">
          <h1 className="text-2xl">{data?.data.land.title}</h1>
          <Flex className="gap-1">
            <RatingIcon />
            <Text>4.8</Text>
            <Text className="pl-2 underline">{data?.data.land.location}</Text>
          </Flex>
        </div>

        <Text className="font-medium self-end mb-2">
          {" "}
          <span className="mr-2 ">Nrs</span>
          {data?.data.land.cost}
        </Text>
      </div>

      <div className="flex gap-28 h-[520px]">
        <Carousel
          maw={800}
          mx="auto"
          withIndicators
          height="100%"
          // slideGap="xl"
          className="my-4 "
          // slideSize="33.333333%"
        >
          {landImages.data?.data.map((img: any) => (
            <Carousel.Slide>
              <Image src={img.image} radius="md" className="" />
            </Carousel.Slide>
          ))}
        </Carousel>
        <div className=" flex flex-col gap-2 flex-grow ">
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            className="mt-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-building-community"
              width="34"
              height="34"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M8 9l5 5v7h-5v-4m0 4h-5v-7l5 -5m1 1v-6a1 1 0 0 1 1 -1h10a1 1 0 0 1 1 1v17h-8"></path>
              <path d="M13 7l0 .01"></path>
              <path d="M17 7l0 .01"></path>
              <path d="M17 11l0 .01"></path>
              <path d="M17 15l0 .01"></path>
            </svg>
            <Flex className="gap-2 ml-3 mb-1  translate-x-[-5px]">
              <Text className="text-xl font-semibold  translate-y-[-1px]">
                Area:
              </Text>
              <Text className="text-lg font-medium ">
                {data?.data.land.area}
              </Text>
            </Flex>
          </Card>
          <Card shadow="sm" padding="lg" radius="md" withBorder className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-arrow-bear-right"
              width="34"
              height="34"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M12 3h5v5"></path>
              <path d="M17 3l-7.536 7.536a5 5 0 0 0 -1.464 3.534v6.93"></path>
            </svg>
            <Flex className="gap-2 ml-3 mb-1">
              <Text className="text-xl font-semibold  translate-y-[-1px]">
                Faced On:
              </Text>
              <Text className="text-lg font-medium ">
                {data?.data.land.facedOn}
              </Text>
            </Flex>
          </Card>
          <Card shadow="sm" padding="lg" radius="md" withBorder className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-road  translate-x-[7px]"
              width="34"
              height="34"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M4 19l4 -14"></path>
              <path d="M16 5l4 14"></path>
              <path d="M12 8v-2"></path>
              <path d="M12 13v-2"></path>
              <path d="M12 18v-2"></path>
            </svg>
            <Flex className="gap-2 ml-3 mb-1  ">
              <Text className="text-xl font-semibold  translate-y-[-1px]">
                Occupancy
              </Text>
              <Text className="text-lg font-medium ">
                {data?.data.land.distanceFromRoad}
              </Text>
            </Flex>
          </Card>
        </div>
      </div>
      <div className="mt-16 w-[68%] mb-8">
        <h1 className="text-lg font-medium">About Land</h1>

        <Text className="">{data?.data.land.description}</Text>
        <Divider my="sm" />
        <h1 className="text-md font-medium">Type</h1>
        <Text>{data?.data.land.type}</Text>
        <Divider my="sm" />
        <div className="" style={{ }}>
      {data?.data.land.facilities.map((item, index) => {
        const facilityArray = item.split(',');
        return (
          <div key={index}>
            {facilityArray.map((facilityItem, innerIndex) => {
              const iconComponent = facilityIcons[facilityItem.trim()];
              return (
                <div key={innerIndex} className="flex gap-2">
                  
                   {/* Render the icon component if it exists */}
                  
                  {iconComponent && iconComponent()}
                    
                  <p>{facilityItem}</p> {/* Render the facilityArray element */}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>

      </div>
    </div>
  );
}
