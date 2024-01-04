import { ChatState } from "@/context/ChatProvider";
import {
  Box,
  Button,
  Input,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Tooltip,
  Flex,
  Text,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import ChatSkeleton from "../ChatSkeleton";
import UserSearchItem from "./UserSearchItem";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const toast = useToast();
  const { user, setSelectedChat, chats, setChats } = ChatState();

  const [loading, setLoading] = useState({
    search: false,
    chat: false,
  });

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Search should not be empty.",
        status: "warning",
        duration: 2500,
        isClosable: true,
      });
      return;
    }

    try {
      setLoading({ search: true });

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:8080/users?search=${search}`,
        config
      );
      setLoading({ search: false });  
      setSearchResult(data);
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

  const accessChat = async (userId) => {
    
    try {
      setLoading({ chat: true });

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        `http://localhost:8080/chats`,
        { userId },
        config
      );

      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }
      setSelectedChat(data);
      setLoading({ chat: false });
      onClose();
    } catch (error) {
      console.log(error);
      toast({
        title: "An error occured.",
        description: "Check the browser console for more details",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setLoading({ chat: false });
    }
  };

  return (
    <Box>
      <Tooltip label="Search users to chat" borderRadius={"full"}>
        <Button
          backgroundColor={"white"}
          p={"2"}
          width={"full"}
          fontSize={"sm"}
          placeholder="Search"
          borderRadius={"full"}
          leftIcon={<BsSearch />}
          onClick={onOpen}
          ref={btnRef}
        >
          Search
        </Button>
      </Tooltip>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
        backgroundColor={"gray.100"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>

          <DrawerBody>
            <Flex pb={2}>
              <Input
                fontSize={"sm"}
                placeholder="Search by name or email"
                mr={2}
                variant={"flushed"}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button
                backgroundColor={"black"}
                color={"white"}
                borderRadius={"full"}
                _hover={{ backgroundColor: "gray.600" }}
                onClick={handleSearch}
              >
                Go
              </Button>
            </Flex>
            {loading.search ? (
              <ChatSkeleton />
            ) : (
              searchResult.map((user, index) => {
                return (
                  <Box>
                    <UserSearchItem
                      key={index}
                      user={user}
                      handleFunction={() => accessChat(user._id)}
                    />
                    {loading.chat && <Spinner />}
                  </Box>
                );
              })
            )}
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default SearchBar;



