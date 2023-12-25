import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Group,
  Button,
  Stack,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { isEmail, useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { PostQuery } from "../../utils/ApiCall";
import { LOGIN } from "../../utils/ApiRoutes";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import { error } from "console";
import { Notifications, notifications } from '@mantine/notifications';

const handleLoginPost = async (data: any) => {
  return (await PostQuery(LOGIN, data))?.data;
};

export function Login() {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      // terms: true,
    },

    validate: {
      email: isEmail("Invalid email"),

      // password: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid password"),
    },
  });

  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation(handleLoginPost);
  const handleLogin = (data: any) => {
    mutate(data, {
      onSuccess: async (data) => {
        Cookies.set("token", data.access_token);
        // const {data:user}= await FetchQuery(ME);
        // console.log(data.access_token);

        if (data) {
          navigate("/");
        }
      },
      onError: async (error: any) => {
        if (error.response.data.message) {
          // toast.warn(error.response.data.message)
          notifications.show({
            title: 'Default notification',
            message: error.response.data.message + ' 🤥',
            color: 'red',
            autoClose: 2000,

          })
        }
      },
    });
  };

  return (
    <>
      <Paper withBorder shadow="md" p={30} radius="md" my="10px">
        <form
          onSubmit={form.onSubmit((values) => {
            handleLogin(values);
          })}
        >
          <Stack>
            <TextInput
              label="Email"
              placeholder="Enter Email"
              {...form.getInputProps("email")}
            />
            <PasswordInput
              label="Password"
              placeholder="Enter Password"
              {...form.getInputProps("password")}
            />

            <Group position="apart">
              <Checkbox label="Remember me" />
              <Anchor component="button" size="sm">
                <Link to="/auth/forgot-password">Forgot password?</Link>
              </Anchor>
            </Group>
            <Button
              loading={isLoading}
              type="submit"
              fullWidth
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm"
            >
              Sign in
            </Button>
          </Stack>
        </form>
        <ToastContainer autoClose={3000} />

      </Paper>
    </>
  );
}
