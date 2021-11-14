import { IconButton } from '@chakra-ui/button';
import Icon from '@chakra-ui/icon';
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/input';
import { HStack } from '@chakra-ui/layout';
import { FaPaperPlane } from 'react-icons/fa';
import React, { useState } from 'react';
import { IoIosHappy, IoIosMic } from 'react-icons/io';
// import 'emoji-mart/css/emoji-mart.css';
// import { Picker as EmojiPicker } from 'emoji-mart';

import { sendMessage } from '../../../../core/ws';
import FileUploader from '../FileUploader/FileUploader';
import { Image } from '@chakra-ui/image';
import { TYPE } from '../../constants/message';

const MessageInput = props => {
  const [msg, setMsg] = useState('');
  const [files, setFiles] = useState([]);

  const submitHandler = e => {
    e.preventDefault();
    if (files.length > 0) {
      files.forEach(({ url }) => {
        sendMessage('/app/sendToWorld', {
          content: url,
          type: TYPE.IMAGE,
        });
      });
      setFiles([]);
    }
    if (msg) {
      sendMessage('/app/sendToWorld', {
        content: msg,
        type: TYPE.TEXT,
      });
      setMsg('');
    }
  };

  return (
    <form onSubmit={submitHandler}>
      {files.length > 0 && (
        <HStack h="80px" px="3" alignItems="flex-end" bgColor="gray.100">
          {files.map(({ id, url }) => (
            <Image key={id} src={url} h="full" />
          ))}
        </HStack>
      )}
      <HStack backgroundColor="white" padding="3">
        <InputGroup pos="relative">
          <InputLeftElement
            cursor="pointer"
            children={<FileUploader onUpload={values => setFiles(values)} />}
          />
          <Input
            name="message"
            variant="filled"
            rounded="full"
            pr="16"
            placeholder="Type a message here..."
            value={msg}
            onChange={e => setMsg(e.target.value)}
          />
          <InputRightElement w="16">
            <Icon
              as={IoIosHappy}
              fontSize="xl"
              color="gray.400"
              cursor="pointer"
            />
            <Icon
              as={IoIosMic}
              fontSize="xl"
              color="gray.400"
              cursor="pointer"
              ml="2"
            />
          </InputRightElement>
        </InputGroup>
        <IconButton
          type="submit"
          colorScheme="twitter"
          rounded="full"
          boxShadow="xl"
          icon={<Icon as={FaPaperPlane} fontSize="xl" />}
        />
      </HStack>
    </form>
  );
};

export default MessageInput;
