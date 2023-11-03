import {
  NumberInput,
  Textarea,
  Flex,
  TextInput,
  Select,
  FileInput,
  FileButton,
  Button,
  Group,
  FileInputProps,
  rem,
  Center,
  Text,
  MultiSelect,
  MultiSelectValueProps,
  CloseButton,
  Box,
  SelectItemProps,
} from "@mantine/core";
import axios from "axios";
import React, { forwardRef, useState } from "react";
import { useMutation } from "react-query";
import { ADDLAND, ADDROOM } from "../../utils/ApiRoutes";
import { useForm } from "@mantine/form";
import { IconPhoto } from "@tabler/icons-react";
import { ToastContainer, toast } from "react-toastify";
import Swim from "../../../public/swim.svg";
import WifiIcon from "../../components/WifiIcon";
import SwimmingIcon from "../../components/SwimmingIcon";
import Washer from "../../components/Washer";
import Pets from "../Pets";
import HotWater from "../../components/HotWater";
import Balcony from "../../components/Balcony";
import Parking from "../../components/Parking";
import Yard from "../../components/Yard";
import Microwave from "../../components/Microwave";
import { ICONDATA } from "../../utils/Constants";
import {  DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { eachDayOfInterval, startOfDay } from "date-fns";


export default function AddLand() {
  const toastId = React.useRef(null);

  const formSubmitting = () =>
    (toastId.current = toast.success("Form is submitting...", {
      type: toast.TYPE.SUCCESS,
      autoClose: false,
    }));

  const formSubmitted = () =>
    toast.update(toastId.current, {
      render: () => <div>Land Created!</div>,
      type: toast.TYPE.SUCCESS,
      autoClose: 2000,
    });

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);
  

  const [dates, setDates] = useState([
   
    new Date("2023-09-06"), // Example: A specific date
    new Date("2023-09-07"), // Another specific date
  ]);
  const [datess, setDatess] = useState([
   
    new Date("2023-09-08"), // Example: A specific date
    new Date("2023-09-09"), // Another specific date
  ]);

const individualDates = date.flatMap((item) => {
    const startDate = item.startDate;
    const endDate = item.endDate || startDate;
    const dates = eachDayOfInterval({ start: startDate, end: endDate });
    return dates;
  });
  
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
  const [value, setValue] = useState([]);
  const form = useForm({
    initialValues: {
      title: "",
      address: "",
      cost: "",
      area: "",
      description: "",
      type: "",
      files: [],
      facedOn: "",
      distanceFromRoad: "",
      nameOfRoad: "",
      facilitiesArray: [],
      reservations: [],
    }, 
  });
   form.values.reservations = [individualDates];
  
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

  const addNewLand = async (values: any) => {
    try {
      const formData = new FormData();
      
     
      // for (const key in values) {
      //   if (values.hasOwnProperty(key)) {
      //     formData.append(key, values[key]);
      //   }
      // }
      // values.files.forEach((file: any) => {
      //   formData.append("files", file);
      // });
   
      for (const value of formData.values()) {
        // console.log(value);
      }

      // formData.append("reservations", values.reservations);
      await axios.post(ADDLAND, values, { withCredentials: true }).then(()=>{formSubmitted()})
    } catch (error) {
      console.log(error);
      toast.warn("problem while sending the request");
    }
  };

  const landMutation = useMutation(addNewLand, {
    onMutate(variables) {
      // toast.success('wait while form is submitting', {position:'top-left'})
      formSubmitting();
    },
  });
  const handleSubmit = (values: any, event: any) => {
    event.preventDefault();
    landMutation.mutate(values, {
      onSuccess: () => {
        // toast.success('Room Created!')
      },
    });
  };

  return (
    <div className="mx-96 py-10">
      <form
        onSubmit={form.onSubmit((values) => {
          handleSubmit(values, event);
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
       <DateRange
          editableDateInputs={true}
          onChange={(item) =>setDate([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={date}
          disabledDates={datess,dates}  
          rangeColors={["#228BE6"]}
          //  {...form.getInputProps("reservations")}
           key={"reservations"}
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

          <NumberInput
            defaultValue={0}
            placeholder="Total price"
            label="Price"
            name="cost"
            {...form.getInputProps("cost")}
            key="cost"
          />
        </Flex>
        <MultiSelect
          mt={8}
          data={ICONDATA}
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
        <Text mt={8} fw={400}>
          Upload Images
        </Text>
        <FileInput
          label=""
          placeholder="Select Images"
          className="pt-3"
          multiple
          valueComponent={ValueComponent}
          {...form.getInputProps("files")}
          key="files"
        />
        <div>
          <Button type="submit" className="bg-red-400" mt={8}>
            Subit form
          </Button>
        </div>
      </form>
      {/* {landMutation.isLoading? toast.success('form is submitting'): ''}
      {landMutation.isSuccess? toast.success('Room Created'): ''} */}
      <ToastContainer />
    </div>
  );
}
