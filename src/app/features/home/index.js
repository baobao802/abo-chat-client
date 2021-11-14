import React from 'react';
import { Box, Container, HStack } from '@chakra-ui/layout';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { useDispatch, useSelector } from 'react-redux';

import { onConnect, subscribe } from '../../core/ws';
import { selectUserLoggedIn } from '../../shared/store/auth/authSlice';
import {
  selectAllMessages,
  sendMessage as pushMessage,
} from '../../shared/store/chat/chatSlice';

import ChatContainer from './components/ChatContainer';
import ConversationHeader from './components/ConversationHeader';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import Message from './components/Message';
import { DIR, POS } from './constants/message';

const Home = () => {
  const user = useSelector(selectUserLoggedIn);
  const messages = useSelector(selectAllMessages);
  const dispatch = useDispatch();

  onConnect(f => {
    subscribe('/topic/world', msg => {
      if (msg.body) {
        dispatch(pushMessage(JSON.parse(msg.body)));
      } else {
        console.error('Got empty message');
      }
    });
  });

  const isOutgoing = sender => user.username === sender;

  const positionMessage = index => {
    const prevIn = messages[index - 1]?.sender;
    const currentIn = messages[index]?.sender;
    const nextIn = messages[index + 1]?.sender;

    if (currentIn !== prevIn && currentIn !== nextIn) return POS.SINGLE;
    if (currentIn !== prevIn && currentIn === nextIn) return POS.FIRST;
    if (currentIn === prevIn && currentIn === nextIn) return POS.NORMAL;
    if (currentIn === prevIn && currentIn !== nextIn) return POS.LAST;
  };

  return (
    <Container minW="full" h="full" p="0" backgroundColor="white">
      <HStack spacing="0">
        <Box w="25%" p="3"></Box>
        <Box w="50%">
          <ChatContainer>
            <ConversationHeader />
            <MessageList>
              {messages.map(
                ({ id, content, sender, type, createdAt }, index) => (
                  <Message
                    key={id}
                    model={{
                      content,
                      sender,
                      type,
                      sentTime: new Date(createdAt),
                    }}
                    direction={isOutgoing(sender) ? DIR.OUTGOING : DIR.INCOMING}
                    position={positionMessage(index)}
                  />
                )
              )}
            </MessageList>
            <MessageInput />
          </ChatContainer>
        </Box>
        <Box w="25%" p="3"></Box>
      </HStack>
    </Container>
  );
};

export default Home;
