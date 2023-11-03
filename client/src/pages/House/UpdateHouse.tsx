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
  Image,
  MultiSelectValueProps,
  Box,
  CloseButton,
  SelectItemProps,
  MultiSelect,
} from "@mantine/core";
import axios from "axios";
import React, { useState, useRef } from "react";
import { useMutation, useQueries, useQuery, useQueryClient } from "react-query";
import { useForm } from "@mantine/form";
import { IconPhoto } from "@tabler/icons-react";
import {
  ADDHOUSE,
  CREATEIMAGESHOUSE,
  DELETEIMAGEHOUSE,
  GETHOUSEBYID,
  GETIMAGESHOUSE,
  GETSINGLEIMAGEFORHOUSE,
  UPDATEHOUSE,
} from "../../utils/ApiRoutes";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import SwimmingIcon from "../../components/SwimmingIcon";
import WifiIcon from "../../components/WifiIcon";
import Washer from "../../components/Washer";
import Pets from "../Pets";
import HotWater from "../../components/HotWater";
import Balcony from "../../components/Balcony";
import Parking from "../../components/Parking";
import Yard from "../../components/Yard";
import Microwave from "../../components/Microwave";
import { forwardRef } from "react";

export default function UpdateHouse() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const toastId = useRef(null);
  const updatingForm = () =>
    (toastId.current = toast.success("Updating house...", {
      type: toast.TYPE.SUCCESS,
      autoClose: false,
    }));

  const updatedForm = () =>
    toast.update(toastId.current, {
      render: () => <div>House Updated!</div>,
      type: toast.TYPE.SUCCESS,
      autoClose: 2000,
    });

  const data = [
    { value: "Swimming", label: "Swimming Pool" },
    { value: "Wifi", label: "Wifi" },
    { value: "Washer", label: "Washer" },
    { value: "Pets", label: "Pets" },
    { value: "Hot_Water", label: "Hot Water" },
    { value: "Balcony", label: "Balcony" },
    { value: "Parking", label: "Parking" },
    { value: "Yard", label: "Yard" },
    { value: "Microwave", label: "Microwave" },
  ];
  const faciilityIcons = {
    Swimming: () => <SwimmingIcon height={24} width={24} />,
    Wifi: () => <WifiIcon height={24} width={24} />,
    Washer: () => <Washer height={24} width={24} />,
    Pets: () => <Pets height={24} width={24} />,
    Hot_Water: () => <HotWater height={24} width={24} />,
    Balcony: () => <Balcony height={24} width={24} />,
    Parking: () => <Parking height={24} width={24} />,
    Yard: () => <Yard height={24} width={24} />,
    Microwave: () => <Microwave height={24} width={24} />,
  };
  function OriginalValue({
    value,
    label,
    onRemove,
    classNames,
    ...others
  }: MultiSelectValueProps & { value: string }) {
    const Facility = faciilityIcons[value];
    return (
      <div {...others}>
        <Box
          sx={(theme) => ({
            display: "flex",
            cursor: "default",
            alignItems: "center",
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
            border: `${rem(1)} solid ${
              theme.colorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors.gray[4]
            }`,
            paddingLeft: theme.spacing.xs,
            borderRadius: theme.radius.sm,
          })}
        >
          <Box mr={10}>
            <Facility />
          </Box>
          <Box sx={{ lineHeight: 1, fontSize: rem(12) }}>{label}</Box>
          <CloseButton
            onMouseDown={onRemove}
            variant="transparent"
            size={22}
            iconSize={14}
            tabIndex={-1}
          />
        </Box>
      </div>
    );
  }

  const Item = forwardRef<HTMLDivElement, SelectItemProps>(
    ({ label, value, ...others }, ref) => {
      const Facility = faciilityIcons[value];
      return (
        <div ref={ref} {...others}>
          <Flex align="center">
            <Box mr={10}>
              <Facility />
            </Box>
            <div>{label}</div>
          </Flex>
        </div>
      );
    }
  );
  const {
    data: houseData,
    isLoading: isLoadingHouse,
    isError: IsErrorHouse,
  } = useQuery(["getHouseById"], async () => {
    try {
      const response = await axios.get(GETHOUSEBYID + `${id}`, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  });

  const {
    data: imageData,
    isLoading: isLoadingImage,
    isError: isErrorImage,
    isFetching: isFetchingImage,
    refetch: refetchImageData,
  } = useQuery(["getImageById"], async () => {
    try {
      const response = await axios.get(GETIMAGESHOUSE + `${id}`, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  });
  console.log(imageData);
  const handleImageDelete = (id: any) => {
    axios
      .delete(DELETEIMAGEHOUSE + `${id}`, { withCredentials: true })
      .then(() => {
        toast.success("image deleted ", { autoClose: 2000 });
        refetchImageData();
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });

    console.log(id);
  };

  const form = useForm({
    initialValues: {
      title: houseData?.data.house.title || "",
      type: houseData?.data.house.type || "",
      bedRoomDup: parseInt(houseData?.data.house.bedRoom) || "",
      occupancyDup: parseFloat(houseData?.data.house.occupancy) || "",
      diningRoomDup: parseInt(houseData?.data.house.diningRoom) || "",
      kitchenDup: parseInt(houseData?.data.house.kitchen) || "",
      livingRoomDup: parseInt(houseData?.data.house.livingRoom) || "",
      hallDup: parseInt(houseData?.data.house.hall) || "",
      area: houseData?.data.house.area || "",
      yearBuilt: houseData?.data.house.yearBuilt || "",
      listingDate: houseData?.data.house.listingDate || "",
      closingDate: houseData?.data.house.bedRoom || "",
      description: houseData?.data.house.description || "",
      feature: houseData?.data.house.feature || "",
      facilities: houseData?.data.house.facilities || "",
      price: houseData?.data.house.price || "",
      bathRoomDup: parseInt(houseData?.data.house.bathRoom) || "",
      files: [],
      address: houseData?.data.house.address || "",
      facilitiesArray: houseData?.data.house.facilitiesArray || "",
      occupancy: "",
      bathRoom: "",
      bedRoom: "",
      livingRoom: "",
      diningRoom: "",
      hall: "",
      kitchen: "",
    },
  });
  form.values.occupancy = form.values.occupancyDup.toString();
  form.values.bathRoom = form.values.bathRoomDup.toString();
  form.values.bedRoom = form.values.bedRoomDup.toString();
  form.values.livingRoom = form.values.livingRoomDup.toString();
  form.values.diningRoom = form.values.diningRoomDup.toString();
  form.values.kitchen = form.values.kitchenDup.toString();
  form.values.hall = form.values.hallDup.toString();

  const updateHouse = async (values: any) => {
    console.log(typeof values.yearBuilt);

    try {
      await axios
        .patch(UPDATEHOUSE + `${id}`, values, {
          withCredentials: true,
        })
        .then(() => updatedForm());
    } catch (error) {
      console.log(error);
    }
  };

  const createImages = async (values: any) => {
    try {
      const formData = new FormData();

      values.files.forEach((file: any) => {
        formData.append("files", file);
      });
      if (values.files.length > 0) {
        await axios
          .post(CREATEIMAGESHOUSE + `${id}`, formData, {
            withCredentials: true,
          })
          .then(() => {
            updatedForm();
            toast.success("Images added");
            refetchImageData();
            form.reset();
          });
      }
    } catch (error) {
      console.log(error);
      toast.warn("problem while sending the request");
    }
  };

  const createImageMutation = useMutation(createImages);
  const updateHouseMutation = useMutation(updateHouse);
  const updateHandler = async (values: any) => {
    await updateHouseMutation.mutate(values);
    await createImageMutation.mutate(values);
  };

  return (
    <div className="mx-96 py-10">
      {isLoadingHouse ? (
        <div className="text-xl font-medium">Loading... Please Wait</div>
      ) : (
        <form
          onSubmit={form.onSubmit((values) => {
            updateHandler(values);
          })}
        >
          <TextInput
            label="Title"
            name="title"
            {...form.getInputProps("title")}
            key="title"
          />
          <TextInput
            label="Address"
            placeholder="address"
            name="address"
            {...form.getInputProps("address")}
            key="address"
            mt={8}
          />
          <Flex justify={"space-between"} mt={8}>
            <NumberInput
              // defaultValue={2}
              placeholder="Occupancy"
              label="Occupancy"
              {...form.getInputProps("occupancyDup")}
              key="occupancy"
            />

            <TextInput
              placeholder="Total price"
              label="Price"
              name="price"
              {...form.getInputProps("price")}
              key="price"
            />
            <NumberInput
              placeholder="Bathroom"
              label="Bathroom"
              {...form.getInputProps("bathRoomDup")}
              key="bathRoom"
            />
          </Flex>
          <Flex justify={"space-between"} mt={8}>
            <NumberInput
              defaultValue={0}
              placeholder="BedRoom"
              label="BedRoom"
              {...form.getInputProps("bedRoomDup")}
              key="bedRoom"
            />

            <NumberInput
              placeholder="DiningRoom"
              label="DiningRoom"
              {...form.getInputProps("diningRoomDup")}
              key="diningRoom"
            />
            <NumberInput
              defaultValue={0}
              placeholder="Living Room"
              label="LivingRoom"
              {...form.getInputProps("livingRoomDup")}
              key="livingRoom"
            />
          </Flex>

          <Flex justify={"space-between"} mt={8}>
            <TextInput
              defaultValue={0}
              placeholder="Listing Date"
              label="Listing Date"
              {...form.getInputProps("listingDate")}
              key="listingDate"
            />

            <TextInput
              defaultValue={0}
              placeholder="Closing Date"
              label="Closing Date"
              name="closingDate"
              {...form.getInputProps("closingDate")}
              key="closingDate"
            />
            <NumberInput
              placeholder="Kitchen"
              label="Kitchen"
              {...form.getInputProps("kitchenDup")}
              key="kitchen"
            />
          </Flex>
          <Flex justify={"space-between"} mt={8}>
            <TextInput
              name="yearBuilt"
              placeholder="1999"
              label="Yeary Built In"
              {...form.getInputProps("yearBuilt")}
              key="yearBuilt"
            />

            <NumberInput
              placeholder="hall"
              label="Hall"
              {...form.getInputProps("hallDup")}
              key="hall "
            />
          </Flex>

          <Textarea
            placeholder="Describe your house..."
            label="Description"
            autosize
            minRows={4}
            maxRows={8}
            mt={8}
            name="description"
            {...form.getInputProps("description")}
            key="description"
          />

          <MultiSelect
            mt={8}
            data={data}
            label="The facilities that you can promise"
            placeholder="Pick "
            {...form.getInputProps("facilitiesArray")}
            key="facilities"
            valueComponent={OriginalValue}
            itemComponent={Item}
            transitionProps={{
              duration: 150,
              transition: "pop-top-left",
              timingFunction: "ease",
            }}
          />

          <Flex justify={"space-between"} mt={8}>
            <Select
              label="Type"
              placeholder="Pick one"
              name="type"
              className="max-w-[20%]"
              data={["RENT", "SELL"]}
              {...form.getInputProps("type")}
              key="type"
            />

            <TextInput
              label=" Area"
              placeholder="12 by 12 feet"
              {...form.getInputProps("area")}
              name="area"
              key="area"
            />
          </Flex>

          <Text className="pt-2">Your Images</Text>
          {isFetchingImage ? (
            <div className="text-xl font-medium">Images Loading...</div>
          ) : (
            <div className="flex flex-wrap  gap-8 mt-8">
              {imageData?.data.map((item: any) => {
                return (
                  <div className="">
                    <Image
                      src={item.image}
                      radius="md"
                      className=""
                      height={220}
                      width={220}
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
              })}
            </div>
          )}

          <Text fw={500} mt={8}>
            Upload Images
          </Text>

          <FileInput
            label=""
            placeholder="Select Images"
            className=""
            multiple
            // valueComponent={ValueComponent}
            {...form.getInputProps("files")}
            key="files"
            disabled={imageData?.data.length >= 6}
          />

          <div>
            <div className="flex mt-2 ">
              <Button
                type="submit"
                className="bg-blue-500 m-auto"
                onClick={() => {
                  updatingForm();
                }}
              >
                Subit form
              </Button>
            </div>
          </div>
        </form>
      )}

      <ToastContainer />
    </div>
  );
}
