import { FormControl, FormLabel } from '@chakra-ui/form-control';
import Icon from '@chakra-ui/icon';
import { Input } from '@chakra-ui/input';
import React, { useEffect, useState } from 'react';
import { IoMdAttach } from 'react-icons/io';

import { uploadAsync } from '../../api';

const FileUploader = ({ onUpload }) => {
  const [files, setFiles] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (files) {
      for (const file of files) {
        try {
          uploadAsync('/files/upload', file)
            .then(res => setData(prev => [...prev, res.data]))
            .catch(e => {
              throw new Error(`Upload file failed.`);
            });
        } catch (error) {
          console.error('Error', error);
        }
      }
    }
    setFiles(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  useEffect(() => {
    onUpload(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const uploadHandler = e => {
    if (e.target.files.length > 0) {
      setFiles(e.target.files);
      setData([]);
    }
  };

  return (
    <FormControl id="file" w="unset">
      <FormLabel
        p="2"
        display="inline-block"
        m="0"
        lineHeight="0"
        cursor="pointer"
      >
        <Icon as={IoMdAttach} fontSize="xl" color="gray.400" />
      </FormLabel>
      <Input multiple type="file" display="none" onChange={uploadHandler} />
    </FormControl>
  );
};

export default FileUploader;
