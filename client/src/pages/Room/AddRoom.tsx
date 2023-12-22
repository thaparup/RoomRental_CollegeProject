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
  Box,
  CloseButton,
  SelectItemProps,
} from "@mantine/core";
import { forwardRef, useEffect, useRef } from "react";
import axios from "axios";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { ADDROOM, GETKYC } from "../../utils/ApiRoutes";
import { useForm } from "@mantine/form";
import { IconPhoto } from "@tabler/icons-react";
import { ToastContainer, toast } from "react-toastify";
import SwimmingIcon from "../../components/SwimmingIcon";
import WifiIcon from "../../components/WifiIcon";
import Washer from "../../components/Washer";
import Pets from "../Pets";
import HotWater from "../../components/HotWater";
import Balcony from "../../components/Balcony";
import Parking from "../../components/Parking";
import Yard from "../../components/Yard";
import Microwave from "../../components/Microwave";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Link } from "react-router-dom";

import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { BsArrowReturnLeft } from "react-icons/bs";
import MyRichTextEditor from "../../components/MyRichTextEditor";
import LeafletMap from "../LeafletMap";

export default function AddRoom() {
  const toastId = useRef(null);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  const [termsAndConditions, setTermsAndConditions] = useState("");
  const [position, setPosition] = useState({
    lat: 28.186549712731548,
    lng: 83.97502937314685,
  });
  const [positionString, setPositionString] = useState("");

  useEffect(() => {
    if (position) {
      // Serialize the 'position' object to a JSON string
      const positionJsonString = JSON.stringify(position);
      setPositionString(positionJsonString);
    }
  }, [position]);

  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  useEffect(() => {
    if (position) {
      // Convert and store position.lat as a string in 'lat' state
      setLat(position.lat.toString());

      // Convert and store position.lng as a string in 'lng' state
      setLng(position.lng.toString());
    }
  }, [position]);
  // const disabledDates = date.flatMap((item) => {
  //   const startDate = item.startDate;
  //   const endDate = item.endDate || startDate;
  //   const dates = eachDayOfInterval({ start: startDate, end: endDate });
  //   return dates;
  // });
  const formSubmitting = () =>
    (toastId.current = toast.success("Form is submitting...", {
      type: toast.TYPE.SUCCESS,
      autoClose: false,
    }));

  const formSubmitted = () =>
    toast.update(toastId.current, {
      render: () => <div>Room Created!</div>,
      type: toast.TYPE.SUCCESS,
      autoClose: 2000,
    });

  const getKyc = async () => {
    const response = await axios.get(GETKYC, { withCredentials: true });
    return response;
  };
  const { data: kyc, refetch: kycRefetch } = useQuery(["getKyc"], getKyc);

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
  const shouldHideMyLatAndMyLong = true;
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

  const addRoom = async (values: any) => {
    try {
      if (kyc?.data.length === 0) {
        window.location.href = "/auth/kyc";
      }
      const formData = new FormData();

      for (const key in values) {
        if (values.hasOwnProperty(key)) {
          formData.append(key, values[key]);
        }
      }

      values.files.forEach((file: any) => {
        formData.append("files", file);
      });
      for (const pair of formData.entries()) {
        const [key, value] = pair;
        console.log(`Key: ${key}, Value: ${value}`);
      }
      formData.append("termsAndConditions", termsAndConditions);

      await axios
        .post(ADDROOM, formData, { withCredentials: true })
        .then(() => {
          formSubmitted();
          form.reset();
          kycRefetch();
        });
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // Display the error message from the server using toast.error()
        toast.error(error.response.data.message);
      } else {
        // Handle other types of errors (e.g., network errors)
        toast.error("An error occurred");
      }
    }
  };

  const mutation = useMutation(addRoom);
  const onAddRoom = (values: any, event: any) => {
    event.preventDefault();
    mutation.mutate(values, { onSuccess(data, variables, context) {} });
  };

  //  const content= 'hello world'
  // const editor = useEditor({
  //   extensions: [
  //     StarterKit,
  //     Underline,
  //     Link,
  //     Superscript,
  //     SubScript,
  //     Highlight,
  //     TextAlign.configure({ types: ["heading", "paragraph"] }),
  //   ],
  //   content: termsAndConditions,
  // });
  // useEffect(() => {
  //   if (editor) {
  //     const initialContent = editor.getHTML();
  //     setTermsAndConditions(initialContent);

  //     // Add an event listener for the 'update' event to capture content changes
  //     editor.on("update", () => {
  //       const updatedContent = editor.getHTML();
  //       setTermsAndConditions(updatedContent);
  //     });
  //   }
  // }, [editor]);

  const form = useForm({
    initialValues: {
      title: "",
      occupancy: "",
      occupancyDup: "",
      costDup: "",
      bathRoomDup: "",
      cost: "",
      bathRoom: "",
      description: "",
      roomtype: "",
      files: [],
      facilitiesArray: [],
      size: "",
      feature: "",
      address: "",
      latitude: [],
      myLat: "",
      myLong: "",
    },
  });
  form.values.occupancy = form.values.occupancyDup.toString();
  form.values.bathRoom = form.values.bathRoomDup.toString();
  form.values.cost = form.values.costDup.toString();
  form.values.latitude = positionString;
  form.values.myLat = position.lat.toString();
  form.values.myLong = position.lng.toString();

  return (
    <div className="">
      <div className="flex py-6 px-20">
        <div className="bg-[#00acee] p-3 rounded-md">
          <Link to="/listing/room">
            <BsArrowReturnLeft size={18} className="text-white " />
          </Link>
        </div>
      </div>
      <div className="mx-96 py-2">
        <form
          onSubmit={form.onSubmit((values) => {
            onAddRoom(values, event);
          })}
        >
          <TextInput
            label="Title"
            placeholder="title"
            name="title"
            {...form.getInputProps("title")}
            key="title"
            // required
          />
          <TextInput
            label="Address"
            placeholder="address"
            name="address"
            {...form.getInputProps("address")}
            key="address"
            mt={10}
            // required
          />
          <Flex justify={"space-between"} mt={10}>
            <NumberInput
              defaultValue={0}
              placeholder="Occupancy"
              label="Occupancy"
              {...form.getInputProps("occupancyDup")}
              key="occupancyDup"
              // required
            />

            <NumberInput
              defaultValue={0}
              placeholder="Total price"
              label="Price"
              name="costDup"
              {...form.getInputProps("costDup")}
              key="costDup"
              // required
            />
            <NumberInput
              defaultValue={0}
              placeholder="Bathroom"
              label="Bathroom"
              name="bathRoomDup"
              {...form.getInputProps("bathRoomDup")}
              key="bathRoomDup"
              // required
            />
          </Flex>
          <MultiSelect
            mt={10}
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
          <div className="mt-5 ">
            <Text className="text-[15px] font-medium mb-1">
              Write Your Lease Agreement
            </Text>
            <MyRichTextEditor
              value={termsAndConditions}
              setValue={setTermsAndConditions}
            />
          </div>
          <Textarea
            placeholder="Describe your room..."
            label="Description"
            autosize
            minRows={4}
            maxRows={8}
            mt={10}
            name="description"
            {...form.getInputProps("description")}
            key="description"
            // required
          />
          <Flex justify={"space-between"} mt={10}>
            <Select
              label="Type Of Booking"
              placeholder="Pick one"
              name="roomtype"
              className=""
              data={["LONG_TERM_BOOKING", "SHORT_TERM_BOOKING"]}
              {...form.getInputProps("roomtype")}
              key="roomtype"
              width={80}
            />

            <TextInput
              label="Size"
              placeholder="12 by 12 feet"
              {...form.getInputProps("size")}
              name="size"
              key="size"
              // required
            />
          </Flex>
          <Text fw={500} mt={10}>
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
            // required
          />
          <br /> <br />
          {/* <LeafletMap onMarkerPositionChange={handleMarkerPositionChange} /> */}
          <LeafletMap position={position} setPosition={setPosition} />
          {shouldHideMyLatAndMyLong ? null : (
            <TextInput
              label="Size"
              placeholder="12 by 12 feet"
              {...form.getInputProps("latitude")}
              name="latitude"
              key="latitude"
              // required
            />
          )}
          {shouldHideMyLatAndMyLong ? null : (
            <TextInput
              label="Size"
              placeholder="12 by 12 feet"
              {...form.getInputProps("myLat")}
              name="myLat"
              key="myLat"
              // required
            />
          )}
          {shouldHideMyLatAndMyLong ? null : (
            <TextInput
            label="Size"
            placeholder="12 by 12 feet"
            {...form.getInputProps("myLong")}
            name="myLong"
            key="myLong"
            // required
          />
          )}
          
          
          <div>
            <div className="flex my-6 ">
              <Button
                type="submit"
                onClick={() => {
                  formSubmitting();
                }}
                className="bg-primary m-auto w-40 h-10"
              >
                Subit form
              </Button>
            </div>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}
