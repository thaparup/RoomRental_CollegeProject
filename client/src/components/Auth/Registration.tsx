import {
  TextInput,
  PasswordInput,
  Paper,
  Group,
  Button,
  Checkbox,
} from "@mantine/core";
import axios from "axios";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { SIGNUP } from "../../utils/ApiRoutes";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";

export function Registration() {
  async function userSignUp(data: any) {
    try {
      await axios.post(SIGNUP, data, { withCredentials: true }).then(() => {});
    } catch (error) {
      toast.warn("Error occured while submitting");
      console.log(error);
    }
  }
  const { mutate } = useMutation(userSignUp);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(70, "Too Long!")
      .required("Required")
      .matches(/^[A-Za-z\s]*$/, "Name can only contain alphabets"),
    lastName: Yup.string()
      .min(3, "Too Short!")
      .max(70, "Too Long!")
      .required("Required")
      .matches(/^[A-Za-z\s]*$/, "Name can only contain alphabets"),

    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "Password must be 8 characters long")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires an uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password doesnot match")
      .required("Required"),
  });

  return (
    <>
      <Paper withBorder shadow="md" p={30} radius="md" mt="md">
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={RegisterSchema}
          onSubmit={(values) =>
            mutate(
              {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                password: values.password,
                confirmPassword: values.confirmPassword,
              },
              {
                onSuccess(data, variables, context) {
                  toast.success("Your account has been created");
                },
              }
            )
          }
        >
          {(props) => (
            <Form>
              <TextInput
                name="firstName"
                label="First Name"
                placeholder="Enter First Name"
                withAsterisk
                value={props.values.firstName}
                onChange={props.handleChange}
              />
              {props.touched.firstName && props.errors.firstName ? (
                <div className=" text-sm text-red-500 translate-y-[-10px]">
                  {props.errors.firstName}
                </div>
              ) : null}
              <TextInput
                label="Last Name"
                placeholder="Enter Last Name"
                withAsterisk
                value={props.values.lastName}
                onChange={props.handleChange}
                name="lastName"
                mt={5}
              />
              {props.touched.lastName && props.errors.lastName ? (
                <div className=" text-sm text-red-500 translate-y-[-10px]">
                  {props.errors.lastName}
                </div>
              ) : null}
              <TextInput
                label="Email"
                placeholder="Enter Email"
                withAsterisk
                value={props.values.email}
                onChange={props.handleChange}
                name="email"
                mt={5}
              />
              {props.touched.email && props.errors.email ? (
                <div className=" text-sm text-red-500 translate-y-[-10px]">
                  {props.errors.email}
                </div>
              ) : null}
              <PasswordInput
                label="Password"
                placeholder="Enter Password"
                withAsterisk
                value={props.values.password}
                onChange={props.handleChange}
                name="password"
                mt={5}
              />
              {props.touched.password && props.errors.password ? (
                <div className=" text-sm text-red-500 translate-y-[-10px]">
                  {props.errors.password}
                </div>
              ) : null}
              <PasswordInput
                label="Confirm Password"
                placeholder="Enter Password Again"
                withAsterisk
                value={props.values.confirmPassword}
                onChange={props.handleChange}
                name="confirmPassword"
                mt={5}
              />
              {props.touched.confirmPassword && props.errors.confirmPassword ? (
                <div className=" text-sm text-red-500 translate-y-[-10px]">
                  {props.errors.confirmPassword}
                </div>
              ) : null}
              <Group mt={5}>
                <Checkbox
                // checked={form.values.terms}
                />
                <Link to="/">I accept terms and conditions</Link>
              </Group>

              <Button
                // loading={isLoading}
                type="submit"
                fullWidth
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm"
                mt={6}
              >
                Sign up
              </Button>
            </Form>
          )}
        </Formik>
      <ToastContainer />
      </Paper>
    </>
  );
}
