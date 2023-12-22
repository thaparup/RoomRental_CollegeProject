import axios from 'axios';
import React from 'react'
import { useQuery, useQueryClient } from 'react-query';
import { DELETEHOUSE, GETMYHOUSE, GETSINGLEIMAGEFORHOUSE } from '../../utils/ApiRoutes';
import ListingCard from '../../components/My Listing/ListingCard';
import { Text,Flex, Button, rem } from '@mantine/core';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { AiOutlinePlus } from 'react-icons/ai';
import { modals } from "@mantine/modals";

export default function House() {
  const queryClient = useQueryClient();
  
  async function getMyHouse() {
    let response = await axios.get(GETMYHOUSE , {
      withCredentials: true,
    });
    return response;
  }
  async function getImageHouse() {
    let response = await axios.get(GETSINGLEIMAGEFORHOUSE , {
      withCredentials: true,
    });
    return response;
  }

  const { data: houseData, isLoading: isHouseLoading, isError: isHouseError , refetch: refetchHouseData } = useQuery(['getHouse'], getMyHouse);

  // Second fetch query
  const { data: imageData, isLoading: isImageLoading, isError: isImageError } = useQuery(['getImageHouse'], getImageHouse);
  console.log(houseData)
 

 
  const handleDeleteHouse = async (id: any) => {
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
      onConfirm: async() => {
        try {
          const response = await axios.delete(DELETEHOUSE + `${id}`, {
            withCredentials: true,
          });
          if ((response.status = 200 || 204)) {
            toast.success("House Deleted !");
            refetchHouseData();
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

  // const handleDeleteItem = async( id: any)=>{
  //   console.log(id)
  //   try{

  //     const response = await axios.delete(DELETEHOUSE + `${id}`, {withCredentials: true})
  //     if(response.status = 200){
  //       toast.success("House Deleted")
  //       refetchHouseData()

  //     }
  //     else{
  //       console.log('not deleted')
  //     }
  //   }
  //   catch(error){
  //     console.log(error)
  //   }

  // }
  
  return (
    <div className='mx-40  max-w-full pb-8 '>
        <Flex justify={"space-between"} className="py-3">
        <h1 className="text-2xl font-medium my-4">Listed House</h1>
        <Link to={'/listing/house/new'}>
        <Button
          component="a"
      
          rel="noopener noreferrer"
         
          className="bg-primary self-center mr-20"
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
          < AiOutlinePlus size={20}/>
            
            <Text className="font-medium">Add House</Text>
          </Flex>
        </Button>
        </Link>

      </Flex>

      {houseData?.data.length ===0  ? (
        <p className="text-xl font-medium">You don't have any house</p>
      ) : (
        <div className="flex flex-wrap gap-6 mt-10">
           {houseData?.data.map((item: any) => {
          const imageUrl =
            imageData?.data.find(
              (imageItem: any) => imageItem.houseId === item.id
            )?.image || "";

          return (
            <ListingCard
              key={item.id}
              title={item.title}
              description={item.description}
              img={imageUrl}
              moredetail= {`/listing/house/${item.id}`}
              editproperty={`/listing/house/edit/${item.id}`}
              // handleClick={handleDeleteRoom(`${item.id}`)}
              // deleteItem ={handleDeleteRoom(item.id)}    
              id={item.id}
              handleDeleteItem={handleDeleteHouse}
              address={item.address}
              isBooked={item.booked}
            />
          );
        })}
        </div>
      )}
      <ToastContainer autoClose={2000}/>
    </div>
  )
}
