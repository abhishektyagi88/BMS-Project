import { createSlice } from "@reduxjs/toolkit";

const LoadersSlice = createSlice({
    name : "loaders",
    initialState : {
        loading : false,
    },
    reducers : {
        ShowLoading : (state) => {
            state.loading = true
        },
        HideLoading : (state) => {
            state.loading = false
        }
    }
})

export const {ShowLoading,HideLoading} = LoadersSlice.actions;
export default LoadersSlice.reducer; 