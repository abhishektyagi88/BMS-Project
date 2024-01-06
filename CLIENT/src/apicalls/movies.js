import { axiosInstance } from ".";

export const AddMovie = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/movie/add-movie", payload);
        return response.data;
    } catch (err) {
        return err.response;
    }

}

export const GetAllMovie = async () => {
    try {
        const response = await axiosInstance.get("/api/movie/get-all-movies");
        return response.data;
    } catch (err) {
        return err.response;
    }

}

export const DeleteMovie = async (movieId) => {
    try {
        const response = await axiosInstance.delete(`/api/movie/delete-movie?movieId=${movieId}`);
        return response.data;
    } catch (err) {
        return err.response;
    }
}

export const UpdateMovie = async (payload) => {
    try {
        const response = await axiosInstance.put("/api/movie/update-movie", payload);
        return response.data;
    } catch (err) {
        return err.response;
    }
}

export const GetMovieById = async(movieId) => {
    try{
    const response = await axiosInstance.get(`api/movie/get-movie-by-id/${movieId}`)
    return response.data;
    }catch(err){
        return err.response;
    }
}


