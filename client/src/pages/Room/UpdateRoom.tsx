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
  Image,
  Divider,
} from "@mantine/core";
import { forwardRef, useEffect, useRef } from "react";
import axios from "axios";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
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
import { Link, useParams } from "react-router-dom";

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
import {
  CREATEIMAGESROOM,
  DELETEIMAGEROOM,
  GETIMAGESROOM,
  GETMYROOMBYID,
  UPDATEROOM,
} from "../../utils/ApiRoutes";
import { AiOutlineDelete } from "react-icons/ai";

export default function AddRoom() {
  const toastId = useRef(null);

  const { id } = useParams();

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
      render: () => <div>Room Updated!</div>,
      type: toast.TYPE.SUCCESS,
      autoClose: 2000,
    });

  async function getRoomById() {
    let response = await axios.get(GETMYROOMBYID + `${id}`, {
      headers: {
        // Cookie: myTok
      },
      withCredentials: true,
    });
    return response;
  }

  async function getImagesById() {
    try {
      let response = await axios.get(GETIMAGESROOM + `${id}`, {
        headers: {
          // Cookie: myTok
        },
        withCredentials: true,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  const {
    data: roomData,
    isLoading: isLoadingRoom,
    isError: isErrorRoom,
    refetch: refetchRoom,
    isFetching: isFetchingRoom,
  } = useQuery(["getRoomById"], getRoomById);
  const {
    data: imageData,
    isLoading: isLoadingImage,
    isError: isErrorImage,
    refetch: refetchImage,
    isFetching: isFetchingImage,
  } = useQuery(["getImagesRoomById"], getImagesById);

  const handleImageDelete = (itemId: any) => {
    axios
      .delete(DELETEIMAGEROOM + `${itemId}`, { withCredentials: true })
      .then(() => {
        toast.success("images deleted", { autoClose: 1000 });

        refetchImage();
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });

    console.log(itemId);
  };
  const shouldShowMyLat = false; 
  const createImages = async (values: any) => {
    try {
      const formData = new FormData();

      values.files.forEach((file: any) => {
        formData.append("files", file);
      });
      if (values.files.length > 0) {
        await axios
          .post(CREATEIMAGESROOM + `${id}`, formData, {
            withCredentials: true,
          })
          .then(() => {
            //  formSubmitted();
            toast.success("images added");
            refetchImage();
          });
      }
    } catch (error) {
      console.log(error);
      toast.warn("problem while sending the request");
    }
  };

  const updateRoom = async (values: any) => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const updRoom = async (values: any) => {
    try {
         console.log(values)
      // const formData = new FormData();

      // for (const key in values) {
      //   if (values.hasOwnProperty(key)) {
      //     formData.append(key, values[key]);
      //   }
      // }

      // for (const pair of formData.entries()) {
      //   const [key, value] = pair;
      //   console.log(`Key: ${key}, Value: ${value}`);
      // }
      // formData.append("termsAndConditions", termsAndConditions);
      const combinedData = {
        ...values, // Include form values
        termsAndConditions: termsAndConditions, // Include terms and conditions from state
      };
      await axios
        .patch(UPDATEROOM + `${id}`, combinedData, { withCredentials: true })
        .then(() => {
          formSubmitted();
          refetchRoom();
        });
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // Display the error message from the server using toast.error()
        toast.error(error.response.data.message);
        console.log(error)
      } else {
        // Handle other types of errors (e.g., network errors)
        toast.error("An error occurred");
      }
    }
  };
  const patchRequest = useMutation(updRoom, {
    onMutate: () => {
      formSubmitting();
    },
  });
  const postRequest = useMutation(createImages, { onSuccess: () => {} });

  const submitHandler = async (values: any, id: any) => {
    try {
      // await updateLand(values, id);
      await patchRequest.mutate(values);

      await postRequest.mutate(values, id);
    } catch (error) {
      // Handle error
      console.error("Error:", error);
    }
  };

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

  const form = useForm({
    initialValues: {
      title: roomData?.data.title || "",
      occupancy: "",
      occupancyDup: "",
      costDup: "",
      bathRoomDup: "",
      cost: "",
      bathRoom: "",
      description: roomData?.data.description || "",
      roomtype: roomData?.data.roomtype || "",
      files: [],
      facilitiesArray: [],
      size: roomData?.data.size || "",
      feature: "",
      address: roomData?.data.address || "",
      latitude: [],
      myLat: roomData?.data.myLat || "",
      myLong: roomData?.data.myLong || "",
    },
  });
  form.values.occupancy = form.values.occupancyDup.toString();
  form.values.bathRoom = form.values.bathRoomDup.toString();
  form.values.cost = form.values.costDup.toString();
  form.values.latitude = positionString;
  form.values.myLat = position.lat.toString();
  form.values.myLong = position.lng.toString();


  const shouldHideMyLatAndMyLong = true; // Set this condition as needed

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
          onSubmit={form.onSubmit((values, id) => {
            submitHandler(values, id);
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

          
         
          <br />  
          <br /> <br />
          <div>
            <Divider mt={18} />
            <p className="text-lg font-medium mt-2">Your Images</p>
            <div className="flex flex-wrap  gap-8 mt-4">
              {isFetchingImage ? (
                <div className="text-xl font-medium">Fetching Image... </div>
              ) : (
                imageData?.data.map((item: any) => {
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
                })
              )}
            </div>
            <Text fz={15} fw={400}>
              Upload Image
            </Text>
            <FileInput
              label=""
              placeholder="Select Images"
              className="pt-2"
              multiple
              valueComponent={ValueComponent}
              {...form.getInputProps("files")}
              key="files"
              disabled={imageData?.data.length >= 6}
            />
           
          </div>
          <br /><br />
          {/* <LeafletMap onMarkerPositionChange={handleMarkerPositionChange} /> */}
          <LeafletMap position={position} setPosition={setPosition} />
          {/* <TextInput
            label="Size"
            placeholder="12 by 12 feet"
            {...form.getInputProps("latitude")}
            name="latitude"
            key="latitude"
            // required
          /> */}
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
                // onClick={() => {
                //   formSubmitting();
                // }}
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
