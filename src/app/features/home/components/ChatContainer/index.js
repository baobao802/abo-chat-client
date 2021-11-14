import { Box } from '@chakra-ui/layout';
import React from 'react';

const ChatContainer = props => {
  return (
    <Box
      w="full"
      h="100vh"
      minW="375px"
      display="flex"
      flexDir="column"
      backgroundColor="white"
      border="1px solid"
      borderColor="gray.300"
    >
      {props.children}
    </Box>
  );
};

export default ChatContainer;
