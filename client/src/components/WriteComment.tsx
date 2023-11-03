import { Button, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import React from "react";
import { WRITECOMMENT } from "../utils/ApiRoutes";
import { ToastContainer, toast } from "react-toastify";
import { useMutation } from "react-query";

export default function WriteComment({id}) {
  const form = useForm({
    initialValues: {
      reservations: [],
    },
  });

  const writeComment = async (values: any) => {
    try {
      console.log("the id is for comment" + id);
      await axios
        .post( WRITECOMMENT+ `${id}`, values, { withCredentials: true })
        .then(() => {
            toast.success("Comment added")
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

  const commentMutation = useMutation(writeComment);

  const handleSubmit = (values: any, event: any) => {
    event.preventDefault();
    commentMutation.mutate(values, {
      onSuccess: () => {},
    });
  };
  return (
    <div className="w-[60%] py-8">
      <form
        onSubmit={form.onSubmit((values) => {
          handleSubmit(values, event);
        })}
      >
        <Textarea
          placeholder="Your comment"
          label="Your comment"
          size="md"
          radius="md"
          {...form.getInputProps("text")}
        />
        <Button
          type="submit"
          onClick={() => {}}
          className="bg-primary m-auto w-40 h-10 mt-2"
        >
          Submit
        </Button>
      </form>
      <ToastContainer autoClose={1000}/>
    </div>
  );
}
