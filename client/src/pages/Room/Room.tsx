import React, { useState } from "react";
import ListingCard from "../../components/My Listing/ListingCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button, Flex, Text, rem } from "@mantine/core";
import { useParams } from "react-router-dom";
import {
  DELETEROOM,
  GETMYROOM,
  GETSINGLEIMAGEFORROOM,
} from "../../utils/ApiRoutes";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlinePlus } from "react-icons/ai";
import { modals } from "@mantine/modals";
export default function Room() {
  async function getMyRoom() {
    let response = await axios.get(GETMYROOM, {
      headers: {
        // Cookie: myTok
      },
      withCredentials: true,
    });
    return response;
  }
  const { data: roomData, refetch: refetchRoom } = useQuery(
    ["getRoom"],
    getMyRoom
  );








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

  const handleDeleteRoom = async (id: any) => {
    modals.openConfirmModal({
      title: 'Delete your profile',
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete your property? This action is destructive and you will have
          to contact support to restore your data.
        </Text>
      ),
      labels: { confirm: 'Delete account', cancel: "No don't delete it" },

      confirmProps: {
        style: {
          backgroundColor: 'red',

        },
      },
      onCancel: () => {
        toast.success("Room Not Deleted")
      },
      onConfirm: async () => {
        try {
          const response = await axios.delete(DELETEROOM + `${id}`, {
            withCredentials: true,
          });
          if ((response.status = 200 || 204)) {
            toast.success("Room Deleted !");
            refetchRoom();
          } else {
            console.log("not deleted");
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    );

  };

  return (
    <div className="mx-40  max-w-full pb-8 ">
      <Flex justify={"space-between"} className="py-3">
        <h1 className="text-2xl font-medium my-4">Listed Room</h1>
        <Button
          component="a"
          rel="noopener noreferrer"
          href="/listing/room/new"
          className="bg-primary   39 self-center mr-10"
          styles={(theme) => ({
            root: {
              border: 0,
              height: rem(42),
              paddingLeft: rem(20),
              paddingRight: rem(20),
              "&:not([data-disabled])": theme.fn.hover({
                backgroundColor: theme.fn.darken("#00acee", 0.05),
              }),
            },

            leftIcon: {
              marginRight: theme.spacing.md,
            },
          })}
        >
          <Flex gap={6}>
            <AiOutlinePlus size={20} />
            <Text className="font-medium">Add Room</Text>
          </Flex>
        </Button>
      </Flex>

      {roomData?.data.length === 0 ? (
        <p className="text-xl font-medium">You don't have any room</p>
      ) : (
        <div className="flex flex-wrap gap-6 mt-10">
          {roomData?.data.map((item: any) => {
            const imageUrl =
              imageData?.data.find(
                (imageItem: any) => imageItem.roomId === item.id
              )?.image || "";

            return (
              <ListingCard
                key={item.id}
                title={item.title}
                description={item.description}
                img={imageUrl}
                moredetail={`${item.id}`}
                id={item.id}
                editproperty={`/listing/room/edit/${item.id}`}
                handleDeleteItem={handleDeleteRoom}
                // onDelete={handleDeleteRoom}
                address={item.address}
              />
            );
          })}
        </div>
      )}

      <ToastContainer
        autoClose={2000}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
