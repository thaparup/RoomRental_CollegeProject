import React from "react";
import {Avatar,Divider} from "@mantine/core";

export default function Comment({text,url,name}) {
  return (
    <div>
      <div className="mt-3">
        <div className="flex gap-4">
          <Avatar src={url} radius="md" size={50} />
          <div>
            <p className="text-xl self-start font-medium">
              {name}
            </p>
            <p className="text-sm font-light">{text}</p>
          </div>
        </div>
        <Divider my="sm" />
      </div>
    </div>
   
  );
}
