import React, { useEffect, useState, useLayoutEffect } from 'react';
import {
    Box,
    Checkbox,
    Divider,
    FlatList,
    FormControl,
    HStack,
    Text,
    VStack,
} from 'native-base';
import { TouchableOpacity, Switch } from 'react-native';
import Ionicon from 'react-native-ionicons';
import { getListItemByListId, updateListItems, updateReturnListItems } from '../database/listItems';

const Detail = ({ route, navigation }) => {
    const { listId, list_name } = route.params;
    const [myItems, setMyItems] = useState([]);
    const [totalItems, setTotalItems] = useState(null);
    const [totalKembali, setTotalKembali] = useState(0);

    useEffect(async () => {
        fetchMyItems();
        console.log('useeffect')
    }, []);

    const fetchMyItems = async () => {
        const res = await getListItemByListId(listId);
        if (res.success) {
            setTotalItems(res.data.length)
            setTotalKembali(res.returned)
            let items = [];
            res.data.map(i => {
                items.push({ id: i.id, name: i.name, returned: i.returned })
            })
            console.log('selected items', items)
            setMyItems(items)
        } else {
            console.log('error fetch myitems', res.msg);
        }
    };

    // const onChecked = (id) => {
    //     updateReturnListItems(id).then(res => {
    //         if (res.success) {
    //             const index = myItems.findIndex(i => i.id === id);
    //             const data = myItems[index].returned === 0 ? myItems[index].returned = 1 : myItems[index].returned = 0;
    //             setMyItems([...myItems], data);
    //             setTotalKembali(totalKembali + 1);
    //         }
    //     }).catch(error => console.log('Error checked', error))
    // }

    const onChecked = (id, status) => {
        console.log('status lama', status)
        let newStatus = status === 0 ? 1 : 0;
        console.log('status baru', newStatus)
        updateReturnListItems(id, newStatus).then(res => {
            if (res.success) {
                const data = myItems;
                const index = data.findIndex(i => i.id === id);
                if (status === 0) {
                    data[index].returned = 1
                    setTotalKembali(totalKembali + 1);
                } else {
                    data[index].returned = 0
                    setTotalKembali(totalKembali - 1);
                }
                console.log('datata', data)
                setMyItems([...myItems], data);
            }
        }).catch(error => console.log('Error checked', error))
    }

    return (
        <VStack flex={1} bg="white" >
            <Box bg="white" p={2} mx={3} my={2} shadow={2}>
                <Text bold>{list_name} <Text fontSize="xs" italic> Rab, 28 Jul 2021</Text></Text>
                <Divider my={2} />
                {totalKembali === totalItems ? <Text fontSize="xs" color="green.600" bold><Ionicon ios="ios-checkmark" android="checkmark" size={15} /> Barang sudah kembali semua</Text> : <Text fontSize="xs">Total barang yang sudah kembali ada {totalKembali} dari {totalItems} barang</Text>}
            </Box>
            <FlatList
                mt={2}
                data={myItems}
                renderItem={({ item }) => {
                    return (
                        <>
                            <HStack justifyContent="space-between" px={2}>
                                <Text value={item.id} my={2}>{item.name}</Text>
                                <Switch value={item.returned === 1 ? true : false} onValueChange={() => onChecked(item.id, item.returned)} />
                            </HStack>
                            <Divider my={1} />
                        </>
                    );
                }}
            />
        </VStack>
    );
};

export default Detail;