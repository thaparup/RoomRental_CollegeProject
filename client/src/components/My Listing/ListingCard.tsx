import { Card, Image, Text, Button, Group, Flex, Spoiler } from "@mantine/core";
import RatingIcon from "./ListingIcon";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { modals } from "@mantine/modals";

export default function ListingCard(props: any) {
  const openDeleteModal = (id) => {
  
    modals.openConfirmModal({
      title: 'Delete your profile',
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete your profile? This action is destructive and you will have
          to contact support to restore your data.
        </Text>
      ),
      labels: { confirm: 'Delete account', cancel: "No don't delete it" },
      
      confirmProps: { 
      style: {
        backgroundColor: 'red', 
        
      },
    },
      onCancel: () => console.log('Confirmed with id:', id),
      onConfirm: () => console.log('Confirmed'),
    }
    );
  }
    
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className="min-w-[30%] max-w-[30%] hover:shadow-card relative "
    >
      <Card.Section>
        <Image src={props.img} height={250} alt="Norway" />
      </Card.Section>

      {/* <div mt="md" mb="xs" className="bg-red-200 flex justify-around">
        <Text weight={500}>{props.address}</Text>
        <div className="gap-1">
          <RatingIcon />
          <Text>4.4</Text>
        </div>
      </div> */}
      <div className="flex justify-between mt-1">
        <Spoiler maxHeight={24} className="h-[26px]  translate-y-[-0px]">
          <p className="underline bg-red-100 max-w-[270px]">{props.address}</p>
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

      <div className="translate-y-[-6px]">
        <Link to={props.moredetail}>
          <Button
            variant="light"
            color="blue"
            fullWidth
            mt="md"
            radius="md"
            className="bg-blue-100"
          >
            More Detail !
          </Button>
        </Link>
        <Link to={props.editproperty}>
          <Button
            variant="light"
            color="green"
            fullWidth
            mt="md"
            radius="md"
            className="bg-green-100"
          >
            Edit Property
          </Button>
        </Link>
        <Link to="">
          <Button
            variant="light"
            color="green"
            fullWidth
            mt="md"
            radius="md"
            className="bg-red-100 hover:bg-red-200"
            // onClick={() => props.handleDeleteItem(props.id)}
            // onClick={() => openDeleteModal(props.id)}
            onClick={() => props.handleDeleteItem(props.id)}
            
          >
            <p className="text-red-400">Delete Property</p>
          </Button>
        </Link>
      </div>

      {props.isBooked && (
        <div className="ribbon ribbon-top-left">
          <span>sold</span>
        </div>
      )}
    </Card>
  );
}
