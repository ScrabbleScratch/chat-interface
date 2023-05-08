import List from "@mui/material/List";
import ChatBubble, { Message } from "../ChatBubble/ChatBubble";

import "./ChatMessageBox.css"

type ChatMessageBoxProps = {
    messages: Message[],
};

const ChatMessageBox: React.FC<ChatMessageBoxProps> = (props) => {
    const messages = [...props.messages].reverse();
    return (
        <List className="list"
            sx={{
                height: "100%",
                width: "100%",
                marginY: 0.5,
                overflow: "auto",
            }}
        >
            {/* {messages.map((message, index) => <ChatBubble key={index} message={message} typewriter={index === 0 && message.type === "response"}/>)} */}
            {messages.map((message, index) => <ChatBubble key={index} message={message} />)}
        </List>
    );
};

export default ChatMessageBox;