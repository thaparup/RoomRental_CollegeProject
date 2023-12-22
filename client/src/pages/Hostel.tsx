import React from "react"
import ListingCard from "../components/My Listing/ListingCard"
export default function Hostel(){
    return(
        <>
           <div className="mx-20">
      <h1 className= "text-2xl font-medium my-4">Your Hostel</h1>
      <ListingCard />
    </div>
        </>
    )
}