import React, { useEffect, useState, useLayoutEffect, useContext } from 'react';
import {
  Box,
  Center,
  Checkbox,
  Divider,
  FlatList,
  FormControl,
  HStack,
  Input,
  Spinner,
  Text,
} from 'native-base';
import { getAllItems } from '../database/Items';
import { updateList } from '../database/Lists';
import { getListItemByListId, updateListItems } from '../database/listItems';
import MyIcon from '../components/atoms/MyIcon';
import { AuthContext } from '../context/auth/AuthContext';
import { Image, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Edit = ({ route, navigation }) => {
  const { listId, list_name } = route.params;
  const { authState } = useContext(AuthContext);
  const userData = JSON.parse(authState.userData);
  const userId = userData.id;

  const [listName, setListName] = useState(list_name);
  const [isLoading, setIsLoading] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [querySearch, setQuerySearch] = useState('');
  const [filteredDataItems, setFilteredDataItems] = useState([]);
  const [dataItems, setDataItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => showSearch ? (
        <Box style={{ width: 200 }}>
          <Input
            placeholder="Cari item disini..."
            bg="#fff"
            p={2}
            my={2}
            value={querySearch}
            onChangeText={val => handleSearch(val)}
          />
        </Box>
      ) : <Text color="white" fontSize={20} fontWeight="bold">Buat List</Text>,
      headerRight: () => (
        <HStack>
          <MyIcon
            name={showSearch ? "close" : "search"}
            onPress={() => {
              handleSearch("")
              setShowSearch(!showSearch)
            }}
            style={{ marginRight: 15 }}
          />
          <MyIcon
            name="checkmark-circle-outline"
            onPress={submitForm}
            style={{ marginRight: 15 }}
          />
        </HStack>
      ),
    });
  }, [navigation, listName, selectedItems, showSearch, querySearch]);

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
    const res = await getAllItems(userId);
    if (res.success) {
      setDataItems(res.data);
      setFilteredDataItems(res.data);
      setIsLoading(false)
    } else {
      console.log('error fetch items', res.msg);
    }
  };

  const handleSearch = (query) => {
    setQuerySearch(query);
    if (query) {
      const newData = dataItems.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const queryData = query.toUpperCase();
        return itemData.indexOf(queryData) > -1;
      })
      setFilteredDataItems(newData);
    } else {
      setFilteredDataItems(dataItems);
    }
  }

  const submitForm = async () => {
    const saveListName = await updateList({ id: listId, name: listName });
    if (saveListName.success) {
      await updateListItems({ userId, listId, items: selectedItems });
      //   navigation.popToTop();
      navigation.navigate({
        name: 'Home',
        params: { updated: true },
        merge: true,
      });
    }
  };
  return (
    <Box safeArea flex={1} bg="white">
      <FormControl isRequired>
        <Input
          mt={2}
          mx={3}
          p={2}
          placeholder="Nama List"
          value={listName}
          onChangeText={val => setListName(val)}
        />
      </FormControl>
      {isLoading ? <Center flex={1}><Spinner /></Center> : filteredDataItems.length === 0 ? (<Center justifyContent="center">
        <Image style={{
          width: SCREEN_WIDTH,
          height: SCREEN_WIDTH,
        }} source={require("../assets/images/no_data.jpg")} />
        <Text fontWeight="bold" fontSize="2xl">Item tidak ditemukan.</Text>
      </Center>) : (<Checkbox.Group onChange={setSelectedItems} value={selectedItems}>
        <FlatList
          width="100%"
          showsVerticalScrollIndicator={false}
          data={filteredDataItems}
          renderItem={({ item }) => {
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
                  {item.name}
                </Checkbox>
                <Divider />
              </>
            );
          }}
        />
      </Checkbox.Group>)
      }
    </Box>
  );
};

export default Edit;
