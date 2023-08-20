import { Badge, Box } from "@chakra-ui/react";
import { AiOutlineClose } from "react-icons/ai";

const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <Badge
      colorScheme="purple"
      cursor={"pointer"}
      onClick={handleFunction}
      display={"flex"}
      alignItems={"center"}
      mx={"1"}
    >
      {user.name}
      <AiOutlineClose />
    </Badge>
  );
};

export default UserBadgeItem;
