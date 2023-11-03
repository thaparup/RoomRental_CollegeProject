import axios from "axios";
import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import {

  GETIMAGESHOUSE,
  GETMYHOUSEBYID,
 
} from "../../utils/ApiRoutes";
import { useQuery } from "react-query";
import { Card, Container, Divider, Flex, Image, Spoiler, Text } from "@mantine/core";
import RatingIcon from "../../components/My Listing/ListingIcon";
import { Carousel } from "@mantine/carousel";
import {MdBathtub, MdBedroomParent} from "react-icons/md";
import {MdOutlinePeopleAlt} from "react-icons/md"
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
import {FaKitchenSet} from "react-icons/fa6"
import Autoplay from 'embla-carousel-autoplay';

export default function HouseDetailPage() {
  const { id } = useParams();
  const getHouseById = async () => {
    try {
      const response = await axios.get(GETMYHOUSEBYID + `${id}`, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const getHouseImages = async () => {
    try {
      const response = await axios.get(GETIMAGESHOUSE + `${id}`, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const facilityIcons = {
    Swimming:()=>( <SwimmingIcon height={36} width={36}/>),
    Wifi: () => <WifiIcon  height={36} width={36}/>,
    Washer: () => <Washer  height={36} width={36}/>,
    Pets: () => <Pets  height={36} width={36}/>,
    Hot_Water: () => <HotWater  height={36} width={36}/>,
    Balcony: () => <Balcony  height={36} width={36}/>,
    Parking: () => <Parking  height={36} width={36}/>,
    Yard: () => <Yard height={36} width={36}/>,
    Microwave: () => <Microwave  height={36} width={36}/>,
  }

  const {
    data: houseData,
    isLoading: isHouseLoading,
    isError: isHouseError,
    isFetching: isFetchingHouse,
  } = useQuery(["getHouseById"], getHouseById);
  const {
    data: imageData,
    isLoading: isImageLoading,
    isError: isImageError,
    isFetching: isFetchingImage,
  } = useQuery(["getImagesHouse"], getHouseImages);
   console.log(houseData)
const autoplay = useRef(Autoplay({ delay: 2000 }));

  return (
    <div className=" mx-40 my-8">
      <Text className="text-2xl font-medium">{houseData?.data.title}</Text>
      <Flex justify={"space-between"} className="mt-1">
        <div className="flex gap-2">
          <AiFillStar size={20}/>
          <Text className="font-medium">4.8</Text>
          <Text className="font-medium underline"> 119 reviews</Text>
          <Text className="font-medium underline">
            {" "}
            {houseData?.data.address}
          </Text>
        </div>

        <div className="font-medium">
          {" "}
          <span className="font-medium pr-2">Nrs</span>
          {houseData?.data.price}
        </div>
      </Flex>
      <div className="flex gap-28 h-[520px] ">
        {isFetchingImage ? (
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
            plugins={[autoplay.current]}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}
          >
            {imageData?.data.map((img: any) => (
              <Carousel.Slide>
                <img src={img.image} className="object-contain rounded-md"  />
              </Carousel.Slide>
            ))}
          </Carousel>
        )}

        <div className=" flex flex-col gap-4 flex-grow max-w-[25%]">
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            className="mt-3"
          >
           <MdBathtub size={34}/>
            <Flex className="gap-2 mb-1 ">
              <Text className="text-xl translate-y-[-1px]">
                BathRoom
              </Text>
              <Text className="text-lg font-semibold ">
                {houseData?.data.bathRoom}
              </Text>
            </Flex>
          </Card>
          <Card shadow="sm" padding="lg" radius="md" withBorder className="">
            <MdOutlinePeopleAlt size={34}/>
            <Flex className="gap-2  mb-1">
              <Text className="text-xl  translate-y-[-1px]">
                Occupancy
              </Text>
              <Text className="text-lg font-semibold ">
                {houseData?.data.occupancy}
              </Text>
            </Flex>
          </Card>
          <Card shadow="sm" padding="lg" radius="md" withBorder className="">
          <MdBedroomParent size={34} />

            <Flex className="gap-2  mb-1">
              <Text className="text-xl   translate-y-[-1px]">
                Bed Room
              </Text>
              <Text className="text-lg font-semibold">
                {houseData?.data.bedRoom}
              </Text>
            </Flex>
          </Card>
          <Card shadow="sm" padding="lg" radius="md" withBorder className="">
          <FaKitchenSet size={34} />

            <Flex className="gap-2  mb-1">
              <Text className="text-xl  translate-y-[-1px]">
                Kitchen
              </Text>
              <Text className="text-lg font-semibold">
                {houseData?.data.kitchen}
              </Text>
            </Flex>
          </Card>
        </div>
      </div>
      <div className="mt-16 w-[68%]">
        <h1 className="text-lg font-medium">About House</h1>

        <Text className="">{houseData?.data.description}</Text>
        <Divider my="sm" />

        <Text fw={600}>Dining Room</Text>
        <Text fw={300}>{houseData?.data.diningRoom}</Text>

        <Divider my="sm" />
        <Text fw={600}>Living Room</Text>
        <Text fw={300}>{houseData?.data.livingRoom}</Text>

        <Divider my="sm" />
        <Text fw={600}>Hall</Text>

        <Text fw={300}>{houseData?.data.hall}</Text>
        <Divider my="sm" />

        <Text fw={600}>Area</Text>
        <Text fw={300}>{houseData?.data.area}</Text>

        <Divider my="sm" />
        <Text fw={600}>Year Built In</Text>
        <Text fw={300}>{houseData?.data.yearBuilt}</Text>

        <Divider my="sm" />
        <Text fw={600}>Facilities</Text>
        <div >
        <Spoiler maxHeight={46} showLabel="Show more" hideLabel="Hide" transitionDuration={500} styles={{
     
    }}>

      {houseData?.data.facilitiesArray.map((item, index) => {
        const facilityArray = item.split(',');
        return (
          <div key={index}>
            {facilityArray.map((facilityItem, innerIndex) => {
              const iconComponent = facilityIcons[facilityItem.trim()];
              return (

                <div key={innerIndex} className="flex gap-3 py-1">
                  
                   {/* Render the icon component if it exists */}
                  
                  {iconComponent && iconComponent()}
                    
                  <p className="my-auto font-medium">{facilityItem}</p> {/* Render the facilityArray element */}
                </div>
              );
            })}
          </div>
        );
      })}
      </Spoiler>
    </div>
      
        <Divider my="sm" />
        <Text fw={600}>TYPE</Text>
        <Text fw={300}>{houseData?.data.type}</Text>

        <Divider my="sm" className="mb-20" />
      </div>
      
    </div>
  );
}
