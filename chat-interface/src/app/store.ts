import { configureStore } from "@reduxjs/toolkit";
import messagesReducer from "../features/messages/messagesSlice";

const store = configureStore({
    reducer: {
        messages: messagesReducer,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;