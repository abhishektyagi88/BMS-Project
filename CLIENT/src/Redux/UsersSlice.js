import {createSlice} from '@reduxjs/toolkit';

const UsersSlice = createSlice({
    name : "users",
    initialState : {
        user : null
    },
    reducers : {
        SetUser : (state,action) =>{
            state.user = action.payload;
        }
    }
});

export const {SetUser} = UsersSlice.actions;
export default UsersSlice.reducer;