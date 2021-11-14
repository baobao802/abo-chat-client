import React from 'react';
import { Box, Heading, HStack, Text } from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/avatar';
import Icon from '@chakra-ui/icon';
import {
  IoIosCall,
  IoIosVideocam,
  IoMdInformationCircle,
} from 'react-icons/io';
import { Tooltip } from '@chakra-ui/tooltip';

const ConversationHeader = () => {
  const fnConfig = [
    { icon: IoIosCall, label: 'Start a voice call' },
    { icon: IoIosVideocam, label: 'Start a video call' },
    { icon: IoMdInformationCircle, label: 'Conversation information' },
  ];

  return (
    <HStack
      justifyContent="space-between"
      mx="5"
      py="3"
      borderBottom="1px solid"
      borderColor="gray.300"
    >
      <HStack spacing="3">
        <Tooltip label="avatar" aria-label="avatar" rounded="md">
          <Avatar />
        </Tooltip>
        <Box>
          <Heading as="h3" size="md">
            Group Chat
          </Heading>
          <Text as="p" fontSize="sm" color="gray">
            Last seen 3 hours ago
          </Text>
        </Box>
      </HStack>
      <HStack spacing="3" color="twitter.500">
        {fnConfig.map(({ icon, label }) => (
          <Tooltip label={label} aria-label={label} rounded="md">
            <span>
              <Icon as={icon} fontSize="3xl" cursor="pointer" />
            </span>
          </Tooltip>
        ))}
      </HStack>
    </HStack>
  );
};

export default ConversationHeader;
