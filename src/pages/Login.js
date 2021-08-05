import React, { useEffect } from 'react';
import RNBootSplash from 'react-native-bootsplash';
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
    Icon,
    IconButton,
    HStack,
} from 'native-base';

export default function Login({ navigation }) {
    useEffect(() => {
        const init = async () => {

        };

        init().finally(async () => {
            await RNBootSplash.hide({ fade: true });
            console.log('Bootsplash has been hidden successfully');
        });
    }, []);
    return (
        <NativeBaseProvider>
            <Box
                flex={1}
                p={2}
                w="90%"
                mx='auto'
            >
                <Heading size="lg" color='primary.500'>
                    Welcome
                </Heading>
                <Heading color="muted.400" size="xs">
                    Sign in to continue!
                </Heading>

                <VStack space={2} mt={5}>
                    <FormControl>
                        <FormControl.Label _text={{ color: 'muted.700', fontSize: 'sm', fontWeight: 600 }}>
                            Email ID
                        </FormControl.Label>
                        <Input />
                    </FormControl>
                    <FormControl mb={5}>
                        <FormControl.Label _text={{ color: 'muted.700', fontSize: 'sm', fontWeight: 600 }}>
                            Password
                        </FormControl.Label>
                        <Input type="password" />
                        <Link
                            _text={{ fontSize: 'xs', fontWeight: '700', color: 'cyan.500' }}
                            alignSelf="flex-end"
                            mt={1}
                        >
                            Forget Password?
                        </Link>
                    </FormControl>
                    <VStack space={2}>
                        <Button colorScheme="cyan" _text={{ color: 'white' }}>
                            Login
                        </Button>

                        <HStack justifyContent="center" alignItem='center'>
                            <IconButton
                                variant='unstyled'
                                startIcon={
                                    <Icon
                                        as={< Ionicon name="facebook" />}
                                        color='muted.700'
                                        size='sm'
                                    />
                                }
                            />
                            <IconButton
                                variant='unstyled'
                                startIcon={
                                    <Icon
                                        as={< Ionicon name="google" />}
                                        color='muted.700'
                                        size="sm"
                                    />
                                }
                            />
                            <IconButton
                                variant='unstyled'
                                startIcon={
                                    <Icon
                                        as={< Ionicon name="github" />}
                                        color='muted.700'
                                        size="sm"
                                    />
                                }
                            />
                        </HStack>
                    </VStack>
                    <HStack justifyContent="center">
                        <Text fontSize='sm' color='muted.700' fontWeight={400}>Pengguna baru? </Text>
                        <Link _text={{ color: 'cyan.500', bold: true, fontSize: 'sm' }} onPress={() => navigation.navigate('Signup')}>
                            Sign Up
                        </Link>
                    </HStack>
                </VStack>
            </Box>
        </NativeBaseProvider>
    );
}