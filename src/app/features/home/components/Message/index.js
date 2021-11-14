import { HStack, Text, Box, Avatar, Tooltip, Image } from '@chakra-ui/react';
import React from 'react';

import { formatter } from '../../../../shared/utils/dateTime';
import { DIR, POS, TYPE } from '../../constants/message';

const Message = ({
  model,
  direction = DIR.OUTGOING,
  position = POS.SINGLE,
}) => {
  const { content, type, sender, avatar, sentTime } = model;

  const borderRadiosStyle = () => {
    if (position === POS.SINGLE) {
      return '16px';
    }

    if (isOutgoing()) {
      if (position === POS.FIRST) {
        return '16px 16px 2px 16px';
      }
      if (position === POS.NORMAL) {
        return '16px 2px 2px 16px';
      }
      if (position === POS.LAST) {
        return '16px 2px 16px 16px';
      }
    } else {
      if (position === POS.FIRST) {
        return '16px 16px 16px 2px';
      }
      if (position === POS.NORMAL) {
        return '2px 16px 16px 2px';
      }
      if (position === POS.LAST) {
        return '2px 16px 16px 16px';
      }
    }
  };

  const contentMapper = (msg, type) => {
    switch (type) {
      case TYPE.IMAGE:
        return (
          <Image
            src={msg}
            alt=""
            w="100%"
            borderRadius={borderRadiosStyle()}
            mt="1"
          />
        );

      case TYPE.VIDEO:
        break;

      default:
        return (
          <Text
            backgroundColor={isOutgoing() ? 'twitter.100' : 'gray.100'}
            px="3"
            py="1.5"
            mt="1"
            borderRadius={borderRadiosStyle()}
          >
            {msg}
          </Text>
        );
    }
  };

  const renderedAvatar = () => (
    <Avatar
      src={avatar}
      size="sm"
      name={sender}
      title={sender}
      visibility={
        position === POS.SINGLE || position === POS.LAST ? 'visible' : 'hidden'
      }
    />
  );

  const isOutgoing = () => direction === DIR.OUTGOING;

  return (
    <HStack
      alignItems="flex-end"
      spacing="2"
      flexDir={isOutgoing() ? 'row-reverse' : 'row'}
    >
      {!isOutgoing() && renderedAvatar()}
      <Box maxW="50%">
        <Tooltip
          label={formatter(sentTime)}
          aria-label={formatter(sentTime)}
          rounded="md"
        >
          {contentMapper(content, type)}
        </Tooltip>
      </Box>
    </HStack>
  );
};

export default Message;
