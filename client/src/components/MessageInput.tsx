import React from "react";
import { useForm } from "@mantine/form";
import { TextInput } from "@mantine/core";
import { AiOutlineSend } from "react-icons/ai";
import { useMutation } from "react-query";
import { ToastContainer, toast } from "react-toastify";
import { SENDMESSAGE } from "../utils/ApiRoutes";
import axios from "axios";

export default function MessageInput(props) {
  const form = useForm({
    initialValues: {
      message: "",
    },
  });

  const sendText = async (values: any, id) => {
    try {
      console.log("the id " + id);
      await axios
        .post(SENDMESSAGE + `${props.id}`, values, { withCredentials: true })
        .then(() => {
          toast("Message sent ", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          form.reset();
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        });
    } catch (error) {
      console.log(error);
      //   toast.warn("problem while sending the request");
    }
  };

  const messageMutation = useMutation(sendText);

  const handleSubmit = (values: any, event: any) => {
    event.preventDefault();
    messageMutation.mutate(values, {
      onSuccess: () => {},
    });
  };
  return (
    <div className=" relative ">
      <form
        onSubmit={form.onSubmit((values) => {
          handleSubmit(values, event);
        })}
      >
        <TextInput
          placeholder="Type a message"
          {...form.getInputProps("message")}
         size="md"
        />

        <button type="submit" className=" absolute bottom-2 right-5">
          <AiOutlineSend size={24} />
        </button>
      </form>
    </div>
  );
}
