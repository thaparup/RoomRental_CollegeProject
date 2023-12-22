import {
  NumberInput,
  Textarea,
  Flex,
  TextInput,
  Select,
  FileInput,
  Button,
  Group,
  FileInputProps,
  rem,
  Center,
  Text,
  Divider,
  Image,
} from "@mantine/core";
import axios from "axios";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useForm } from "@mantine/form";
import { IconPhoto } from "@tabler/icons-react";
import {
  ADDHOUSE,
  CREATEIMAGESLAND,
  DELETEIMAGELAND,
  GETIMAGESLAND,
  GETMYLANDBYID,
  UPDATELAND,
} from "../../utils/ApiRoutes";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";

export default function () {
  
  
  const { id } = useParams();



 

  const getLand = async () => {
    try {
      const response = await axios.get(GETMYLANDBYID + `${id}`, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const getImage = async () => {
    try {
      const response = await axios.get(GETIMAGESLAND + `${id}`, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const {
    data: landData,
    isFetching: isFetchingLand,
    isLoading: isLoadingLand,
    isError: isErrorLand,
    refetch: refetchLand
  } = useQuery(["landData"], getLand);
  const {
    data: imageData,
    isFetching: isFetchingImage,
    isError: isErrorImage,
    refetch: refetchImage,
  } = useQuery(["getImages"], getImage);
  

  const handleImageDelete = async (id: any) => {
    await axios
      .delete(DELETEIMAGELAND + `${id}`, { withCredentials: true })
      .then(() => {
        toast.success("images deleted", { autoClose: 1000 });
        refetchImage();
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };
  


  
  const form = useForm({
    initialValues: {
      title: landData?.data.title || "",
      address: landData?.data.address || "",
      cost: landData?.data.address || "",
      area: landData?.data.area || "",
      description: landData?.data.description || "",
      type: landData?.data.type || "",
      files: [],
      facedOn: landData?.data.facedOn || "",
      distanceFromRoad: landData?.data.distanceFromRoad || "",
      nameOfRoad: landData?.data.nameOfRoad || "",
    },
  });

  function Value({ file }: { file: File }) {
    return (
      <Center
        inline
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[7]
              : theme.colors.gray[1],
          fontSize: theme.fontSizes.xs,
          padding: `${rem(3)} ${rem(7)}`,
          borderRadius: theme.radius.sm,
        })}
      >
        <IconPhoto size={rem(14)} style={{ marginRight: rem(5) }} />
        <span
          style={{
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
            maxWidth: rem(200),
            display: "inline-block",
          }}
        >
          {file.name}
        </span>
      </Center>
    );
  }

  const ValueComponent: FileInputProps["valueComponent"] = ({ value }) => {
    if (Array.isArray(value)) {
      return (
        <Group spacing="sm" py="xs">
          {value.map((file, index) => (
            <Value file={file} key={index} />
          ))}
        </Group>
      );
    }

    return <Value file={value} />;
  };
  
  
  const updateLand = async (values: any) => {
    try {
        await axios.patch(UPDATELAND + `${id}`, values,{withCredentials: true}).then(()=>{
          formSubmitted()
          refetchLand()
        })
      
    } catch (error) {
      console.error('Error:', error);
    }
  }
  const patchRequest = useMutation(updateLand,{ onMutate:()=>{
  }}) 

const createImage = async (values: any, ) => {
  try {
    const formData = new FormData();

    values.files.forEach((file: any) => {
      formData.append("files", file);
    });

    await axios.post(CREATEIMAGESLAND + `${id}`, formData, {
      withCredentials: true,
    }).then(()=>{
      toast.success('Images added')
    })
    
  } catch (error) {
    console.log(error);
    toast.warn("problem while sending the request");
  }
};
const postRequest = useMutation(createImage,{onMutate:()=>{
  formSubmitting()
}})
    
const submitHandler = async (values: any, id: any) => {
  try {
    // 
       await patchRequest.mutate(values)

      await postRequest.mutate(values)
     
  } catch (error) {
    // Handle error
    console.error("Error:", error);
  }
}; 

  return (
    <div className="mx-96 py-10">
      <form
        onSubmit={form.onSubmit((values, id) => {
          submitHandler(values, id);
        })}
      >
        <TextInput
          label="Title"
          name="title"
          {...form.getInputProps("title")}
          key="title"
        />
        <TextInput
          label="address"
          name="address"
          {...form.getInputProps("address")}
          key="address"
          mt={6}
        />
        <TextInput
          label="Name of Road"
          name="nameOfRoad"
          {...form.getInputProps("nameOfRoad")}
          key="nameOfRoad"
          mt={6}
        />
        <Flex justify={"space-between"} mt={8}>
          <Select
            label="Type"
            placeholder="Pick one"
            name="type"
            className="max-w-[20%]"
            data={[
              { value: "RENT", label: "Rent" },
              { value: "SELL", label: "Sell" },
            ]}
            {...form.getInputProps("type")}
            key="type"
          />
          <Select
            label="Faced On Direction"
            placeholder="Pick one"
            name="facedOn"
            className="max-w-[20%]"
            data={[
              { value: "North", label: "North" },
              { value: "South", label: "South" },
              { value: "East", label: "East" },
              { value: "West", label: "West" },
              { value: "SouthEast", label: "SouthEast" },
              { value: "SouthWest", label: "SouthWest" },
              { value: "NorthWest", label: "NorthWest" },
              { value: "NorthEast", label: "North East" },
            ]}
            {...form.getInputProps("facedOn")}
            key="facedOn"
          />

          <TextInput
            defaultValue={0}
            placeholder="Total price"
            label="Price"
            name="cost"
            {...form.getInputProps("cost")}
            //       value={cost} // Set the value as a string
            // onChange={handleCostChange}
            key="cost"
          />
        </Flex>

        <Textarea
          placeholder="Describe your land"
          label="Description"
          autosize
          minRows={4}
          maxRows={8}
          mt={8}
          name="description"
          {...form.getInputProps("description")}
          key="description"
        />

        <Flex justify={"space-between"} mt={8}>
          <TextInput
            label="Area"
            placeholder="12 by 12 feet"
            {...form.getInputProps("area")}
            name="area"
            key="area"
          />

          <TextInput
            label="Distance From Road"
            placeholder="few km"
            {...form.getInputProps("distanceFromRoad")}
            name="distanceFromRoad"
            key="distanceFromRoad"
          />
        </Flex>

        <div>
          <Divider mt={18} />
          <div className="flex flex-wrap  gap-8 mt-4">
          {isFetchingImage ? (
            <div className="text-xl font-medium">Fetching Image...</div>
          ) : (
            imageData?.data.map((item) => {
              return (
                <div>
                  <Image
                    src={item.image}
                    height={220}
                    width={220}
                    radius="md"
                    className=""
                  />
                  <button
                    onClick={() => {
                      handleImageDelete(item.id);
                    }}
                  >
        
                    <div className="bg-[#e70000] py-1 px-2 rounded-md mt-1">
                      <AiOutlineDelete size={26} className="text-white " />
                    </div>
                  </button>
                </div>
              );
            })
          )}
        </div>
        <Text fz={15} fw={400}>
              Upload Image
            </Text>
        <FileInput
          label="Select Images"
          placeholder="Select Images"
          className="pt-3"
          multiple
          name="files"
          valueComponent={ValueComponent}
          {...form.getInputProps("files")}
          key="files"
          disabled={imageData?.data.length >= 6}
        />
       
          <div>
            <Button type="submit" className="bg-red-400" mt={8}>
              Subit form
            </Button>
          </div>
        </div>
      </form>
      
   
      <ToastContainer />
    </div>
  );
}
