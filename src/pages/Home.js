import React, {useEffect, useState, useContext} from 'react';
import {FlatList, Text, Button, Spinner, View} from 'native-base';
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
import {
  createTableItems,
  dropTableItems,
  syncronizingItems,
} from '../database/Items';
import {createTableUsers, dropTableUsers} from '../database/Users';
import {AuthContext} from '../context/auth/AuthContext';

const Home = ({route}) => {
  const [isRefresh, setIsRefresh] = useState(false);
  const [isLoading, setIsloading] = useState(true);
  const [datas, setDatas] = useState([]);
  const {authState} = useContext(AuthContext);
  const {id} = JSON.parse(authState.userData);
  useEffect(() => {
    // dropTableItems();
    // dropTableListItems();
    // dropTableLists();
    // dropTableUsers();
    createTableListItems();
    createTableList();
    createTableItems();
    // console.log('tai');
    // syncronizingItems();
    // getAllListItems();
    const init = async () => {
      getLists();
    };

    init().finally(async () => {
      await RNBootSplash.hide({fade: true});
      console.log('Bootsplash has been hidden successfully');
    });
  }, []);

  useEffect(() => {
    console.log('route', route);
    getLists();
  }, [route.params?.updated]);

  const getLists = async () => {
    const res = await getAllList(id);
    setDatas(res);
    setIsloading(false);
  };

  const handleDeleteList = async itemId => {
    const del = await deleteList(itemId);
    del.success && getLists();
  };

  const renderItem = ({item}) => {
    return (
      <Card data={item} handleDeleteList={() => handleDeleteList(item.id)} />
    );
  };

  if (isLoading) {
    return (
      <View flex={1} justifyContent="center" alignItems="center">
        <Spinner />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (datas.length > 0) {
    return (
      <FlatList
        data={datas}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        onRefresh={() => {
          setIsRefresh(true);
          getLists();
          setIsRefresh(false);
        }}
        refreshing={isRefresh}
      />
    );
  } else {
    return <Text>No Data</Text>;
  }
};

export default Home;
