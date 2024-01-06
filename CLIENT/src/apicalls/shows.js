import { axiosInstance } from ".";

export const AddShows = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/show/add-shows", payload);
            return response.data;
    } catch (err) {
        return err;
    }
}

export const GetAllShowsByTheatre = async(payload) => {
    try{
        const response = await axiosInstance.post("/api/show/get-all-shows-by-theatre", payload)
        return response.data;
    }catch(err){
        return err;
    }
}

export const DeleteShow = async(showId) => {   
    try{
        const response = await axiosInstance.delete(`/api/show/delete-shows?showId=${showId}`);
        return response.data;
    }catch(err){
        return err;
    }
}

export const GetShowById = async(payload) => {
    try{
        const response = await axiosInstance.post("/api/show/get-show-by-id",payload);
        return response.data;
    }catch(err){
        return err;
    }
}


