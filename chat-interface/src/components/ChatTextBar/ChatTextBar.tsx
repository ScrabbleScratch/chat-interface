import { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

import { useAppSelector } from "../../app/hooks";
import { selectMessages } from "../../features/messages/messagesSlice";

import "./ChatTextBar.css";

type ChatTextBarProps = {
    onSend: (value: string) => void,
    onChange?: (value: string) => void,
    onRequest: boolean,
};

const ChatTextBar: React.FC<ChatTextBarProps> = (props) => {
    const [value, setValue] = useState("");
    const messages = useAppSelector(selectMessages);
    const elementRef = useRef<HTMLElement>();

    function HandleSend() {
        props.onSend(value);
        setValue("");
    }

    function HandleArrowUp() {
        const t_messages = [...messages].reverse();
        const lastMsg = t_messages.find(message => (message.type === "request" && typeof message.content === "string"))?.content as string;
        console.log("Last message:", lastMsg);
        if (lastMsg) setValue(lastMsg);
    }

    function HandleArrowDown() {
        setValue("");
    }

    function HandleChange(input: string) {
        props.onChange && props.onChange(input);
        setValue(input);
    }

    const onKeyPress = (k: any) => {
        // console.log("Key pressed:", k.keyCode);
        switch (k.keyCode) {
            case 13:
                HandleSend()
                break;
            case 38:
                HandleArrowUp();
                break;
            case 40:
                HandleArrowDown();
                break;
            default:
                break;
        }
    };

    function handleKeydown() {
        if (elementRef.current)
            elementRef.current.focus();
    }

    useEffect(() => {
        window.addEventListener("keydown", handleKeydown);

        return () => window.removeEventListener("keydown", handleKeydown);
    }, []);

    return (
        <Box sx={{
                width: "100%",
                paddingY: 1,
            }}
        >
            <FormControl fullWidth>
                <OutlinedInput inputRef={elementRef} className="text-input-bar"
                    autoFocus
                    fullWidth
                    placeholder="Ask something..."
                    endAdornment={
                        <Box sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <Box sx={{
                                    marginX: 1,
                                    padding: 0,
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <p className="input-counter">{value.length}</p>
                                <p className="input-counter">{value.length > 0 ? value.trim().split(" ").length : 0}</p>
                            </Box>
                            {
                                props.onRequest ?
                                    <CircularProgress size="1.5rem" />
                                :
                                    <IconButton aria-label="Send" onClick={HandleSend}>
                                        <SendOutlinedIcon />
                                    </IconButton>
                            }
                        </Box>
                    }
                    disabled={props.onRequest}
                    value={value}
                    onChange={q => HandleChange(q.target.value)}
                    onKeyUp={onKeyPress}
                    size="small"
                    sx={{
                        backgroundColor: "#697382",
                        borderRadius: 10,
                        "& .MuiOutlinedInput-notchedOutline": {
                            border: 1,
                            borderColor: "#00ADB5",
                        },
                    }}
                />
            </FormControl>
        </Box>
    );
};

export default ChatTextBar;