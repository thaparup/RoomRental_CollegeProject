import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { GETALLROOM, GETSINGLEIMAGEFORROOM } from "../utils/ApiRoutes";
import ViewCard from "./ViewCard";
import { Text } from "@mantine/core";
import { Carousel } from "@mantine/carousel";

export default function AllRoomCard() {
   
  const getAllRoom = async () => {
    try {
      const response = await axios.get(GETALLROOM, { withCredentials: true });

      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const { data: roomData } = useQuery(["getRoom"], getAllRoom);
 

  async function getImage() {
    try {
      const response = await axios.get(GETSINGLEIMAGEFORROOM, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  const { data: imageData } = useQuery(["getImageRoom"], getImage);
  console.log(imageData)
  
  return (
    <div>
        <h4 className="text-2xl pb-2">Available Rooms</h4>
      <div className="">
        {roomData?.data.length === 0 ? (
          <p className="text-xl font-medium">You don't have any room</p>
        ) : (
          
          <Carousel
            withIndicators
            height={400}
            slideSize="30%"
            slideGap=""
            // loop
            align="start"
            slidesToScroll={3}
            
          >
            
            {roomData?.data.map((item: any) => {
              const imageUrl =
                imageData?.data.find(
                  (imageItem: any) => imageItem.roomId === item.id
                )?.image || "";

              return (
                <Carousel.Slide key={item.id}  gap={20} className="">
                  <ViewCard
                    title={item.title}
                    description={item.description}
                    img={imageUrl}
                    id={item.id}
                    address={item.address}
                    moredetail={`${item.id}`}
                    isBooked={item.booked}
                  />
                </Carousel.Slide>
              );
            })}
          </Carousel>
        )}
      </div>
    </div>
  );
}
