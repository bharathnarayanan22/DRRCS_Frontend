import { configureStore } from "@reduxjs/toolkit";
import requestSlice from "./requestSlice";

const store = configureStore({
    reducer: {
        request: requestSlice,
    },
});

export default store;