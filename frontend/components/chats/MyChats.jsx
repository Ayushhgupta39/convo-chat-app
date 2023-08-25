import { ChatState } from "@/context/ChatProvider";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import ChatSkeleton from "../ChatSkeleton";
import { getSender } from "@/config/ChatLogics";
import GroupChatModal from "./GroupChatModal";
import { useRouter } from "next/navigation";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const toast = useToast();
  const router = useRouter();

  {
    console.log("User in MyChats: ", user);
  }

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("http://localhost:8080/chats", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [user, fetchAgain, router]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDirection={"column"}
      fontFamily={"Raleway"}
    >
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Text fontSize={"large"} fontWeight={"bold"}>
          Chats
        </Text>
        <GroupChatModal>
          <Button
            my={"2"}
            fontSize={"xs"}
            colorScheme="telegram"
            rightIcon={<IoMdAdd />}
            size={"sm"}
            borderRadius={"2xl"}
          >
            New Group
          </Button>
        </GroupChatModal>
      </Flex>

      {chats ? (
        <VStack>
          {chats.map((chat) => {
            return (
              <Flex
                onClick={() => setSelectedChat(chat)}
                backgroundColor={selectedChat === chat ? "purple.400" : "white"}
                color={selectedChat === chat ? "white" : "black"}
                width={"full"}
                alignItems={"center"}
                key={chat._id}
                cursor={"pointer"}
                p={"2"}
                borderRadius={"2xl"}
                boxShadow={"md"}
                _hover={{ backgroundColor: "purple.400", color: "white" }}
              >
                <Avatar
                  m={"1"}
                  name={chat?.users[1]?.name}
                  src={chat?.users[1]?.picture}
                />
                <Text fontWeight={"bold"}>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
              </Flex>
            );
          })}
        </VStack>
      ) : (
        <ChatSkeleton />
      )}
    </Box>
  );
};

export default MyChats;
