import { APIURL } from "./Constants";

export const GETUSERS = APIURL + "auth/admin"; // this will get all users
export const GETUSERANDKYC = APIURL + "auth/userandkyc";
export const DELUSER = APIURL + "auth/admin/";
export const SIGNUP = APIURL + "auth/signup";
export const LOGIN = APIURL + "auth/login";
export const LOGOUT = APIURL + "auth/logout";
export const ME = APIURL + "auth/me";
export const HERO = APIURL + "home/hero";
export const ADDKYC = APIURL + "auth/kyc";
export const GETUSER = APIURL + "auth/user";
export const UPDATEPROFILE = APIURL + "auth/account/update"; // Note : password , confirmPassword and file field are required
export const GETKYC = APIURL + "auth/kyc";
export const UPDATEKYC = APIURL + "auth/updatekyc";
export const KYCDELETEBACKIMAGE = APIURL + "auth/kyc/delete/back";
export const KYCDELETEFRONTIMAGE = APIURL + "auth/kyc/delete/front";

// ***************************** ROOM ******************************************

export const GETMYROOM = APIURL + "property/room/my";
export const GETMYROOMBYID = APIURL + "property/room/my/";
export const GETROOMBYID = APIURL + "property/room/";
export const ADDROOM = APIURL + "property/room";
export const GETIMAGESROOM = APIURL + "property/room/images/";
export const GETALLROOM = APIURL + "property/room";
export const GETSINGLEIMAGEFORROOM = APIURL + "property/room/image";
export const DELETEROOM = APIURL + "property/room/";
export const UPDATEROOM = APIURL + "property/room/";
export const DELETEIMAGEROOM = APIURL + "property/room/image/";
export const CREATEIMAGESROOM = APIURL + "property/room/image/create/";
export const ROOMRESERVATION = APIURL + "property/room/reservation/";
export const GETROOMRESERVATION = APIURL + "property/room/reservation/";
export const GETCOMMENTS = APIURL + "property/room/comment/get/";
export const BOOKROOM = APIURL + "property/room/book/";
// ***************************** House ******************************************

export const GETMYHOUSE = APIURL + "property/house/my";
export const GETMYHOUSEBYID = APIURL + "property/house/my/";
export const GETHOUSEBYID = APIURL + "property/house/";
export const ADDHOUSE = APIURL + "property/house";
export const GETIMAGESHOUSE = APIURL + "property/house/images/";
export const GETALLHOUSE = APIURL + "property/house";
export const GETSINGLEIMAGEFORHOUSE = APIURL + "property/house/image";
export const DELETEHOUSE = APIURL + "property/house/";
export const UPDATEHOUSE = APIURL + "property/house/";
export const DELETEIMAGEHOUSE = APIURL + "property/house/images/";
export const CREATEIMAGESHOUSE = APIURL + "property/house/image/create/";
export const BOOKHOUSE = APIURL + "property/house/book/";
export const WRITECOMMENT = APIURL + "property/room/comment/";

// ***************************** Land ******************************************

export const GETMYLAND = APIURL + "property/land/my";
export const GETMYLANDBYID = APIURL + "property/land/my/";
export const GETLANDBYID = APIURL + "property/land/";
export const ADDLAND = APIURL + "property/land";
export const GETIMAGESLAND = APIURL + "property/land/images/";
export const GETALLLAND = APIURL + "property/land";
export const GETSINGLEIMAGEFORLAND = APIURL + "property/land/image";
export const DELETELAND = APIURL + "property/land/";
export const UPDATELAND = APIURL + "property/land/";
export const DELETEIMAGELAND = APIURL + "property/land/images/";
export const CREATEIMAGESLAND = APIURL + "property/land/image/create/";

// ***************************** Message ******************************************

export const BETWEENTWO = APIURL + "property/betweentwo/";
export const SENDMESSAGE = APIURL + "property/text/";
export const VIEWALLMESSAGES = APIURL + "property/view";
