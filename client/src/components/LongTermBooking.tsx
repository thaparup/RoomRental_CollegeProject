import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { GETALLROOM, GETSINGLEIMAGEFORROOM } from "../utils/ApiRoutes";
import ViewCard from "./ViewCard";
import { Text } from "@mantine/core";
import { Carousel } from "@mantine/carousel";

export default function LongTermBooking() {
  const getAllRoomLongTermBooking = async () => {
    try {
      const response = await axios.get(GETALLROOM, { withCredentials: true });

      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const { data: roomData } = useQuery(["getAllRoomLongTermBooking"], getAllRoomLongTermBooking);

  async function getImageRoomLongTermBooking() {
    try {
      const response = await axios.get(GETSINGLEIMAGEFORROOM, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  const { data: imageData } = useQuery(["getImageRoomLongTermBooking"], getImageRoomLongTermBooking);
  // console.log(imageData);

  return (
    <div>
      <h4 className="text-2xl pb-2"> Room Long Term Booking</h4>
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
            {roomData?.data.map((item) => {
              if (item.roomtype !== "LONG_TERM_BOOKING") {
                // Skip rendering if roomtype is not "SHORT_TERM_BOOKING"
                return null;
              }

              const imageUrl =
                imageData?.data.find(
                  (imageItem) => imageItem.roomId === item.id
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
