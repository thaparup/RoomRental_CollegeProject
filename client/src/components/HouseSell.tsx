import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { GETALLHOUSE, GETALLROOM, GETSINGLEIMAGEFORHOUSE, GETSINGLEIMAGEFORROOM } from "../utils/ApiRoutes";
import ViewCard from "./ViewCard";
import { Text } from "@mantine/core";
import { Carousel } from "@mantine/carousel";

export default function HouseSell({ houseSell }) {

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
  const { data: imageData } = useQuery(["getSingleImageRoom"], getSingleImage);


  return (
    <div>
      <h4 className="text-2xl pb-2"> House For Sell</h4>
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
        {houseSell?.map((house: any) => {
          return (
            <Carousel.Slide>
              <ViewCard
                title={house.title}
                description={house.description}
                img={(imageData?.data.find(image => image.houseId === house.id)?.image)}
                id={house.id}
                address={house.address}
                moredetail={`${house.id}`}
                isBooked={house.booked}
              />
            </Carousel.Slide>

          )
        })}
      </Carousel>
    </div>
  );
}
