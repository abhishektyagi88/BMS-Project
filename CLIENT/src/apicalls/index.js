// import axios from "axios";


// export const axiosInstance = axios.create({ // config the axios instance 
//     baseURL : "http://localhost:3001",
//     headers : {
//         withCredentials : true,
//         'content-type' : 'application/json',
//         // Authorization : `Bearer ${localStorage.getItem("token")}`,  // Bearer is scheme the client is the bearer.. this is used for authentication and authorization
//     }
// });


import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    withCredentials: true,
    'Content-Type': 'application/json',
    authorization: `Bearer ${localStorage.getItem('token')}`
  }
});