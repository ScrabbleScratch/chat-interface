import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

import { Message } from "../../components/ChatBubble/ChatBubble";

type MessagesState = {
    value: Message[],
};

const initialState: MessagesState = {
    value: [],
};

export const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        clearMessages: (state) => {
            state.value = [];
        },
        setMessages: (state, action: PayloadAction<Message[]>) => {
            state.value = action.payload;
        },
        addNewMessage: (state, action: PayloadAction<Message>) => {
            state.value.push(action.payload);
        },
        addNewMessages: (state, action: PayloadAction<Message[]>) => {
            state.value = state.value.concat(action.payload);
        },
    },
});

export const { clearMessages, setMessages, addNewMessage, addNewMessages } = messagesSlice.actions;
export const selectMessages = (state: RootState) => state.messages.value;
export default messagesSlice.reducer;