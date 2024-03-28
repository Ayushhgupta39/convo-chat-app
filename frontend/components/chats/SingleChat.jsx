import { getSender, getSenderFull } from "@/config/ChatLogics";
import { ChatState } from "@/context/ChatProvider";
import {
  Box,
  Flex,
  FormControl,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import ProfileModal from "./ProfileModal";
import UpdateGroupChatModal from "./UpdateGroupChatModal";
import axios from "axios";
import ScrollableChat from "./ScrollableChat";
import { io } from "socket.io-client";
import Lottie from "react-lottie";
import * as animationData from "@/public/assets/animation/typing.json"

const ENDPOINT = "http://localhost:8080/";
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat, notifications, setNotifications } = ChatState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();
  const [socketConnected, setSocketConnected] = useState(false);
  const toast = useToast();
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const lottieOptions = {
    loop: true,
    autoPlay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    if (user) {
      socket = io(ENDPOINT);
      socket.emit("setup", user);
      socket.on("connected", () => setSocketConnected(true));

      socket.on("typing", () => setIsTyping(true));
      socket.on("stop typing", () => setIsTyping(false));

      socket.on("message received", (newMessageRecieved) => {
        if (
          !selectedChatCompare || // if chat is not selected or doesn't match current chat
          selectedChatCompare._id !== newMessageRecieved.chat._id
        ) {
          if (!notifications.includes(newMessageRecieved)) {
            setNotifications([newMessageRecieved, ...notifications])
            setFetchAgain(!fetchAgain);
          }
        } else {
          setMessages([...messages, newMessageRecieved]);
        }
      });
    }
  }, [user, messages]);

  const fetchMessages = async () => {
    if (!selectedChat) {
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `http://localhost:8080/message/${selectedChat._id}`,
        config
      );

      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
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
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  console.log("Notifications:", notifications)

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

        setNewMessage("");
        const { data } = await axios.post(
          "http://localhost:8080/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        console.log(data);
        socket.emit("new message", data);
        setMessages([...messages, data]);
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
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }

    let lastTypingTime = new Date().getTime();
    var timerLength = 2000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <>
      {selectedChat ? (
        <Box
          fontFamily={"Raleway"}
          height={"full"}
          width={"100%"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
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
          <Box
            d="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            height={["70vh", "", "100%"]}
            borderRadius="lg"
            overflowY="scroll"
            className="dabba"
          >
            {loading ? (
              <Flex
                width={"full"}
                height={"full"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Spinner size={"lg"} />
              </Flex>
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}
          </Box>

          {/* {isTyping ? (
            <Box width={"100%"}>
              <Lottie
                options={lottieOptions}
                width={100}
                height={100}
                style={{ marginBottom: 15, marginLeft: 0 }}
              />
            </Box>
          ) : (
            <></>
          )} */}
          <FormControl p={"2"} onKeyDown={sendMessage} isRequired>
            <Input
              type="text"
              variant={"filled"}
              bg={"white"}
              onChange={typingHandler}
              value={newMessage || ""}
              placeholder="Write a message..."
            />
          </FormControl>
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
