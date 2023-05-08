import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

import ChatMessageBox from "./ChatMessageBox/ChatMessageBox";
import { Message } from "./ChatBubble/ChatBubble";
import ChatTextBar from "./ChatTextBar/ChatTextBar";

import { useAppSelector, useAppDispatch } from "../app/hooks";
import { addNewMessage, selectMessages } from "../features/messages/messagesSlice";

const welcomeMessage: Message = {
    type: "announce",
    content: "Write something in the text box to start.",
    timeStamp: new Date().toLocaleString(),
};

const Chat: React.FC = () => {
    const dispatch = useAppDispatch();
    const messageHistory = useAppSelector(selectMessages);

    const [messages, setMessages] = useState<Message[]>([]);
    const [onRequest, setOnRequest] = useState(false);

    function handleSend(prompt: string) {
        const newMessage: Message = {
            type: "request",
            content: prompt.trim(),
            timeStamp: new Date().toLocaleString(),
        }
        dispatch(addNewMessage(newMessage));
        setMessages([...messages, newMessage]);
        console.log("Question sent:", prompt);
        setOnRequest(true);
    }

    useEffect(() => {
        if (messages.length === 0) setMessages([...messageHistory, welcomeMessage]);

        if (onRequest) {
            const startTime = Date.now();
            const newMessage: Message = {
                type: "response",
                content: "Input: " + JSON.stringify(messages.findLast(value => value.type === "request")),
                timeStamp: new Date().toLocaleString(),
                timeTaken: Date.now() - startTime,
            };
            dispatch(addNewMessage(newMessage));
            setMessages([...messages, newMessage]);
            setOnRequest(false);
        }
    }, [onRequest]);

    return (
        <Container sx={{
                height: "100%",
                width: {
                    xs: "100%",
                    md: "65%",
                },
                backgroundColor: "#393E46",
                border: 1,
                borderRadius: 5,
                borderColor: "#B2B2B2",
            }}
        >
            <Stack alignItems="center"
                justifyContent="space-between"
                sx={{
                    height: "100%",
                    paddingX: 2,
                }}
            >
                <ChatMessageBox messages={messages} />
                <ChatTextBar onSend={handleSend} onRequest={onRequest} />
            </Stack>
        </Container>
    );
};

export default Chat;