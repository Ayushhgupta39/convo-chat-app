import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

const UserSearchItem = ({ user, handleFunction }) => {
  return (
    <Flex
      alignItems={"center"}
      fontFamily={"Raleway"}
      my={"3"}
      boxShadow={"md"}
      p={"1"}
      borderRadius={"2xl"}
      cursor={"pointer"}
      _hover={{ backgroundColor: "teal", color: "white" }}
      onClick={handleFunction}
    >
      <Avatar size={"md"} name={user.name} src={user.picture} />
      <Box p={"2"}>
        <Text as={"b"}>{user.name}</Text>
        <Text fontSize={"sm"}>{user.email}</Text>
      </Box>
    </Flex>
  );
};

export default UserSearchItem;
