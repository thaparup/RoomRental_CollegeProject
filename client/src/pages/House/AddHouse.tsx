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
  MultiSelect,
  MultiSelectValueProps,
  Box,
  CloseButton,
  SelectItemProps,
} from "@mantine/core";
import axios from "axios";
import { forwardRef } from "react";
import React, { useState, useRef } from "react";
import { useMutation } from "react-query";
import { useForm } from "@mantine/form";
import { IconPhoto } from "@tabler/icons-react";
import { ADDHOUSE } from "../../utils/ApiRoutes";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SwimmingIcon from "../../components/SwimmingIcon";
import WifiIcon from "../../components/WifiIcon";
import Washer from "../../components/Washer";
import Pets from "../Pets";
import HotWater from "../../components/HotWater";
import Balcony from "../../components/Balcony";
import Parking from "../../components/Parking";
import Yard from "../../components/Yard";
import Microwave from "../../components/Microwave";
import { ICONDATA } from "../../utils/Constants";

export default function AddHouse() {
  const toastId = useRef(null);

  const formSubmitting = () =>
    (toastId.current = toast.success("Form is submitting...", {
      type: toast.TYPE.SUCCESS,
      autoClose: false,
    }));

  const formSubmitted = () =>
    toast.update(toastId.current, {
      render: () => <div>House Created!</div>,
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
    Swimming: () => <SwimmingIcon height={24} width={24}/>,
    Wifi: () => <WifiIcon height={24} width={24}/>,
    Washer: () => <Washer height={24} width={24}/>,
    Pets: () => <Pets height={24} width={24}/>,
    Hot_Water: () => <HotWater height={24} width={24}/>,
    Balcony: () => <Balcony height={24} width={24}/>,
    Parking: () => <Parking height={24} width={24}/>,
    Yard: () => <Yard height={24} width={24}/>,
    Microwave: () => <Microwave height={24} width={24}/>,
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
  const form = useForm({
    initialValues: {
      title: "",
      type: "",
      bedRoom: "",
      occupancy: "",
      diningRoom: "",
      kitchen: "",
      livingRoom: "",
      hall: "",
      area: "",
      yearBuilt: "",
      listingDate: "",
      closingDate: "",
      description: "",
      feature: "",
      facilities: "",
      facilitiesArray: "",
      price: "",
      bathRoom: "",
      files: [],
      address: "",
      bedRoomDup: "",
      occupancyDup: "",
      bathRoomDup:"",
      livingRoomDup:"",
      diningRoomDup:"",
      hallDup:"",
      kitchenDup:""

    },
  });
  // console.log(form.values)
  form.values.occupancy = form.values.occupancyDup.toString();
  form.values.bathRoom = form.values.bathRoomDup.toString();
  form.values.bedRoom = form.values.bedRoomDup.toString();
  form.values.livingRoom = form.values.livingRoomDup.toString();
  form.values.diningRoom = form.values.diningRoomDup.toString();
  form.values.kitchen = form.values.kitchenDup.toString();
  form.values.hall = form.values.hallDup.toString();
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
  const addHouse = async (values: any) => {
    try {
      const formData = new FormData();

      for (const key in values) {
        if (values.hasOwnProperty(key)) {
          formData.append(key, values[key]);
        }
      }
      values.files.forEach((file: any) => {
        formData.append("files", file);
      });
      await axios
        .post(ADDHOUSE, formData, { withCredentials: true })
        .then(() => {
          formSubmitted();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const mutation = useMutation(addHouse, {
    onSuccess(data, variables, context) {},
  });
  const onAddHouse = (values: any, event: any) => {
    event.preventDefault();
    mutation.mutate(values, { onSuccess(data, variables, context) {} });
  };

  return (
    <div className="mx-96 py-10">
      <form
        onSubmit={form.onSubmit((values) => {
          onAddHouse(values, event);
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
            defaultValue={0}
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
            placeholder="BathRoom"
            label="BathRoom"
            name="bathRoom"
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
            defaultValue={0}
            placeholder="DiningRoom"
            label="DiningRoom"
            name="diningRoom"
            {...form.getInputProps("diningRoomDup")}
            key="diningRoom"
          />
          <NumberInput
            defaultValue={0}
            placeholder="LivingRoom"
            label="LivingRoom"
            name="livingRoom"
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
            name="kitchen"
            {...form.getInputProps("kitchenDup")}
            key="kitchen"
          />
        </Flex>
        <Flex justify={"space-between"} mt={8}>
          <TextInput
            name="yearBuilt"
            placeholder="1999"
            label="Year It Was Built In"
            {...form.getInputProps("yearBuilt")}
            key="yearBuilt"
          />

          <NumberInput
            placeholder="hall"
            label="Hall"
            name="hall"
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

        <Text fw={500} mt={8}>
          Images
        </Text>
        <FileInput
          label=""
          placeholder="Upload Images"
          className=""
          multiple
          valueComponent={ValueComponent}
          {...form.getInputProps("files")}
          key="files"
        />
        <div>
          <div className="flex mt-2 ">
            <Button
              type="submit"
              onClick={() => {
                formSubmitting();
              }}
              className="bg-blue-500 m-auto"
            >
              Subit form
            </Button>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
