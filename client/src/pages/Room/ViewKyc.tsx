import { Button, Flex, Grid, Image, Text, rem } from "@mantine/core";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { GETKYC } from "../../utils/ApiRoutes";
import { AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";

export default function ViewKyc() {
  async function getKyc() {
    let response = await axios.get(GETKYC, {
      headers: {
        // Cookie: myTok
      },
      withCredentials: true,
    });
    return response;
  }
  const { data: kyc } = useQuery(["getKyc"], getKyc);
  console.log(kyc);

  return (
    <div className="mx-20 my-3 ">
       <Flex justify="space-between">

      <h1 className="text-xl font-medium">Your Kyc Detail</h1>
      <Button
          component="a"
          rel="noopener noreferrer"
          href="/kyc/edit"
          className="bg-[#00acee] self-center mr-10"
          styles={(theme) => ({
            root: {
              border: 0,
              height: rem(42),
              paddingLeft: rem(20),
              paddingRight: rem(20),
              "&:not([data-disabled])": theme.fn.hover({
                backgroundColor: theme.fn.darken("#00acee", 0.05),
              }),
            },

            leftIcon: {
              marginRight: theme.spacing.md,
            },
          })}
        >
          <Flex gap={6}>
                 <AiOutlineEdit size={20}/>
            <Text className="font-medium">Edit Kyc</Text>
          </Flex>
        </Button>
       </Flex>
      <div className=" mx-40  px-2 py-12 ">
        
        <table className="table-auto border-solid border-[1px] border-black px-3 py-2 ">
       
          <tbody>
            <tr className="border-solid border-[1px] border-black ">
              <td className=" min-w-[500px] py-2 px-2"> <p> Name</p></td>
              <td className="min-w-[500px]">{kyc?.data.name}</td>
              
            </tr>
            <tr className="border-solid border-[1px] border-black ">
              <td className=" min-w-[500px] py-2 px-2"> <p> Gender</p></td>
              <td className="min-w-[500px]">{kyc?.data.gender}</td>
              
            </tr>
            <tr className="border-solid border-[1px] border-black ">
              <td className=" min-w-[500px] py-2 px-2"> <p> Date Of Birth</p></td>
              <td className="min-w-[500px]">{kyc?.data.dob}</td>
              
            </tr>
            
            <tr className="border-solid border-[1px] border-black ">
              <td className=" min-w-[500px] py-2 px-2"> <p> Father/Husband's Name </p></td>
              <td className="min-w-[500px]">{kyc?.data.fatherName_husbandName}</td>
              
            </tr>
            <tr className="border-solid border-[1px] border-black ">
              <td className=" min-w-[500px] py-2 px-2"> <p> Spouse Name </p></td>
              <td className="min-w-[500px]">{kyc?.data.spouseName}</td>
              
            </tr>
            <tr className="border-solid border-[1px] border-black ">
              <td className=" min-w-[500px] py-2 px-2"> <p> GrandFather/FatherInLaw's Name </p></td>
              <td className="min-w-[500px]">{kyc?.data.grandFather_fatherInLaw}</td>
              
            </tr>
            <tr className="border-solid border-[1px] border-black ">
              <td className=" min-w-[500px] py-2 px-2"> <p> Occupation </p></td>
              <td className="min-w-[500px]">{kyc?.data.occupation}</td>
              
            </tr>
            <tr className="border-solid border-[1px] border-black ">
              <td className=" min-w-[500px] py-2 px-2"> <p> Pan Number </p></td>
              <td className="min-w-[500px]">{kyc?.data.panNumber}</td>
              
            </tr>
            <tr className="border-solid border-[1px] border-black ">
              <td className=" min-w-[500px] py-2 px-2"> <p> Landline Number </p></td>
              <td className="min-w-[500px]">{kyc?.data.landlineNumber}</td>
              
            </tr>
            <tr className="border-solid border-[1px] border-black ">
              <td className=" min-w-[500px] py-2 px-2"> <p> Province</p></td>
              <td className="min-w-[500px]">{kyc?.data.province}</td>
              
            </tr>
            <tr className="border-solid border-[1px] border-black ">
              <td className=" min-w-[500px] py-2 px-2"> <p> District</p></td>
              <td className="min-w-[500px]">{kyc?.data.district}</td>
              
            </tr>
            <tr className="border-solid border-[1px] border-black ">
              <td className=" min-w-[500px] py-2 px-2"> <p> Mobile Number</p></td>
              <td className="min-w-[500px]">{kyc?.data.mobileNumber}</td>
              
            </tr>
            <tr className="border-solid border-[1px] border-black ">
              <td className=" min-w-[500px] py-2 px-2"> <p> City</p></td>
              <td className="min-w-[500px]">{kyc?.data.city}</td>
              
            </tr>
            <tr className="border-solid border-[1px] border-black ">
              <td className=" min-w-[500px] py-2 px-2"> <p> Permanent Address</p></td>
              <td className="min-w-[500px]">{kyc?.data.permanentAddress}</td>
              
            </tr>
            <tr className="border-solid border-[1px] border-black ">
              <td className=" min-w-[500px] py-2 px-2"> <p> Temporary Address</p></td>
              <td className="min-w-[500px]">{kyc?.data.temporaryAddress}</td>
              
            </tr>
            <tr className="border-solid border-[1px] border-black ">
              <td className=" min-w-[500px] py-2 px-2"> <p> Citizenship Image</p></td>
              <td className="min-w-[500px]"><Image src={kyc?.data.profileImage}/></td>
              
            </tr>
            <tr className="border-solid border-[1px] border-black ">
            <td className=" min-w-[500px] py-2 px-2"> <p> </p></td>
              
              <td className="min-w-[500px]"><Image src={kyc?.data.documentImage}/></td>
              
            </tr>
            
          </tbody>
        </table>

      </div>
    </div>
  );
}
