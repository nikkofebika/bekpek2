import React, {useEffect, useState, useLayoutEffect, useContext} from 'react';
import {
  Box,
  Checkbox,
  Divider,
  FlatList,
  Flex,
  FormControl,
  HStack,
  Input,
  Text,
  View,
  VStack,
} from 'native-base';
import {getAllItems} from '../database/Items';
import {TouchableOpacity} from 'react-native';
import {getAllList, insertList} from '../database/Lists';
import {insertListItems} from '../database/listItems';
import {AuthContext} from '../context/auth/AuthContext';
import Icon from '../components/atoms/Icon';

const Create = ({navigation}) => {
  const {authState} = useContext(AuthContext);
  const userData = JSON.parse(authState.userData);
  const userId = userData.id;
  const [listName, setListName] = useState('');
  const [dataItems, setDataItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HStack>
          <Icon
            name="search"
            onPress={() => alert('search')}
            style={{marginRight: 15}}
          />
          <Icon
            name="checkmark-circle-outline"
            onPress={submitForm}
            style={{marginRight: 15}}
          />
        </HStack>
      ),
    });
  }, [navigation, listName, selectedItems]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await getAllItems(userId);
    if (res.success) {
      console.log('res items', res.data);
      setDataItems(res.data);
    } else {
      console.log('error fetch items', res.msg);
    }
  };

  const submitForm = async () => {
    const saveListName = await insertList({userId, name: listName});
    if (saveListName.success) {
      console.log('listName', listName);
      console.log('selectedItems', selectedItems);
      console.log('saveListName.data.insertId', saveListName.data.insertId);
      await insertListItems({
        userId,
        listId: saveListName.data.insertId,
        items: selectedItems,
      });
      // navigation.popToTop('Home', {updated: true});
      navigation.navigate({
        name: 'Home',
        params: {updated: true},
        merge: true,
      });
    }
  };
  return (
    <Box my={2} safeArea flex={1}>
      <FormControl isRequired>
        <Input
          mx={3}
          p={2}
          placeholder="Nama List"
          value={listName}
          onChangeText={setListName}
        />
      </FormControl>
      <Checkbox.Group onChange={setSelectedItems} value={selectedItems}>
        <FlatList
          width="100%"
          showsVerticalScrollIndicator={false}
          data={dataItems}
          renderItem={({item}) => {
            return (
              <>
                <Checkbox
                  mx={2}
                  my={2}
                  colorScheme="info"
                  alignItems="flex-start"
                  value={item.id}
                  accessible={true}
                  accessibilityLabel={item.name}>
                  <Text> {'  ' + item.name}</Text>
                </Checkbox>
                <Divider />
              </>
            );
          }}
        />
      </Checkbox.Group>
    </Box>
  );
};

export default Create;
