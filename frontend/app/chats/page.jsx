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
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import SearchBar from "@/components/chats/SearchBar";
import Chatbox from "@/components/chats/Chatbox";
import MyChats from "@/components/chats/MyChats";
import ProfileModal from "@/components/chats/ProfileModal";
import { useRouter } from "next/navigation";

const page = () => {
  const { user, selectedChat } = ChatState();
  const router = useRouter();
  const [fetchAgain, setFetchAgain] = useState(false);

  const logoutUser = () => {
    localStorage.removeItem("userInfo");
    router.push("/");
  };

  return (
    <Box backgroundColor={"gray.100"} minH={"100vh"}>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Box fontWeight={"700"} mx={"5"} my={"2"}>
          <Text>Convo</Text>
        </Box>
        <Flex alignItems={"center"} gap={"20px"} mx={"5"}>
          <BsSearch cursor={"pointer"} />
          <Menu>
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
