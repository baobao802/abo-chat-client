import { Box, Container } from '@chakra-ui/layout';
import React from 'react';

const OverallLayout = props => {
  return (
    <Container maxW="100vw" minH="100vh" backgroundColor="white">
      <Box>{/* implement navigation bar here */}</Box>
      <Box>{props.children}</Box>
    </Container>
  );
};

export default OverallLayout;
