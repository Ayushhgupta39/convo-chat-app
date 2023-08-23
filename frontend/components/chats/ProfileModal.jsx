import { ChatState } from "@/context/ChatProvider";
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Image,
  Text,
} from "@chakra-ui/react";
import { AiOutlineInfoCircle } from "react-icons/ai";

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <AiOutlineInfoCircle cursor={"pointer"} onClick={onOpen} />
      )}
      <Modal size={"lg"} isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display={"flex"}
            fontSize={"30px"}
            justifyContent={"center"}
            fontFamily={"Raleway"}
          >
            {user?.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Image
              borderRadius={"full"}
              boxSize={"150px"}
              src={user?.picture}
              alt={user?.name}
            />
            <Text>Email: {user?.email}</Text>
          </ModalBody>

          <ModalFooter>
            <Button
              backgroundColor={"black"}
              color={"white"}
              borderRadius={"full"}
              _hover={{ backgroundColor: "gray.600" }}
              mr={3}
              onClick={onClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
