import * as React from 'react';
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
    Divider
} from 'native-base';

export default function Signup({ navigation }) {

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
                    Sign up to continue!
                </Heading>

                <VStack space={2} mt={5}>
                    <FormControl>
                        <FormControl.Label _text={{ color: 'muted.700', fontSize: 'sm', fontWeight: 600 }}>
                            Email
                        </FormControl.Label>
                        <Input />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label _text={{ color: 'muted.700', fontSize: 'sm', fontWeight: 600 }}>
                            Password
                        </FormControl.Label>
                        <Input type="password" />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label _text={{ color: 'muted.700', fontSize: 'sm', fontWeight: 600 }}>
                            Confirm Password
                        </FormControl.Label>
                        <Input type="password" />
                    </FormControl>
                    <VStack space={2} mt={5}>
                        <Button colorScheme="cyan" _text={{ color: 'white' }}>
                            SignUp
                        </Button>

                        <HStack justifyContent="center" alignItem='center' >
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
                        <Text fontSize='sm' color='muted.700' fontWeight={400}>Sudah punya akun? </Text>
                        <Link _text={{ color: 'cyan.500', bold: true, fontSize: 'sm' }} onPress={() => navigation.popToTop()}>
                            Login
                        </Link>
                    </HStack>
                </VStack>
            </Box>
        </NativeBaseProvider>
    );
}