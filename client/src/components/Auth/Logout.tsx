import axios from 'axios'
import React from 'react'
import { LOGOUT } from '../../utils/ApiRoutes'
import { useMutation } from 'react-query';

export default function Logout() {
   
    
  return (
    <>
     <button onClick={handleLogout} type='submit'>logout</button>
    </>
  )
}
