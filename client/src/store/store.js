import codeSlice from "./codeSlice";
import userSlice from "./userSlice";
import { configureStore } from "@reduxjs/toolkit";


const store = configureStore({
    reducer : {
        user: userSlice.reducer,
        code: codeSlice.reducer
    }
})

export default store