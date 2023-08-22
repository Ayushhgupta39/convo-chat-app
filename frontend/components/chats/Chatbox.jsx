import { ChatState } from "@/context/ChatProvider";
import { Box } from "@chakra-ui/react";
import SingleChat from "./SingleChat";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Box
      boxShadow={"2xl"}
      borderRadius={"2xl"}
      color={"black"}
      height={"full"}
      width={"full"}
      bgColor={"whitesmoke"}
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default Chatbox;
