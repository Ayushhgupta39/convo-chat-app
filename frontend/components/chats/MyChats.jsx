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

const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const toast = useToast();
  const router = useRouter();

  {console.log(user)}

  const fetchChats = async () => {
    console.log("Fetch chatss k andar: ", user);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("http://localhost:8080/chats", config);
      console.log(data);
      setChats(data);
    } catch (error) {
      console.log(error);
      toast({
        title: "An error occured.",
        description: "Check the browser console for more details",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [user]);

  return (
    <Box>
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
                backgroundColor={selectedChat === chat ? "purple.400" : "white"}
                color={selectedChat === chat ? "white" : "black"}
                width={"full"}
                alignItems={"center"}
                key={chat._id}
                cursor={"pointer"}
                p={"2"}
                fontFamily={"Raleway"}
                borderRadius={"2xl"}
                boxShadow={"md"}
                _hover={{ backgroundColor: "purple.400", color: "white" }}
              >
                <Avatar m={"1"} name="" src={chat.users[1].picture} />
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
