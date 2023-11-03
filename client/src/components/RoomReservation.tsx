import React, { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useForm } from "@mantine/form";
import { ToastContainer, toast } from "react-toastify";
import {
  eachDayOfInterval,
  startOfDay,
  differenceInDays,
  parseISO,
} from "date-fns";
import { ROOMRESERVATION } from "../utils/ApiRoutes";
import axios from "axios";
import { AiOutlineSend } from "react-icons/ai";
import { Button, Checkbox, Divider, Flex, Text } from "@mantine/core";
import { useMutation } from "react-query";

export default function RoomReservation(props) {
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);
  const form = useForm({
    initialValues: {
      reservations: [],
    },
  });

  const individualDates: Date[] = date.flatMap((item) => {
    const startDate = item.startDate;
    const endDate = item.endDate || startDate;
    const dates = eachDayOfInterval({ start: startDate, end: endDate });
    return dates;
  });
  form.values.reservations = individualDates;
  const addReservation = async (values: any) => {
     console.log("dsfsdf");
    try {
      await axios
        .post(ROOMRESERVATION + `${props.id}` +  `/${props.userId}`, values, {
          withCredentials: true,
        })
        .then(() => {
          toast.success("Reservation added");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        });
    } catch (error) {
      console.log(error);
      toast.warn("problem while sending the request");
    }
  };

  const reservationMutation = useMutation(addReservation, {
    onMutate(variables) {},
  });
  const handleSubmit = (values: any, event: React.FormEvent) => {
    event.preventDefault();
    reservationMutation.mutate(values, {
      onSuccess: () => {},
    });
  };
  
  return (
    <div className="min-w-[32%] border-[1px] rounded-md px-4 py-2 shadow-reserve">
      <form 
        onSubmit={form.onSubmit((values) => {
          handleSubmit(values, event);
        })}
      >
        <Text py={8} fw={400}fz='lg'>Check for availablity</Text>
        <DateRange
          editableDateInputs={true}
          onChange={(item) => setDate([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={date}
          rangeColors={["#228BE6"]}
          disabledDates={props.convertedDates}
          key={"reservations"}
        />
        <Checkbox
        className=" max-w-[260px]"
              label={
                <>
                  I accept{" "}
                  <span className="text-primary">terms and conditions</span>
                </>
              }
              
              required
            />
        <Button
          className="bg-primary w-full my-4 h-[44px]"
          
          type="submit"
          // disabled={
          //   roomData?.data.room.booked ||
          //   roomData?.data.room.roomtype === "LONG_TERM_BOOKING"
          // }
        >
          Reserve
        </Button>

        
        <Flex justify={"space-between"}>
                <Text underline py={4}>
                  Rs {Math.floor(props.cost)} ×{" "}
                  {individualDates.length}{" "}
                </Text>
                <Text>
                  {" "}
                  Rs{" "}
                  {Math.floor(props.cost ) *
                    individualDates.length}
                </Text>
              </Flex>
              <Flex justify={"space-between"}>
                <Text underline py={4}>
                  Service Fee{" "}
                </Text>
                <Text>
                  {" "}
                  Rs{" "}
                  {(10 *
                    Math.floor(
                      (props.cost) * individualDates.length
                    )) /
                    100}
                </Text>
              </Flex>
              <Divider my={14} />
              <Flex justify={"space-between"}>
                <Text fw={500}>Total</Text>
                <Text fw={500}>
                  {Math.floor(props.cost ) *
                    individualDates.length +
                    (10 *
                      Math.floor(
                        (props.cost) * individualDates.length
                      )) /
                      100}{" "}
                </Text>
              </Flex>
      </form>
    </div>
  );
}
