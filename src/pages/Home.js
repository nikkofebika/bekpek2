import React, { useEffect, useState } from 'react';
import { FlatList, Text, Button } from 'native-base';
import Card from '../components/molecules/Card';
import RNBootSplash from 'react-native-bootsplash';

import {
  createTableList,
  deleteList,
  dropTableLists,
  getAllList,
} from '../database/Lists';
import {
  createTableListItems,
  dropTableListItems,
  getAllListItems,
} from '../database/listItems';
import { createTableItems, dropTableItems, insertAll } from '../database/Items';

const Home = ({ route }) => {
  const [datas, setDatas] = useState([]);
  useEffect(() => {
    // dropTableItems();
    // dropTableListItems();
    // dropTableLists();
    // createTableListItems();
    // createTableList();
    // createTableItems();
    // console.log('tai');
    // insertAll();
    // getAllListItems();
    const init = async () => {
      getLists();
    };

    init().finally(async () => {
      await RNBootSplash.hide({ fade: true });
      console.log('Bootsplash has been hidden successfully');
    });
  }, []);

  useEffect(() => {
    console.log('route', route);
    getLists();
  }, [route.params?.updated]);

  const getLists = async () => {
    const res = await getAllList();
    setDatas(res);
  };

  const handleDeleteList = async itemId => {
    const del = await deleteList(itemId);
    del.success && getLists();
  };

  const renderItem = ({ item }) => {
    return (
      <Card data={item} handleDeleteList={() => handleDeleteList(item.id)} />
    );
  };

  if (datas.length > 0) {
    return (
      <FlatList
        data={datas}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    );
  }
  return <Text>No Data</Text>;
};

export default Home;
