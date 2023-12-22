import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

import ViewCard from "./ViewCard";
import { Text } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { GETALLHOUSE, GETSINGLEIMAGEFORHOUSE } from "../utils/ApiRoutes";

export default function HouseRent({ houseRent }) {



  async function getSingleImage() {
    try {
      const response = await axios.get(GETSINGLEIMAGEFORHOUSE, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }


  const { data: imageData } = useQuery(["getSingleImageHouse"], getSingleImage);


  return (
    <div>
      <h4 className="text-2xl pb-2">House For Rent</h4>
      <Carousel
        withIndicators
        height={400}
        slideSize="30%"
        slideGap="xl"
        controlSize={18}
        // loop
        align="start"
        slidesToScroll={3}
      >
        {houseRent?.map((house) => (
          <Carousel.Slide key={house.id}>{imageData?.data.map((image) => {
            if (image.houseId === house.id) return (
              <ViewCard
                title={house.title}
                description={house.description}
                img={image.image}
                id={house.id}
                address={house.address}
                moredetail={`${house.id}`}
                isBooked={house.booked}
              />
            )
          })}</Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
}
