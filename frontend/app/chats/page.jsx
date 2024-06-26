"use client";

import { ChatState } from "@/context/ChatProvider";
import {
  Avatar,
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import SearchBar from "@/components/chats/SearchBar";
import Chatbox from "@/components/chats/Chatbox";
import MyChats from "@/components/chats/MyChats";
import ProfileModal from "@/components/chats/ProfileModal";
import { useRouter } from "next/navigation";
import { getSender } from "@/config/ChatLogics";

const page = () => {
  const {
    user,
    selectedChat,
    setSelectedChat,
    notifications,
    setNotifications,
  } = ChatState();
  const router = useRouter();
  const [fetchAgain, setFetchAgain] = useState(false);

  const logoutUser = () => {
    localStorage.removeItem("userInfo");
    router.push("/");
  };

  return (
    <Box backgroundColor={"gray.100"} minHeight={"100vh"}>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Box fontWeight={"700"} mx={"5"} my={"2"}>
          <Text>Convo</Text>
        </Box>
        <Flex alignItems={"center"} gap={"20px"} mx={"5"}>
          <Flex alignItems={"center"}>
            <Menu isLazy id={2}>
              <MenuButton>
                {notifications.length === 0 ? (
                  <IoIosNotificationsOutline cursor={"pointer"} size={"22px"} />
                ) : (
                  <MdOutlineNotificationsActive
                    cursor={"pointer"}
                    size={"22px"}
                  />
                )}
              </MenuButton>
              <MenuList>
                {notifications.length === 0 && (
                  <MenuItem>No New Messages</MenuItem>
                )}
                {notifications.map((notification) => (
                  <MenuItem
                    onClick={() => {
                      setSelectedChat(notification.chat);
                      setNotifications(
                        notifications.filter((n) => n !== notification)
                      );
                    }}
                    key={notification._id}
                  >
                    {notification.chat.isGroupChat
                      ? `New message in ${notification.chat.chatName}`
                      : `New message from ${getSender(
                          user,
                          notification.chat.users
                        )}`}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </Flex>
          <BsSearch cursor={"pointer"} />
          <Menu isLazy id={1}>
            <MenuButton>
              <Flex alignItems={"center"} cursor={"pointer"}>
                <Avatar size={"sm"} name={user?.name} src={user?.picture} />
                <RiArrowDropDownLine />
              </Flex>
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuItem onClick={logoutUser}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      <Box
        mx="5"
        display={{ base: "flex", md: "grid", lg: "grid" }}
        gridTemplateColumns={"35% 65%"}
        flexDirection={"column"}
        minHeight={"90vh"}
      >
        <Box>
          <Box mx={"1"}>
            <SearchBar />
            <MyChats fetchAgain={fetchAgain} />
          </Box>
        </Box>
        <Box display={{ base: selectedChat ? "flex" : "none", md: "flex" }}>
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        </Box>
      </Box>
    </Box>
  );
};

export default page;
