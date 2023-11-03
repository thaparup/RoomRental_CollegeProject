import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { GETALLHOUSE, GETALLROOM, GETSINGLEIMAGEFORHOUSE, GETSINGLEIMAGEFORROOM } from "../utils/ApiRoutes";
import ViewCard from "./ViewCard";
import { Text } from "@mantine/core";
import { Carousel } from "@mantine/carousel";

export default function HouseSell() {
  const getAllRoomHouseSell= async () => {
    try {
      const response = await axios.get(GETALLHOUSE, { withCredentials: true });

      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const { data: houseData } = useQuery(["getAllRoomHouseSell"], getAllRoomHouseSell);

  async function getImageHouseSell() {
    try {
      const response = await axios.get(GETSINGLEIMAGEFORHOUSE, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  const { data: imageData } = useQuery(["getImageHouseSell"], getImageHouseSell);
  console.log(imageData);

  return (
    <div>
      <h4 className="text-2xl pb-2"> House For Sell</h4>
      <div className="">
        {houseData?.data.length === 0 ? (
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
            {houseData?.data.map((item) => {
              if (item.type !== "SELL") {
                // Skip rendering if "
                return null;
              }

              const imageUrl =
                imageData?.data.find(
                  (imageItem) => imageItem.houseId === item.id
                )?.image || "";

              return (
                <Carousel.Slide key={item.id} gap={20} className="">
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
