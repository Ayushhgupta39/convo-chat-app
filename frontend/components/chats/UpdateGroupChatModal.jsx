import { ChatState } from "@/context/ChatProvider";
import {
  Box,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
  Input,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import UserBadgeItem from "./UserBadgeItem";
import axios from "axios";
import UserSearchItem from "./UserSearchItem";

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat, setSelectedChat, user } = ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState({
    users: false,
    rename: false,
  });
  const toast = useToast();

  const handleRemove = async (userToRemove) => {
    if (
      selectedChat.groupAdmin._id !== user._id &&
      userToRemove._id !== user._id
    ) {
      toast({
        title: "Only admins can remove someone!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setLoading({ users: true });
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        "http://localhost:8080/chats/groupremove",
        {
          chatId: selectedChat._id,
          userId: userToRemove._id,
        },
        config
      );

      userToRemove._id == user._id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading({ users: false });
    } catch (error) {
      console.log(error);
      toast({
        title: "An error occured.",
        description: "Check the browser console for more details",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setLoading({ users: false });
    }
  };

  const handleRename = async () => {
    if (!groupChatName) {
      return;
    }

    try {
      setLoading({ rename: true });
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        "http://localhost:8080/chats/rename",
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading({ rename: false });

      setGroupChatName("");
    } catch (error) {
      console.log(error);
      toast({
        title: "An error occured.",
        description: "Check the browser console for more details",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setLoading({ rename: false });
    }
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading({ chats: true });

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:8080/users?search=${search}`,
        config
      );
      setLoading({ chats: false });
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
      setLoading({ chats: false });
    }
  };

  const AddUser = async (userToAdd) => {
    if (selectedChat.users.some((user) => user._id === userToAdd._id)) {
      toast({
        title: "User already present",
        description: "This user is already present.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (selectedChat.groupAdmin._id !== user._id) {
      toast({
        title: "Only admins can add someone!",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setLoading({ users: true });

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        "http://localhost:8080/chats/groupadd",
        {
          chatId: selectedChat._id,
          userId: userToAdd._id,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading({ users: false });
    } catch (error) {
      console.log(error);
      toast({
        title: "An error occured.",
        description: "Check the browser console for more details",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setLoading({ users: false });
    }
  };

  return (
    <>
      <Box display={{ base: "flex" }}>
        <AiOutlineInfoCircle cursor={"pointer"} onClick={onOpen} />
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display={"flex"} justifyContent={"center"}>
            {selectedChat.chatName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display={"flex"} flexWrap={"wrap"}>
              {selectedChat.users.map((u) => {
                return (
                  <UserBadgeItem
                    key={u._id}
                    user={u}
                    handleFunction={() => handleRemove(u)}
                  />
                );
              })}
              <Flex width={"full"} alignItems={"center"}>
                <Input
                  type="text"
                  placeholder="Rename group..."
                  value={groupChatName}
                  variant={"flushed"}
                  onChange={(e) => setGroupChatName(e.target.value)}
                  marginY={"2"}
                />
                <Button
                  backgroundColor={"teal"}
                  color={"white"}
                  borderRadius={"full"}
                  _hover={{ backgroundColor: "gray.600" }}
                  mr={3}
                  size="sm"
                  isLoading={loading.rename}
                  onClick={handleRename}
                >
                  Update
                </Button>
              </Flex>
              <Flex width={"full"}>
                <Input
                  type="text"
                  placeholder="Add users to group..."
                  variant={"flushed"}
                  onChange={(e) => handleSearch(e.target.value)}
                  marginY={"2"}
                />
              </Flex>
              {loading.users ? (
                <Spinner size={"lg"} />
              ) : (
                searchResult?.slice(0, 4).map((user) => (
                  <Box width={"full"}>
                    <UserSearchItem
                      key={user._id}
                      user={user}
                      handleFunction={() => AddUser(user)}
                    />
                  </Box>
                ))
              )}
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              borderRadius={"full"}
              onClick={() => handleRemove(user)}
              size="sm"
            >
              Leave
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroupChatModal;
