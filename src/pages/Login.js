import React, { useEffect, useContext, useState } from 'react';
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
import { AuthContext } from '../context/auth/AuthContext';
import { StyleSheet, TextInput } from 'react-native';

export default function Login({ navigation }) {
    const { authContext } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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
                            Username
                        </FormControl.Label>
                        <TextInput
                            style={styles.input}
                            onChangeText={setUsername}
                            value={username}
                        />
                    </FormControl>
                    <FormControl mb={5}>
                        <FormControl.Label _text={{ color: 'muted.700', fontSize: 'sm', fontWeight: 600 }}>
                            Password
                        </FormControl.Label>
                        <TextInput
                            style={styles.input}
                            secureTextEntry
                            onChangeText={setPassword}
                            value={password}
                        />
                        <Link
                            _text={{ fontSize: 'xs', fontWeight: '700', color: 'cyan.500' }}
                            alignSelf="flex-end"
                            mt={1}
                        >
                            Forget Password?
                        </Link>
                    </FormControl>
                    <VStack space={2}>
                        <Button colorScheme="cyan" _text={{ color: 'white' }} onPress={() => authContext.signIn(username, password)}>
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

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
});