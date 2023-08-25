import { ChatState } from "@/context/ChatProvider";
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  useToast,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import UserSearchItem from "./UserSearchItem";
import UserBadgeItem from "./UserBadgeItem";

const GroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { user, chats, setChats } = ChatState();

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:8080/users?search=${search}`,
        config
      );
      setLoading(false);
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

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        "http://localhost:8080/chats/group",
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to create group chat.",
        description: "Check the browser console for more details",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    onClose();
  };

  const handleGroup = (userToAdd) => {
    if (selectedUsers.some((user) => user._id === userToAdd._id)) {
      toast({
        title: "User already present",
        description: "This user is already present.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleDelete = (user) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== user._id));
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal fontFamily="Raleway" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize={"2xl"}
            fontWeight={"bold"}
            display={"flex"}
            justifyContent={"center"}
          >
            Create a group
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <Input
              type="text"
              placeholder="Type group name here..."
              variant={"flushed"}
              onChange={(e) => setGroupChatName(e.target.value)}
              marginY={"2"}
            />

            <Input
              type="text"
              placeholder="Add participant eg: John, Alex, Jane"
              variant={"flushed"}
              marginY={"2"}
              onChange={(e) => handleSearch(e.target.value)}
            />

            <Box w="100%" display={"flex"} flexWrap={"wrap"}>
              {selectedUsers.map((user) => (
                <UserBadgeItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleDelete(user)}
                />
              ))}
            </Box>

            {loading ? (
              <div>Loading...</div>
            ) : (
              searchResult?.slice(0, 4).map((user) => (
                <Box width={"full"}>
                  <UserSearchItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroup(user)}
                  />
                </Box>
              ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              backgroundColor={"black"}
              color={"white"}
              _hover={{ backgroundColor: "gray.600" }}
              size={"sm"}
              borderRadius={"full"}
              mr={3}
              onClick={handleSubmit}
            >
              Create Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
