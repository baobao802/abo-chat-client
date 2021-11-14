import React from 'react';
import { Avatar } from '@chakra-ui/avatar';
import { Box, Heading, HStack, Text } from '@chakra-ui/layout';
import Icon from '@chakra-ui/icon';
import { FaEllipsisV } from 'react-icons/fa';

const ParticipantItem = props => {
  const { name, avatar, role } = props;

  return (
    <HStack spacing="3">
      <Avatar name={name} src={avatar} />
      <Box flex="1">
        <Heading as="h5" size="sm">
          {name}
        </Heading>
        <Text fontSize="sm" color="gray" fontWeight="medium">
          {role}
        </Text>
      </Box>
      <Icon as={FaEllipsisV} fontSize="md" color="gray" cursor="pointer" />
    </HStack>
  );
};

export default ParticipantItem;
