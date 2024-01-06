import { axiosInstance } from ".";

export const AddTheatre = async (payload) => {
    try {
        const res = await axiosInstance.post("/api/theatre/add-theatre", payload);
        return res.data;
    } catch (err) {
        return err;
    }
}
export const GetAllTheatres = async () => {
    try {
        const res = await axiosInstance.get("api/theatre/get-all-theatres");
        return res.data;
    } catch (err) {
        return err;
    }
}

export const GetAllTheatresByOwner = async (payload) => {
    try {
        const res = await axiosInstance.post("/api/theatre/get-all-theatres-by-owner", payload);
        return res.data;
    } catch (err) {
        return err;
    }
}

export const DeleteTheatre = async (theatreId) => {
    try {
        const res = await axiosInstance.delete(`/api/theatre/delete-theatre?theatreId=${theatreId}`);
        return res.data
    } catch (err) {
        return err;
    }
}

export const UpdateTheatre = async (payload) => {
    try {
        const res = await axiosInstance.put("/api/theatre/update-theatre", payload);
        return res.data;
    } catch (err) {
        return err;
    }
}


export const GetAllTheatresByMovie = async(payload) => {
    try{
        const response = await axiosInstance.post("/api/show/get-all-theatres-by-movie",payload);
        return response.data;
    }catch(err){
        return err.response;
    }
}