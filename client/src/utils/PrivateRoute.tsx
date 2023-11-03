import { Outlet , Navigate, } from "react-router-dom";
import Cookies from "js-cookie";

  const PrivateRoute = () => {
  // let auth = { token: false }
     const authToken = Cookies.get("token")
  
  return(
    authToken? <Outlet/>:<Navigate to='/auth'/>
  )
};
export default PrivateRoute;
