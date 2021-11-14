import { Box } from '@chakra-ui/layout';
import React from 'react';

const MessageList = props => {
  return (
    <Box w="auto" h="full" p="2" mx="0.5" spacing="5" overflow="auto">
      {props.children}
    </Box>
  );
};

export default MessageList;
