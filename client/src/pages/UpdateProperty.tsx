import { Button, TextInput } from "@mantine/core";
import { useState } from "react";

export default function UpdateProperty(){
    const [value, setValue] = useState('');
return (
    <div className="mx-20">
    <h1 className= "text-2xl font-medium my-4">Update Property</h1>
       <h1>Carousle</h1>
        <Button className="text-white bg-red-500" >Delete image</Button>
        <Button className="bg-green-500">Select image</Button>

         <div className="max-w-2xl mt-4">
         <label htmlFor="">Title</label>
        <TextInput value={value} onChange={(event) => setValue(event.currentTarget.value)} placeholder="Title" />
         </div>


  </div>
)
}