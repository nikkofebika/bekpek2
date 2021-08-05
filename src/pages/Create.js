import React, {useEffect, useState, useLayoutEffect} from 'react';
import {
  Checkbox,
  FlatList,
  FormControl,
  HStack,
  Input,
  Text,
  VStack,
} from 'native-base';
import {getAllItems} from '../database/Items';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-ionicons';
import {getAllList, insertList} from '../database/Lists';
import {insertListItems} from '../database/listItems';

const Create = ({navigation}) => {
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
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await getAllItems();
    if (res.success) {
      console.log('res items', res.data);
      setDataItems(res.data);
    } else {
      console.log('error fetch items', res.msg);
    }
  };

  const submitForm = async () => {
    const saveListName = await insertList(listName);
    if (saveListName.success) {
      console.log('selectedItems', selectedItems);
      await insertListItems(saveListName.data.insertId, selectedItems);
      await getAllList();
      // navigation.popToTop('Home', {updated: true});
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
                <Text>
                  {item.id} {item.name}
                </Text>
              </Checkbox>
            );
          }}
        />
      </Checkbox.Group>
    </VStack>
  );
};

export default Create;
