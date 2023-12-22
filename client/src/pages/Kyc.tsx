import {
  Button,
  FileButton,
  FileInput,
  Flex,
  Grid,
  Group,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
import { ADDKYC, GETKYC, GETUSER } from "../utils/ApiRoutes";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { AiOutlineDownload } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import { DateInput } from "@mantine/dates";
import * as locales from 'react-date-range/dist/locale';
import { Calendar } from "react-date-range";

export default function kyc() {
  const [profile, setProfile] = useState<File | null>(null);
  const [citizenship, setCitizenship] = useState<File | null>(null);
  const [dob, setDob] = useState(null);


  

  const toastId = React.useRef(null);

  const formSubmitting = () =>
    (toastId.current = toast.success("Form is submitting...", {
      type: toast.TYPE.SUCCESS,
      autoClose: false,
    }));

  const formSubmitted = () =>
    toast.update(toastId.current, {
      render: () => <div>Kyc created!</div>,
      type: toast.TYPE.SUCCESS,
      autoClose: 2000,
    });



  const [value, setValue] = useState<Date | null>(null);

  const addKyc = async (values: any) => {
    try {
      const formData = new FormData();

      const filesArray: { field: string; file: File }[] = []; // Create a new array to store the files

      if (values.profile && values.citizenship) {
        filesArray.push({ field: "citizenship", file: values.citizenship });
        filesArray.push({ field: "profile", file: values.profile });
      }

      const mergedFilesArray = [...(values.files || []), ...filesArray];

      for (const key in values) {
        if (values.hasOwnProperty(key)) {
          if (key === "profile" || key === "citizenship") {
            // Skip appending the 'profile' and 'citizenship' properties as they are already included in the 'files' array
            continue;
          }

          formData.append(key, values[key]);
        }
      }
      for (const fileObject of mergedFilesArray) {
        formData.append("files", fileObject.file);
      }

     

      await axios
        .post(ADDKYC, formData, { withCredentials: true })
        .then(() => formSubmitted());
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        // Display the error message from the server using toast.error()
        toast.error(error.response.data.message);
      } else {
        // Handle other types of errors (e.g., network errors)
        toast.error('An error occurred');
      }
    }
  };

  const form = useForm({
    initialValues: {
      name: "",
      gender: "",
      dob: "",
      fatherName_husbandName: "",
      grandFather_fatherInLaw: "",
      spouseName: "",
      occupation: "",
      panNumber: "",
      landlineNumber: "",
      province: "",
      district: "",
      mobileNumber: "",
      city: "",
      permanentAddress: "",
      temporaryAddress: "",
      files: [],
    },
  });

  return (
    <div className="px-36 py-0">
      <form
        onSubmit={form.onSubmit((values) => {
          addKyc(values);
        })}
      >
        <h1 className="text-2xl font-medium py-4 ">Fill in Kyc Form</h1>
        <Grid gutterXl={50}>
          <Grid.Col span={4}>
            <TextInput
              label="Name"
              placeholder="Name"
              name="name"
              {...form.getInputProps("name")}
              key="name"
              className=" flex-grow"
              withAsterisk
              
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Select
              label="Gender"
              placeholder="Pick your gender"
              name="gender"
              data={[
                { value: "MALE", label: "Male" },
                { value: "FEMALE", label: "Female" },
              ]}
              {...form.getInputProps("gender")}
              key="gender"
              className="flex-grow"
              withAsterisk
            />
          </Grid.Col>
          <Grid.Col span={4}>
            {/* <DateInput
            
              
              label="Date input"
              placeholder="Date input"
              maw={400}
              mx="auto"
              {...form.getInputProps("dob")}
              key ="dob"
            /> */}
                   <DateInput
      valueFormat="YYYY MMM DD"
      label="Date Of Birth"
      placeholder="Date Of Birth"
      maw={400}
      mx="auto"
      {...form.getInputProps("dob")}
              key ="dob"
    />

          </Grid.Col>
        </Grid>
        <Grid gutterXl={50}>
          <Grid.Col span={4}>
            <TextInput
              label="Father/Husband's Name"
              placeholder="Any one"
              name="fatherName_husbandName"
              {...form.getInputProps("fatherName_husbandName")}
              key="fatherName_husbandName"
              className="flex-grow"
              withAsterisk
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <TextInput
              label="SpouseName: (Optional)"
              placeholder="Spouse Name"
              name="spouseName"
              {...form.getInputProps("spouseName")}
              key="spouseName"
              className="flex-grow"
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <TextInput
              label="GrandFather/FatherInLaw's Name"
              placeholder="Any one"
              name="grandFather_fatherInLaw"
              {...form.getInputProps("grandFather_fatherInLaw")}
              key="grandFather_fatherInLaw"
              className="flex-grow"
              withAsterisk
            />
          </Grid.Col>
        </Grid>

        <Grid gutterXl={50}>
          <Grid.Col span={4}>
            <TextInput
              label="Occupation"
              placeholder="Ex: Teacher"
              name="occupation"
              {...form.getInputProps("occupation")}
              key="occupation"
              className="flex-grow"
              withAsterisk
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <TextInput
              label="PAN Number:(Optional)"
              placeholder="Pan Number"
              name="panNumber"
              {...form.getInputProps("panNumber")}
              key="panNumber"
              className=" flex-grow"
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <TextInput
              label="Landline Number: (Optional)"
              placeholder="Landline No."
              name="landlineNumber"
              {...form.getInputProps("landlineNumber")}
              key="landlineNumber"
              className="flex-grow"
            />
          </Grid.Col>
        </Grid>

        <Grid gutterXl={50}>
          <Grid.Col span={4}>
            <Select
              label="Province"
              placeholder="Pick one"
              name="province"
              data={[
                { value: "Province_1", label: "Province 1" },
                { value: "Province_2", label: "Province 2" },
                { value: "Province_3", label: "Province 3" },
                { value: "Province_4", label: "Province 4" },
                { value: "Province_5", label: "Province 5" },
                { value: "Province_6", label: "Province 6" },
                { value: "Province_7", label: "Province 7" },
              ]}
              {...form.getInputProps("province")}
              key="province"
              className=" flex-grow"
              withAsterisk
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <TextInput
              label="District"
              placeholder="Ex: Kaski"
              name="district"
              {...form.getInputProps("district")}
              key="district"
              className="flex-grow"
              withAsterisk
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <TextInput
              label="Mobile Number"
              placeholder="mobileNumber"
              name="mobileNumber"
              {...form.getInputProps("mobileNumber")}
              key="mobileNumber"
              className=" flex-grow"
              withAsterisk
            />
          </Grid.Col>
        </Grid>

        <Grid gutterXl={50}>
          <Grid.Col span={4}>
            <TextInput
              label="City"
              placeholder="city"
              name="city"
              {...form.getInputProps("city")}
              key="city"
              className="flex-grow"
              withAsterisk
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <TextInput
              label="Permanent Address"
              placeholder="permanentAddress"
              name="permanentAddress"
              {...form.getInputProps("permanentAddress")}
              key="permanentAddress"
              className="flex-grow"
              withAsterisk
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <TextInput
              label="Temporary Address"
              placeholder="temporaryAddress"
              name="temporaryAddress"
              {...form.getInputProps("temporaryAddress")}
              key="temporaryAddress"
              className=" flex-grow"
              withAsterisk
            />
          </Grid.Col>
        </Grid>
        <Grid gutterXl={50}>
          <Grid.Col span={4}>
          <FileInput
            {...form.getInputProps("profile")}
            name="profile"
            key="profile"
            label="Citizenship/Passport's Front Image"
            icon={<AiOutlineDownload size={22} />}
            placeholder="Select"
            className="min-w-[30%]"
            withAsterisk
          />


          </Grid.Col>
          <Grid.Col span={4}>
          <FileInput
            {...form.getInputProps("citizenship")}
            name="citizenship"
            key="citizenship"
            label="Citizenship /Passport's Back Image"
            icon={<AiOutlineDownload size={22} />}
            className="min-w-[30%]"
            withAsterisk
          />
          </Grid.Col>
          <Grid.Col span={4}></Grid.Col>
        </Grid>

        <div className="flex py-4">
          <Button
            className="bg-primary m-auto px-8"
            onClick={() => {
              formSubmitting();
            }}
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
