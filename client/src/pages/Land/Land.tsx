import React, { useEffect, useState } from "react";
import ListingCard from "../../components/My Listing/ListingCard";
import { FetchQuery } from "../../utils/ApiCall";
import { DELETELAND, GETMYLAND, GETSINGLEIMAGEFORLAND } from "../../utils/ApiRoutes";
import axios from "axios";
import { error } from "console";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Button,Flex,Text, rem } from "@mantine/core";
import { ToastContainer, toast } from "react-toastify";

export default function Land() {

    
  async function getMyLand() {
    let response = await axios.get(GETMYLAND, {
      withCredentials: true,
    });
    return response;
  }
  const { data, error,isLoading, isFetching, refetch } = useQuery(["getLand"], getMyLand);
  
 

  async function getImage() {
    try {
      const response = await axios.get(GETSINGLEIMAGEFORLAND, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  const query = useQuery(["getImage"], getImage);
  

  const deleteLand = async(id: any)=>{
     console.log(id)
    try{
      await axios.delete(DELETELAND + `${id}`, {withCredentials: true});
    }
    catch(error){
      console.log(error)
    }
  }

    const delLand = useMutation(deleteLand,{
      onSuccess(data, variables, context) {
        toast.success('Land Deleted')
          refetch()
      },
    })
    const handleDelete = (id: any)=>{
      delLand.mutate(id)
    }

  return (
    <div className="mx-40  max-w-full pb-8 ">
     

      
      <Flex justify={"space-between"} className="py-3">
        <h1 className="text-2xl font-medium my-4">Listed Room</h1>
        <Button
          component="a"
          target=""
          rel="noopener noreferrer"
          href="/listing/land/new"
          className="bg-[#00acee] self-center mr-20"
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-plus"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M12 5l0 14"></path>
              <path d="M5 12l14 0"></path>
            </svg>
            <Text className="font-medium">Add Land</Text>
          </Flex>
        </Button>
      </Flex>

        {data?.data.length>0?     <div className="flex flex-wrap gap-6">
        {data?.data.map((item: any) => {
          const imageUrl =
            query.data?.data.find(
              (imageItem: any) => imageItem.landId === item.id
            )?.image || "";

          return (
            
            
            <ListingCard
              key={item.id}
              title={item.title}
              description={item.description}
              img={imageUrl}
              moredetail= {`${item.id}`}
              editproperty={`/listing/land/edit/${item.id}`}
              handleDeleteItem = {handleDelete}
              id={item.id}
            />
          );
        })}
      </div>:<div className="text-xl font-medium">You don't any room </div>}
 
      <ToastContainer autoClose={3000}/>
    </div>
  );
}
