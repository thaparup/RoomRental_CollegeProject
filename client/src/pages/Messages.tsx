import React, { useState } from "react";
import { VIEWALLMESSAGES } from "../utils/ApiRoutes";
import axios from "axios";
import { useQuery } from "react-query";

export default function Messages() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      message: "Hello My name is Harry Potter",
      senderId: 2,
      receiverId: 3,
      senderName: "Harry Potter",
      receiverName: "Peter Parker",
      createdAt: "2023-09-10T07:13:01.023Z",
    },
    {
      id: 2,
      message: "Peter, do you want meet me ",
      senderId: 2,
      receiverId: 3,
      senderName: "Harry Potter",
      receiverName: "Peter Parker",
      createdAt: "2023-09-10T07:13:22.748Z",
    },
    {
      id: 3,
      message: "Hello , my name is subash archarya",
      senderId: 4,
      receiverId: 3,
      senderName: "Subash Archary",
      receiverName: "Peter Parker",
      createdAt: "2023-09-10T07:16:23.435Z",
    },
    {
      id: 4,
      message: "can we meet tomorrow",
      senderId: 4,
      receiverId: 3,
      senderName: "Subash Archary",
      receiverName: "Peter Parker",
      createdAt: "2023-09-10T07:16:39.644Z",
    },
    {
      id: 7,
      message: "Hello , my name is Peter Parker",
      senderId: 3,
      receiverId: 2,
      senderName: "Peter Parker",
      receiverName: "Harry Potter",
      createdAt: "2023-09-10T07:22:51.737Z",
    },
    {
      id: 8,
      message: "Yes we can meet tommorrow",
      senderId: 3,
      receiverId: 2,
      senderName: "Peter Parker",
      receiverName: "Harry Potter",
      createdAt: "2023-09-10T07:23:07.021Z",
    },
  ]);
  async function getAllMessages() {
    let response = await axios.get(VIEWALLMESSAGES , {
      headers: {
        // Cookie: myTok
      },
      withCredentials: true,
    });
    return response;
  }

  const { data: chatData } = useQuery(["getRoom"], getAllMessages);
  console.log(chatData)
     let currentUser =3
  return (
    <div>
      {/* <div className="bg-gray-100 h-screen flex flex-col">
        <div className="flex-grow overflow-y-auto p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-2 p-2 max-w-md mx-2 rounded-lg ${
                message.senderId === currentUser
                  ? "bg-blue-500 text-white self-end"
                  : "bg-gray-200"
              }`}
            >
              <div className="font-semibold">{message.senderName}</div>
              <div>{message.message}</div>
            </div>
          ))}
        </div>
        <div className="p-4 bg-white flex">
          <input
            type="text"
            className="flex-grow p-2 rounded-full border outline-none"
            placeholder="Type a message..."
          />
          <button className="ml-2 bg-blue-500 text-white p-2 rounded-full">
            Send
          </button>
        </div>
      </div> */}
      <div className="max-w-screen-md mx-auto p-4">
        <div className="bg-white shadow-md p-4 rounded-lg">
          <p className="text-center">Your Chat with </p>
          <ul className="space-y-2 ">
            {/* {chatData?.data.all.map((message, index) => (
              <div>
                {chatData?.data.senderId  === chatData?.data.currentUser.receiverId ? (
                  <div className=" flex justify-end">
                    <div className="bg-blue-500 text-white  max-w-[200px] min-w-[200px] p-2 rounded-lg ">
                      {message.message}
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-200 text-gray-700  max-w-[200px] p-2 rounded-lg min-w-[200px] ">
                    <div className="font-semibold">{messsage.senderName}</div>

                    <div className="">
                      {message.message}
                    </div>
                  </div>
                )}
              </div>
            ))} */}

{chatData?.data.all.map((message, index) => (
  <div key={index}>
    {message.senderId === chatData?.data.currentUser.receiverId ? (
      <div className="flex justify-end">
        <div className="bg-blue-500 text-white max-w-[200px] min-w-[200px] p-2 rounded-lg">
          {message.message}
        </div>
      </div>
    ) : (
      <div className="bg-gray-200 text-gray-700 max-w-[200px] p-2 rounded-lg min-w-[200px]">
        <div className="font-semibold">{message.senderName}</div>
        <div className="">{message.message}</div>
      </div>
    )}
  </div>
))}

{/* 
{chatData?.data.all.map((message, index) => (
        <div key={index}>
          {message.senderId === chatData?.data.currentUser.id ? (
            <div className=" flex justify-end">
              <div className="bg-blue-500 text-white max-w-[200px] min-w-[200px] p-2 rounded-lg ">
                {message.message}
              </div>
            </div>
          ) : (
            <div className="bg-gray-200 text-gray-700 max-w-[200px] p-2 rounded-lg min-w-[200px] ">
              <div className="font-semibold">{message.senderName}</div>
              <div className="">{message.message}</div>
            </div>
          )}
        </div>
      ))}
             */}
          </ul>
        </div>
      </div>
    </div>
  );
}
