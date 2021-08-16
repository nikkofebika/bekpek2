import React, { useState } from 'react';
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
  Divider,
  useToast,
} from 'native-base';
import { Keyboard } from 'react-native';
import Icon from '../components/atoms/Icon';
import { insertUser } from '../database/Users';

export default function Signup({ navigation }) {
  const toast = useToast();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    setButtonDisabled(true)
    Keyboard.dismiss();
    const data = {
      name,
      username,
      password,
    };
    const saveUser = await insertUser(data);
    if (saveUser.success) {
      toast.show({
        title: "Registrasi berhasil",
        status: "warning",
        description: "Silahkan login",
      })
    } else {
      toast.show({
        title: "Registrasi gagal",
        status: "warning",
        description: "Username sudah digunakan",
      })
    }
    setButtonDisabled(false)
  };
  return (
    <NativeBaseProvider>
      <Box flex={1} p={2} w="90%" mx="auto">
        <Heading size="lg" color="primary.500">
          Welcome
        </Heading>
        <Heading color="muted.400" size="xs">Sign up to continue!</Heading>

        <VStack space={2} mt={5}>
          <FormControl>
            <FormControl.Label
              _text={{ color: 'muted.700', fontSize: 'sm', fontWeight: 600 }}>
              Nama Lengkap
            </FormControl.Label>
            <Input
              onChangeText={value => setName(value)}
              value={name}
            />
          </FormControl>
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
          <FormControl>
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
          </FormControl>
          <VStack space={2} mt={5}>
            <Button
              colorScheme="cyan"
              _text={{ color: 'white' }}
              isDisabled={buttonDisabled}
              onPress={handleSignup}>
              Registrasi
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
              Sudah punya akun?{' '}
            </Text>
            <Link
              _text={{ color: 'cyan.500', bold: true, fontSize: 'sm' }}
              onPress={() => navigation.popToTop()}>
              Login
            </Link>
          </HStack>
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
}
