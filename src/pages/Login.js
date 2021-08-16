import React, { useEffect, useContext, useState } from 'react';
import { Keyboard } from "react-native";
import Ionicon from 'react-native-ionicons';
import {
  NativeBaseProvider,
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  Icon as NBIcon,
  IconButton,
  HStack,
  useToast
} from 'native-base';
import { AuthContext } from '../context/auth/AuthContext';
import { createTableUsers } from '../database/Users';
import Icon from '../components/atoms/Icon';

export default function Login({ navigation }) {
  const { authContext, authState } = useContext(AuthContext);
  const toast = useToast();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    createTableUsers();
  }, []);

  const handleLogin = () => {
    setButtonDisabled(true);
    Keyboard.dismiss();
    authContext.signIn(username, password)
    if (authState.loginUserNotFound) {
      toast.show({
        title: "Login gagal",
        status: "warning",
        description: "Kombinasi Username dan Password salah",
      })
    }
    setButtonDisabled(false);
  }
  return (
    <NativeBaseProvider>
      <Box flex={1} p={2} w="90%" mx="auto">
        <Heading size="lg" color="primary.500">Welcome</Heading>
        <Heading color="muted.400" size="xs">
          Sign in to continue!
        </Heading>

        <VStack space={2} mt={5}>
          <FormControl>
            <FormControl.Label
              _text={{ color: 'muted.700', fontSize: 'sm', fontWeight: 600 }}>
              Username
            </FormControl.Label>
            <Input
              onChangeText={value => setUsername(value)}
              value={username}
            />
          </FormControl>
          <FormControl mb={5}>
            <FormControl.Label
              _text={{ color: 'muted.700', fontSize: 'sm', fontWeight: 600 }}>
              Password
            </FormControl.Label>
            <Input
              type={showPassword ? "text" : "password"}
              onChangeText={value => setPassword(value)}
              value={password}
              InputRightElement={
                <Icon onPress={() => setShowPassword(!showPassword)} name={showPassword ? "eye-off" : "eye"} style={{ marginRight: 10 }} />
              }
            />
            <Link
              _text={{ fontSize: 'xs', fontWeight: '700', color: 'cyan.500' }}
              alignSelf="flex-end"
              mt={1}>
              Forget Password?
            </Link>
          </FormControl>
          <VStack space={2}>
            <Button
              colorScheme="cyan"
              _text={{ color: 'white' }}
              isDisabled={buttonDisabled}
              onPress={handleLogin}>
              Login
            </Button>

            <HStack justifyContent="center" alignItem="center">
              <IconButton
                variant="unstyled"
                startIcon={
                  <NBIcon
                    as={<Ionicon name="facebook" />}
                    color="muted.700"
                    size="sm"
                  />
                }
              />
              <IconButton
                variant="unstyled"
                startIcon={
                  <NBIcon
                    as={<Ionicon name="google" />}
                    color="muted.700"
                    size="sm"
                  />
                }
              />
              <IconButton
                variant="unstyled"
                startIcon={
                  <NBIcon
                    as={<Ionicon name="github" />}
                    color="muted.700"
                    size="sm"
                  />
                }
              />
            </HStack>
          </VStack>
          <HStack justifyContent="center">
            <Text fontSize="sm" color="muted.700" fontWeight={400}>
              Pengguna baru?{' '}
            </Text>
            <Link
              _text={{ color: 'cyan.500', bold: true, fontSize: 'sm' }}
              onPress={() => navigation.navigate('Signup')}>
              Registrasi
            </Link>
          </HStack>
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
}
