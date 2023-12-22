import React, { useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Button, Card, Divider, Flex, Group, Image, Spoiler, Text } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { MdBathtub, MdBedroomParent } from "react-icons/md";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import { FaKitchenSet } from "react-icons/fa6";
import Autoplay from "embla-carousel-autoplay";
import { BOOKHOUSE, GETHOUSEBYID, GETIMAGESHOUSE } from "../utils/ApiRoutes";
import SwimmingIcon from "../components/SwimmingIcon";
import WifiIcon from "../components/WifiIcon";
import Washer from "../components/Washer";
import Pets from "./Pets";
import HotWater from "../components/HotWater";
import Balcony from "../components/Balcony";
import Parking from "../components/Parking";
import Yard from "../components/Yard";
import Microwave from "../components/Microwave";
import { useForm } from "@mantine/form";

export default function GetHouseById() {
  const { id } = useParams();
  const getHouseById = async () => {
    try {
      const response = await axios.get(GETHOUSEBYID + `${id}`, {
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
  const autoplay = useRef(Autoplay({ delay: 2000 }));
 
  const [value, setValue] = React.useState<[Date | null, Date | null]>([null, null]);
 
  let startDate = value[0];
let endDate = value[1];
let result
if (startDate && endDate) {
  // Both startDate and endDate are not null, proceed with the calculation.
  const timeDifference = endDate.getTime() - startDate.getTime();
  const days = timeDifference / (1000 * 60 * 60 * 24);
   result = days;
} 
console.log(result)

const form = useForm({
  initialValues:{

  }
})

const bookHouse =  async() => {
     alert('hello')
  // try {
  //   await axios
  //     .patch(BOOKHOUSE + `${id}`, {
  //       withCredentials: true,
  //     })
  //     .then(() => alert("house booked"));
  // } catch (error) {
  //   console.log(error);
  // }
};   
  return (
    <div className=" mx-40 my-8">
      <Text className="text-2xl font-medium">
        {houseData?.data.house.title}
      </Text>
      <Flex justify={"space-between"} className="mt-1">
        <div className="flex gap-2">
          <AiFillStar size={20} />
          <Text className="font-medium">4.8</Text>
          <Text className="font-medium underline"> 119 reviews</Text>
          <Text className="font-medium underline">
            {" "}
            {houseData?.data.house.address}
          </Text>
        </div>

        <div className="font-medium">
          {" "}
          <span className="font-medium pr-2">Rs</span>
          {houseData?.data.house.price}
          <span className="font-light">/month</span>
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
                <img src={img.image} className="object-contain rounded-md" />
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
            <MdBathtub size={34} />
            <Flex className="gap-2 mb-1 ">
              <Text className="text-xl translate-y-[-1px]">BathRoom</Text>
              <Text className="text-lg font-semibold ">
                {houseData?.data.house.bathRoom}
              </Text>
            </Flex>
          </Card>
          <Card shadow="sm" padding="lg" radius="md" withBorder className="">
            <MdOutlinePeopleAlt size={34} />
            <Flex className="gap-2  mb-1">
              <Text className="text-xl  translate-y-[-1px]">Occupancy</Text>
              <Text className="text-lg font-semibold ">
                {houseData?.data.house.occupancy}
              </Text>
            </Flex>
          </Card>
          <Card shadow="sm" padding="lg" radius="md" withBorder className="">
            <MdBedroomParent size={34} />

            <Flex className="gap-2  mb-1">
              <Text className="text-xl   translate-y-[-1px]">Bed Room</Text>
              <Text className="text-lg font-semibold">
                {houseData?.data.house.bedRoom}
              </Text>
            </Flex>
          </Card>
          <Card shadow="sm" padding="lg" radius="md" withBorder className="">
            <FaKitchenSet size={34} />

            <Flex className="gap-2  mb-1">
              <Text className="text-xl  translate-y-[-1px]">Kitchen</Text>
              <Text className="text-lg font-semibold">
                {houseData?.data.house.kitchen}
              </Text>
            </Flex>
          </Card>
        </div>
      </div>
      <section className="flex gap-8">
      <div className="mt-2 w-[65%] flex-grow">
        <Flex justify={"space-between"} py={18}>
          <div>
            <h1 className="text-2xl font-medium">
              House Hosted By {houseData?.data.kyc.phoneNumber}
            </h1>
            <h2>Type {houseData?.data.house.type}</h2>
          </div>
          <Image
            src={houseData?.data.kyc.profileImage}
            height={60}
            width={60}
            radius="xl"
            className="self-center"
          />
        </Flex>
        <Divider my="sm" />

        <h1 className="text-lg font-medium">Description</h1>

        <Text className="">{houseData?.data.house.description}</Text>
        <Divider my="sm" />

        <Text fw={600}>Dining Room</Text>
        <Text fw={300}>{houseData?.data.house.diningRoom}</Text>

        <Divider my="sm" />
        <Text fw={600}>Living Room</Text>
        <Text fw={300}>{houseData?.data.house.livingRoom}</Text>

        <Divider my="sm" />
        <Text fw={600}>Hall</Text>

        <Text fw={300}>{houseData?.data.house.hall}</Text>
        <Divider my="sm" />

        <Text fw={600}>Area</Text>
        <Text fw={300}>{houseData?.data.house.area}</Text>

        <Divider my="sm" />
        <Text fw={600}>Year Built In</Text>
        <Text fw={300}>{houseData?.data.house.yearBuilt}</Text>

        <Divider my="sm" />
        <Text fw={600}>Facilities</Text>
        <div>
          <Spoiler
            maxHeight={46}
            showLabel="Show more"
            hideLabel="Hide"
            transitionDuration={500}
            styles={{}}
          >
            {houseData?.data.house.facilitiesArray.map((item, index) => {
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
        <Text fw={300}>{houseData?.data.house.type}</Text>

        <Divider my="sm" className="mb-20" />

      </div>
        <Card  className="ml-24 rounded-md shadow-md h-[20%] mt-6">
          <Text fz="lg" fw={600} pb={20} pt={4}>Booking</Text>
      {/* <DatePicker type="range" value={value} onChange={setValue}  /> */}
            
       <Button className="bg-primary w-full my-4" onClick={async()=> {
         try {
    await axios
      .patch(BOOKHOUSE + `${id}`, {success: false},{
        withCredentials: true,
      })
      .then(() => alert("house booked"));
  } catch (error) {
    console.log(error);
  }
       }}>Reserve</Button>
       <Flex justify={"space-between"}>
       <Text underline py={4}>Rs {Math.floor(houseData?.data.house.price/30)} × {result} </Text>
        <Text> Rs {Math.floor(houseData?.data.house.price/30) * result}</Text>
       </Flex>
       <Flex justify={"space-between"}>
       <Text underline py={4}>Service Fee </Text>
        <Text> Rs { 10 * Math.floor(houseData?.data.house.price/30 *result) / 100}</Text>
       </Flex>
       <Divider my={14}/>
         <Flex justify={"space-between"}>
       <Text fw={500}>Total</Text>
       <Text fw={500}>{Math.floor(houseData?.data.house.price/30) * result + 10 * Math.floor(houseData?.data.house.price/30 *result) / 100} </Text>
         </Flex>
     </Card>
      </section>
      
    
    </div>
  );
}
