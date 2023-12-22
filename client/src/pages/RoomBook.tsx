import { Button, Checkbox } from "@mantine/core";
import axios from "axios";
import React from "react";
import { BOOKROOM } from "../utils/ApiRoutes";
import { useForm } from "@mantine/form";
import { ToastContainer, toast } from "react-toastify";
import { useMutation } from "react-query";
import Cookies from "js-cookie";


export default function RoomBook(props) {
  const form = useForm({
    initialValues: {},
  });

  const authToken = Cookies.get("token");

  async function bookRoom(values) {
    
    try {
      await axios
        .patch(BOOKROOM + `${props.id}` + `/${props.userId}`, values, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then(() => {
            toast.success("Room Booked"),
            setTimeout(()=>{
                window.location.reload()
            },1500)
        });
    } catch (error) {
      console.log(error);
    }
  }

  const bookingMutation = useMutation(bookRoom, {
    onMutate(variables) {},
  });
  const handleSubmit = (values: any, event: React.FormEvent) => {

    bookingMutation.mutate(values, {
      onSuccess: () => {},
    });
  };
  return (
    <div className=" w-96 m-auto pt-3">
      <form
        onSubmit={form.onSubmit((values,) => {
          handleSubmit(values );
        })}
      >
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
          className="bg-primary w-full my-4 h-[44px] "
          type="sumbit"
          //   disabled={roomData?.data.room.booked}
        >
          Send A Booking Request
        </Button>
      </form>
      <ToastContainer/>
    </div>
  );
}
