import { Button, FileInput, Group, PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import React from "react";
import { UPDATEPROFILE } from "../utils/ApiRoutes";
import { useMutation } from "react-query";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateProfile() {
  const form = useForm({
    initialValues: {
      password: "",
      confirmPassword: "",
      file: "",
    },

    validate: {
    //   password: (value) =>
    //     value.length < 2 ? "Name must have at least 2 letters" : null,
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
    },
  });

  const updateProfile = async (values: any) => {
    try {
        const formData = new FormData();
    
        for (const key in values) {
            if (values.hasOwnProperty(key)) {
              formData.append(key, values[key]);
            }
          }
        
    
    
        await axios.patch(UPDATEPROFILE , formData, {
          withCredentials: true,
        }).then(()=>{
          toast.success("Profile Updated");
        })
        
      } catch (error) {
        console.log(error);
        toast.warn("problem while sending the request");
      }
   
  };

  const updateProfileMutation = useMutation(updateProfile);
  const handleSubmit = (values: any) => {
    updateProfileMutation.mutate(values);
  };
  return (
    <div>
      <h1 className="text-2xl px-20 py-4">Update Profile</h1>
      <form
        onSubmit={form.onSubmit((values) => handleSubmit(values))}
        className="mx-[500px] mt-10 mb-2"
      >
        <PasswordInput
          label="Password"
          placeholder="Password"
          {...form.getInputProps("password")}
          key="password"
        />

        <PasswordInput
          mt="sm"
          label="Confirm password"
          placeholder="Confirm password"
          {...form.getInputProps("confirmPassword")}
          key="confirmPassword"
        />
        <FileInput
          placeholder="Upload Profile Image"
          label="Upload Image"
          mt="sm"
          accept="image/png,image/jpeg"
          {...form.getInputProps("file")}
          key="file"
        />
        <Group position="right" mt="md">
          <Button type="submit" className="bg-blue-500 m-auto">
            Subit form
          </Button>
        </Group>
      </form>
      <ToastContainer autoClose={2000}/>
    </div>
  );
}
