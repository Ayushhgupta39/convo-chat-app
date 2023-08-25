import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "@/config/ChatLogics";
import { ChatState } from "@/context/ChatProvider";
import { Avatar, Box, Tooltip } from "@chakra-ui/react";
import React from "react";
import ScrollableFeed from "react-scrollable-feed";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  return (
    <ScrollableFeed>
    {messages &&
        messages.map((m, i) => {
          return (
            <Box key={i} display={"flex"}>
              {(isSameSender(messages, m, i, user._id) ||
                isLastMessage(messages, i, user._id)) && (
                <Tooltip label={m.sender.name} hasArrow>
                  <Avatar
                    name={m.sender.name}
                    src={m.sender.picture}
                    cursor={"pointer"}
                    marginX={"1"}
                  />
                </Tooltip>
              )}
              <Box
                marginLeft={isSameSenderMargin(messages, m, i, user._id)}
                bgColor={m.sender._id === user._id ? "purple.600" : "white"}
                color={m.sender._id === user._id ? "white" : "black"}
                marginTop={isSameUser(messages, m, i, user._id) ? 3 : 0}
                p={"3"}
                mr={"1"}
                boxShadow={"sm"}
                borderRadius={
                  m.sender._id === user._id
                    ? "20px 0 20px 20px"
                    : "0 20px 20px 20px"
                }
              >
                {m.content}
              </Box>
            </Box>
          );
        })}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
