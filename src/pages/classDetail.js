import React, { useEffect, useState, useLayoutEffect, Component } from 'react';
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
import { getAllItems } from '../database/Items';
import { TouchableOpacity, Switch } from 'react-native';
import Icon from 'react-native-ionicons';
import { updateList } from '../database/Lists';
import { getListItemByListId, updateListItems } from '../database/listItems';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myItems: [],
            listId: this.props.route.params.listId,
            list_name: this.props.route.params.list_name,
        }
    }

    componentDidMount() {
        this.props.navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={this.submitForm}>
                    <Icon
                        ios="ios-checkmark-circle-outline"
                        android="md-checkmark-circle-outline"
                        style={{ marginRight: 15, color: 'green' }}
                    />
                </TouchableOpacity>
            ),
        });
        this.fetchMyItems();
        console.log('componentDidMount')
    }

    fetchMyItems = async () => {
        const res = await getListItemByListId(this.state.listId);
        if (res.success) {
            let items = [];
            res.data.map(i => {
                items.push({ id: i.id, name: i.name, returned: i.returned })
            })
            console.log('selected items', items)
            this.setState({
                myItems: items
            })
        } else {
            console.log('error fetch myitems', res.msg);
        }
    };

    onChecked = (id) => {
        console.log('id', id)
        const data = this.state.myItems;
        console.log('data', data)
        console.log('data1', data[2].returned)
        const index = data.findIndex(i => {
            console.log('i', i);
            console.log('i.id', i.id);
            i.id === id;
        });
        console.log('index', index)
        console.log('data[1]', data[1])
        data[1].returned = 1;
        console.log('data BARU', data)
        this.setState({ myItems: data })
    }

    submitForm = async () => {
        console.log('listName', listName)
        console.log('myItems', myItems)
        const saveListName = await updateList({ id: this.state.listId, name: listName });
        if (saveListName.success) {
            await updateListItems(this.state.listId, this.state.myItems);
            navigation.popToTop();
        }
    };
    render() {
        return (
            <VStack flex={1} bg="white" >
                <Box bg="white" p={2} mx={3} my={2} shadow={2}>
                    <Text bold>{this.state.list_name} <Text fontSize="xs" italic> Rab, 28 Jul 2021</Text></Text>
                    <Divider my={2} />
                    <Text fontSize="xs">Total barang yang sudah kembali ada 0 dari 4 barang</Text>
                </Box>
                <FlatList
                    mt={2}
                    width="100%"
                    data={this.state.myItems}
                    renderItem={({ item }) => {
                        return (
                            <>
                                <HStack justifyContent="space-between" px={2}>
                                    <Text value={item.id} my={2}>
                                        {item.name}
                                    </Text>
                                    <Switch value={item.returned === 1 ? true : false} onValueChange={() => this.onChecked(item.id)} />
                                </HStack>
                                <Divider my={1} />
                            </>
                        );
                    }}
                />
            </VStack>
        );
    }
};

export default Detail;