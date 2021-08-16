import React, { useEffect } from 'react'
import { Center, Image, Text, VStack } from 'native-base';
import VersionInfo from 'react-native-version-info';

export default function About({ navigation }) {
    useEffect(() => {
        navigation.setOptions({ title: "Tentang Bekpek" })
    }, [])
    return (
        <Center p={3} bg="white" flex={1}>
            <Image size="sm" source={require('../assets/icon/playstore.png')} />
            <Text fontSize={14} fontWeight="bold">Versi {VersionInfo.appVersion}</Text>
            <VStack space={4} mt={10} alignItems="center">
                <Text textAlign="center">Dalam setiap aktifitas yang kita lakukan, banyak barang yang harus kita siapkan dan kita bawa. Kita tidak ingin aktivitas penting kita rusak gara-gara ada barang yang lupa dibawa. Kita juga tidak ingin barang bawaan kita tertinggal setelah aktivitas yang kita lakukan.</Text>
                <Text textAlign="center">Bekpek memberikan kita sebuah solusi, dengan aplikasi ini kita dapat merencanakan baik-baik barang apa yang akan kita bawa dan setelah selesai, kita dapat mengecek kembali barang bawaan kita.</Text>
                <Text textAlign="center">Semoga bermanfaat.</Text>
                <Text textAlign="center" color="teal.900" fontWeight="bold">~ Nikko Fe ~</Text>
            </VStack>
        </Center>
    );
}