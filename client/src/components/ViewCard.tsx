import { Card, Image, Text, Button, Spoiler } from "@mantine/core";
import RatingIcon from "./ListingIcon";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { AiFillStar } from "react-icons/ai";

interface ViewCardProps {
  img: string;
  address: string;
  title: string;
  description: string;
  moredetail: string;
  id: number;
  isBooked: boolean;
}

export default function ViewCard(props: ViewCardProps) {
  const handleClick = () => {
    const url = `/view/room/${props.id}`;
    window.open(url, "_blank");
  };
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className="min-w-[340px] max-w-[30%] card relative cursor-pointer"
      onClick={handleClick}
    >
      <Card.Section>
        <Image src={props.img} height={250} alt="Norway" />
      </Card.Section>

      <div className="flex justify-between mt-1">
        <Spoiler maxHeight={24} className="h-[26px]  translate-y-[-0px]">
          <p className="underline max-w-[270px]">{props.address}</p>
        </Spoiler>

        <div className=" flex justify-between gap-1">
          <AiFillStar size={18} />
          <Text>4.4</Text>
        </div>
      </div>
      {/* <p>{props.isBooked.toString()}</p> */}

      <Spoiler maxHeight={24} className="h-[26px]  translate-y-[-0px]">
        <Text size="sm" color="">
          {props.title}
        </Text>
      </Spoiler>
      <Spoiler
        maxHeight={24}
        className="translate-y-[0px]  h-[26px] max-h-[26px]"
      >
        <Text size="sm" color="dimmed">
          {props.description}
        </Text>
      </Spoiler>

      <div className="translate-y-[-6px]"></div>

      {props.isBooked && (
        <div className="ribbon ribbon-top-left">
          <span>Booked</span>
        </div>
      )}
    </Card>
  );
}
