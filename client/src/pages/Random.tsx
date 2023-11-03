import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import { APIURL } from '../utils/Constants';
import { Image } from '@mantine/core';
import Room from './Room/Room';
import RoomReservation from '../components/RoomReservation';

export default function Random() {

   

  return (
    <div>
     <RoomReservation id={2} cost={222}/>

    </div>

  )
}
