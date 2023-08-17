const { Box, SkeletonCircle, SkeletonText } = require("@chakra-ui/react");

const ChatSkeleton = () => {
  return (
    <Box>
      <Box padding="3" boxShadow="lg" bg="white">
        <SkeletonCircle size="5" />
        <SkeletonText mt="4" noOfLines={3} spacing="4" skeletonHeight="2" />
      </Box>
      <Box padding="3" boxShadow="lg" bg="white">
        <SkeletonCircle size="5" />
        <SkeletonText mt="4" noOfLines={3} spacing="4" skeletonHeight="2" />
      </Box>
      <Box padding="3" boxShadow="lg" bg="white">
        <SkeletonCircle size="5" />
        <SkeletonText mt="4" noOfLines={3} spacing="4" skeletonHeight="2" />
      </Box>
      <Box padding="3" boxShadow="lg" bg="white">
        <SkeletonCircle size="5" />
        <SkeletonText mt="4" noOfLines={3} spacing="4" skeletonHeight="2" />
      </Box>
      <Box padding="3" boxShadow="lg" bg="white">
        <SkeletonCircle size="5" />
        <SkeletonText mt="4" noOfLines={3} spacing="4" skeletonHeight="2" />
      </Box>
    </Box>
  );
};

export default ChatSkeleton;
