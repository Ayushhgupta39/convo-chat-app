import { ChatState } from '@/context/ChatProvider'
import { Box, Text } from '@chakra-ui/react';
import React from 'react'

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    const { user, selectedChat, setSelectedChat } = ChatState();
  return <>
    {selectedChat ? (
        
    <Box fontFamily={"Raleway"}>
        SingleChat
    </Box>
  
    ) : (
        <Box fontFamily={"Raleway"} height={"full"} width={"full"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <Text>Click on a user to start chatting</Text>
        </Box>
    )}
  </>
}

export default SingleChat