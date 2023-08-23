import { getSender, getSenderFull } from "@/config/ChatLogics";
import { ChatState } from "@/context/ChatProvider";
import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import ProfileModal from "./ProfileModal";
import UpdateGroupChatModal from "./UpdateGroupChatModal";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = ChatState();
  return (
    <>
      {selectedChat ? (
        <Box
          fontFamily={"Raleway"}
          height={"full"}
          width={"full"}
          display={"flex"}
          flexDirection={"column"}
        >
          <Box
            alignItems={"center"}
            bgColor={"whitesmoke"}
            borderBottom={"1px"}
            borderBottomColor={"gray.200"}
            fontSize={"2xl"}
            display={"flex"}
            p={{ base: "2", md: "3" }}
            justifyContent={"space-between"}
          >
            <Box display={{ base: "flex", md: "none" }}>
              <BsFillArrowLeftCircleFill onClick={() => setSelectedChat("")} />
            </Box>
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat.chatName}
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                />
              </>
            )}
          </Box>
        </Box>
      ) : (
        <Box
          fontFamily={"Raleway"}
          height={"full"}
          width={"full"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Text fontSize={"2xl"}>Click on a user to start chatting</Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
