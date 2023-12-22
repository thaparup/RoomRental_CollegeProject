import React from "react";
import { DELUSER, GETUSERS } from "../utils/ApiRoutes";
import axios from "axios";
import { useQuery } from "react-query";
import { Table } from "@mantine/core";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function SuperAdmin() {
  // const {id} = useParams()
  const getUsers = async () => {
    try {
      return await axios.get(GETUSERS, { withCredentials: true });
    } catch (error) {
      console.log(error);
    }
  };

  const { data, error, isLoading } = useQuery(["getUser"], getUsers);
    console.log(data)
  if (error) {
    return <div>Request Failed</div>;
  }
  if (isLoading) return <div>Loadiing..... </div>;
  if (data) {
    console.log(data);
  }

  const delUser = async (id) => {
    try {
      const response = await axios.delete(DELUSER + `${id}`, { withCredentials: true });
      return response;
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
  const rows = data?.data.map((element: any) => (
    <tr key={element.name}>
      <td>{element.id}</td>
      <td>{element.name}</td>
      <td>{element.email}</td>
      <td>{element.role}</td>
      <td className="flex">
        <div
          className={element.verified === false ? "falseStyleCol" : "trueStyleCol"}
        >
          {" "}
          <p
            className={element.verified === false ? "falseStyle" : "trueStyle"}
          >
            {element.verified === false ? "false" : "true"}
          </p>{" "}
        </div>{" "}
      </td>
      <td>
        <button
       
        onClick={()=>{delUser(element.id)}}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-trash-filled text-red-400"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path
              d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16z"
              stroke-width="0"
              fill="currentColor"
            ></path>
            <path
              d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z"
              stroke-width="0"
              fill="currentColor"
            ></path>
          </svg>
        </button>
      </td>
    </tr>
  ));

  return (
    <div className="mx-80 my-10">
      <h1 className="text-2xl">Users Listing</h1>
      <Table verticalSpacing="md" striped highlightOnHover withBorder mt="lg"  >
        <thead >
          <tr >
            <th>Id</th>
            <th >Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Verification</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      <ToastContainer autoClose = {2000}/>
    </div>
  );
}
