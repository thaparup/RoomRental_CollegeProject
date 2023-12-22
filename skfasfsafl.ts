import { APIURL } from "./Constants";

export const GETUSERS = APIURL + "auth/admin";
export const DELUSER = APIURL + "auth/admin/";
export const SIGNUP = APIURL + "auth/signup";
export const LOGIN = APIURL + "auth/login";
export const LOGOUT = APIURL + "auth/logout";
export const ME = APIURL + "auth/me";
export const HERO = APIURL + "home/hero";

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
export const DELETEIMAGEHOUSE = APIURL + "property/house/image/";

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
export const DELETEIMAGELAND = APIURL + "property/land/image/";
