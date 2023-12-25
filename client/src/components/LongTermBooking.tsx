import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { GETALLROOM, GETSINGLEIMAGEFORROOM } from "../utils/ApiRoutes";
import ViewCard from "./ViewCard";
import { Text } from "@mantine/core";
import { Carousel } from "@mantine/carousel";

export default function LongTermBooking({ roomRent }) {


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


  return (
    <div>
      <h4 className="text-2xl pb-2"> Room Long Term Booking</h4>
      <Carousel
        withIndicators
        height={400}
        slideSize="30%"
        // loop
        align="start"
        slidesToScroll={3}
        slideGap="xl"
        controlSize={18}
      >
        {roomRent?.map((room) => (

          <Carousel.Slide key={room.id}>
            <ViewCard
              title={room.title}
              description={room.description}
              img={(imageData?.data.find((image) => image.roomId === room.id)?.image)}
              id={room.id}
              address={room.address}
              moredetail={`${room.id}`}
              isBooked={room.booked}
            />
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
}
