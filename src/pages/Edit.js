import React, {useEffect, useState, useLayoutEffect} from 'react';
import {
  Checkbox,
  FlatList,
  FormControl,
  HStack,
  Input,
  VStack,
} from 'native-base';
import {getAllItems} from '../database/Items';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-ionicons';
import {updateList} from '../database/Lists';
import {getListItemByListId, updateListItems} from '../database/listItems';

const Edit = ({route, navigation}) => {
  const {listId, list_name} = route.params;

  const [listName, setListName] = useState('');
  const [dataItems, setDataItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HStack>
          <TouchableOpacity onPress={() => alert('search')}>
            <Icon
              ios="ios-search"
              android="md-search"
              style={{marginRight: 15}}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={submitForm}>
            <Icon
              ios="ios-checkmark-circle-outline"
              android="md-checkmark-circle-outline"
              style={{marginRight: 15, color: 'green'}}
            />
          </TouchableOpacity>
        </HStack>
      ),
    });
  }, [navigation, listName, selectedItems]);

  useEffect(() => {
    fetchMyItems();
    fetchItems();
    setListName(list_name);
  }, []);

  const fetchMyItems = async () => {
    const res = await getListItemByListId(listId);
    if (res.success) {
      let items = [];
      res.data.map(i => {
        items.push(i.item_id);
      });
      console.log('selected items', items);
      setSelectedItems(items);
    } else {
      console.log('error fetch myitems', res.msg);
    }
  };

  const fetchItems = async () => {
    const res = await getAllItems();
    if (res.success) {
      setDataItems(res.data);
    } else {
      console.log('error fetch items', res.msg);
    }
  };

  const submitForm = async () => {
    console.log('listName', listName);
    console.log('selectedItems', selectedItems);
    const saveListName = await updateList({id: listId, name: listName});
    if (saveListName.success) {
      await updateListItems(listId, selectedItems);
      //   navigation.popToTop();
      navigation.navigate({
        name: 'Home',
        params: {updated: true},
        merge: true,
      });
    }
  };
  return (
    <VStack mx={3} my={2}>
      <FormControl isRequired>
        <Input
          p={2}
          placeholder="Nama List"
          value={listName}
          onChangeText={setListName}
        />
      </FormControl>
      <Checkbox.Group
        width="100%"
        onChange={setSelectedItems}
        value={selectedItems}>
        <FlatList
          width="100%"
          bg="primary.300"
          data={dataItems}
          renderItem={({item}) => {
            return (
              <Checkbox value={item.id} my={2}>
                {item.name}
              </Checkbox>
            );
          }}
        />
      </Checkbox.Group>
    </VStack>
  );
};

export default Edit;
