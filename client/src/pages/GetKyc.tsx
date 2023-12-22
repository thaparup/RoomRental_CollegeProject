import { Image } from '@mantine/core';
import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query';

export default function GetKyc() {
       const getKyc = async()=>{
        try{
            const response = await axios.get('http://localhost:3000/api/auth/kyc', {withCredentials: true})
            return response;
        }
        catch (error){
          console.log(error)
        }
       }

      const {data} = useQuery(['getKyc'], getKyc)
      if(data){
        console.log(data)
      }
  return (
    <div>
       <p>{data?.data.name}</p>
       <h1>document</h1>
        <Image src={data?.data.documentImage} width={300} height={300} />
        <h1>Profile</h1>
        <Image src={data?.data.profileImage} width={300} height={300} />
    </div>
  )
}
