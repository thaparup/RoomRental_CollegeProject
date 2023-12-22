import { TopHeader } from "./Navbar/TopHeader"
export default function Layout({children}){
    return(
        <div className=" h-screen ">
        

         {/* <TopHeader /> */}
          <div className="h-full">
          {children}
            </div>

        </div>


    )
}