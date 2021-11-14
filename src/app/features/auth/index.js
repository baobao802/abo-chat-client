import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Box, Container } from '@chakra-ui/layout';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { FormControl, FormErrorMessage } from '@chakra-ui/form-control';

import { usernameValidate } from './configs/formValidationConfig';
// import useCustomToast from '../../shared/hooks/useCustomToast';
import { loginFake } from '../../shared/store/auth/authSlice';

const Auth = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  // const toast = useCustomToast();

  const onSubmit = async data => {
    console.log(data);
    await dispatch(loginFake(data));
    reset();
    history.push('/');
  };

  return (
    <Container maxW="container.xl" mt="64px" minH="74vh">
      <Box w="320px" mx="auto" pt="3rem">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl mb={2} isInvalid={errors.username}>
            <Input
              {...register('username', usernameValidate)}
              placeholder="Username"
              rounded="lg"
            />
            <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
          </FormControl>

          <Button type="submit" colorScheme="twitter" w="full" rounded="lg">
            Enter
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Auth;
