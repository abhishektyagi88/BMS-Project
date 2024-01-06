import { axiosInstance } from ".";
// import axios from "axios";

export const MakePayment = async (token, amount) => {
    try {
      const response = await axiosInstance.post("/api/booking/make-payment", {
        token,
        amount,
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };

  export const BookShowTickets = async(payload) => {
    try{
        const response = await axiosInstance.post("/api/booking/book-show", payload);
        return response.data;
    }catch(err){
        return err.response.data;
    }
  }

  export const GetBookings = async() => {
    try{
      const response = await axiosInstance.get("/api/booking/get-bookings")
      return response.data;
    }catch(err){
      return err.response.data;
    }
  }
