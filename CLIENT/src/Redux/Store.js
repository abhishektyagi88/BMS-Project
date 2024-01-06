import { configureStore } from "@reduxjs/toolkit";

import UsersSlice from "./UsersSlice";
import LoadersSlice from "./LoadersSlice";

const store = configureStore({
    reducer : {                 
        users : UsersSlice,
        loaders : LoadersSlice
    }
})

export default store;