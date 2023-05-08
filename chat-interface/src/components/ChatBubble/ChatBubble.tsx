import Box from "@mui/material/Box";
import { SxProps } from "@mui/material/styles";
import Typewriter from "typewriter-effect";

import "./ChatBubble.css";

type MessageType = "announce"|"request"|"response";

type Message = {
    type: MessageType,
    content: string,
    timeStamp: string,
    timeTaken?: number,
    containsHtml?: boolean,
};

type MessageStylesheet = {
    [key: string]: {
        listItem: SxProps,
        box: SxProps,
        time?: SxProps|undefined,
    },
};

const messageStyles: MessageStylesheet = {
    "announce": {
        listItem: {
            justifyContent: "center",
        },
        box: {
            textAlign: "center",
            alignSelf: "center",
            backgroundColor: "#B2B2B2",
            border: 2.5,
            borderRadius: 5,
            borderColor: "#434242",
            color: "#434242",
            fontSize: "1.2rem",
        },
    },
    "request": {
        listItem: {
            justifyContent: "flex-end",
        },
        box: {
            alignSelf: "end",
            backgroundColor: "#F3EFE0",
            borderRadius: 5,
            color: "#222831",
            fontSize: "0.8rem",
        },
        time: {
            alignSelf: "end",
        },
    },
    "response": {
        listItem: {
            justifyContent: "flex-start",
        },
        box: {
            alignSelf: "start",
            backgroundColor: "#22A39F",
            borderRadius: 5,
            color: "#F3EFE0",
            fontSize: "0.8rem",
        },
        time: {
            alignSelf: "start",
        },
    },
};

type ChatBubbleProps = {
    message: Message,
    typewriter?: boolean,
};

const ChatBubble: React.FC<ChatBubbleProps> = (props) => {
    const message = props.message;
    return (
        <Box sx={{
                paddingY: 0.5,
                display: "flex",
                flexDirection: "column",
                ...messageStyles[message.type].listItem
            }}
        >
            <Box sx={{
                    marginY: 0.5,
                    paddingX: 2,
                    paddingY: 1,
                    maxWidth: "75%",
                    ...messageStyles[message.type].box
                }}
            >
                {props.message.containsHtml ? (
                    <p className="message-bubble" dangerouslySetInnerHTML={{ __html: message.content }}></p>
                ) : props.typewriter ? (
                    <Typewriter
                        options={{
                            strings: message.content,
                            autoStart: true,
                            loop: false,
                            cursor: "",
                            delay: 1,
                        }}
                    />
                ) : (
                    <p className="message-bubble">{message.content}</p>
                )}
            </Box>
            {message.type !== "announce" && (
                <Box sx={{
                        color: "#F0EEED",
                        fontSize: "0.6rem",
                        ...messageStyles[message.type].time
                    }}
                >
                    <p className="message-time">{message.timeStamp}{message.timeTaken !== undefined && (" - " + message.timeTaken/1000 + "s")}</p>
                </Box>
            )}
        </Box>
    );
};

export default ChatBubble;
export type { MessageType, Message };