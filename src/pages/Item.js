import React, { useEffect, useState, useRef, useContext } from 'react';
import {
  AlertDialog,
  Button,
  Center,
  Divider,
  FlatList,
  HStack,
  Icon,
  Input,
  Modal,
  Spinner,
  Text,
  View,
} from 'native-base';
import { Image, Dimensions, Alert } from "react-native"
import {
  deleteItem,
  getAllItems,
  insertItem,
  syncronizingItems,
} from '../database/Items';
import Ionicons from "react-native-ionicons"
import MyIcon from '../components/atoms/MyIcon';
import { AuthContext } from '../context/auth/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Item = ({ navigation }) => {
  const [countDeleted, setCountDeleted] = useState(0);
  const [itemName, setItemName] = useState('');
  const [querySearch, setQuerySearch] = useState('');
  const [filteredDataItems, setFilteredDataItems] = useState([]);
  const [dataItems, setDataItems] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [isRefresh, setIsRefresh] = useState(false);
  const [isSynchronizing, setIsSynchronizing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({ status: false, msg: '' });
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const onCloseAlert = () => setIsOpenAlert(false);
  const cancelRefAlert = useRef();

  const { authState } = useContext(AuthContext);
  const userData = JSON.parse(authState.userData);
  const userId = userData.id;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HStack>
          <MyIcon
            name="sync"
            style={{ marginRight: 20, color: '#fff' }}
            onPress={() => setIsOpenAlert(!isOpenAlert)}
          />
          <MyIcon
            name="add"
            style={{ marginRight: 15, color: '#fff' }}
            onPress={() => setShowModal(true)}
          />
        </HStack>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    fetchItems();
  }, [countDeleted]);

  const fetchItems = async () => {
    const res = await getAllItems(userId);
    if (res.success) {
      setDataItems(res.data);
      setFilteredDataItems(res.data);
      setisLoading(false)
    } else {
      console.log('error fetch items', res.msg);
    }
  };

  const handleDeleteItem = (name, id) => {
    Alert.alert(
      "Hapus",
      "Hapus " + name + " ?",
      [
        {
          text: "Batal"
        },
        {
          text: "OK", onPress: async () => {
            await deleteItem(id);
            setCountDeleted(countDeleted + 1);
          }
        }
      ]
    );
  };

  const handleInsertItem = async () => {
    if (itemName === '') {
      setErrors({ status: true, msg: 'Nama item harus diisi!' });
    } else {
      let saveItem = await insertItem({ userId, name: itemName });
      if (saveItem.success) {
        setItemName('');
        setCountDeleted(countDeleted + 1);
        setShowModal(false);
        setErrors({ status: false });
      } else {
        setErrors({ status: true, msg: 'Item sudah ada!' });
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setItemName('');
    setErrors({ status: false });
  };

  const handleSyncronizing = async () => {
    setIsSynchronizing(true);
    setTimeout(async () => {
      const syncronizeItems = await syncronizingItems(userId);
      if (syncronizeItems.success) {
        setCountDeleted(countDeleted + 1);
        setIsSynchronizing(false);
        setIsOpenAlert(false);
      }
    }, 2000);
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

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <Modal isOpen={showModal} onClose={handleCloseModal}>
        <Modal.Content maxWidth="400px">
          <Modal.Header>Tambah Item</Modal.Header>
          <Modal.Body>
            <Input
              onChangeText={value => setItemName(value)}
              value={itemName}
            />
            {errors.status && (
              <Text fontSize="xs" color="red.500">
                {errors.msg}
              </Text>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button.Group variant="ghost" space={2}>
              <Button onPress={handleInsertItem}>Simpan</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <AlertDialog
        leastDestructiveRef={cancelRefAlert}
        isOpen={isOpenAlert}
        onClose={onCloseAlert}
        motionPreset={'fade'}>
        <AlertDialog.Content>
          <AlertDialog.Header fontSize="lg" fontWeight="bold">
            Sinkronisasi Item
          </AlertDialog.Header>
          <AlertDialog.Body>
            {isSynchronizing === true ? (
              <Center>
                <Spinner />
                <Text>Loading...</Text>
              </Center>
            ) : (
              'Aplikasi akan mensinkronisasi daftar item default. Sinkronisasi sekarang?'
            )}
          </AlertDialog.Body>
          {!isSynchronizing && (
            <AlertDialog.Footer>
              <Button
                colorScheme="red"
                ref={cancelRefAlert}
                onPress={onCloseAlert}>
                Batal
              </Button>
              <Button onPress={handleSyncronizing} ml={3}>
                Ya
              </Button>
            </AlertDialog.Footer>
          )}
        </AlertDialog.Content>
      </AlertDialog>
      <Input
        placeholder="Cari item disini..."
        bg="#fff"
        p={2}
        m={2}
        value={querySearch}
        onChangeText={val => handleSearch(val)}
        InputLeftElement={<Icon size='sm' ml={2} color="gray.400" as={<Ionicons name="ios-search" />} />}
        InputRightElement={querySearch && <Icon onPress={() => handleSearch("")} size='sm' as={<Ionicons name="ios-close" />} />}
      />
      <View>
        {isLoading ? <Spinner /> : filteredDataItems.length === 0 ? (
          <Center justifyContent="center">
            <Image style={{
              width: SCREEN_WIDTH,
              height: SCREEN_WIDTH,
            }} source={require("../assets/images/no_data.jpg")} />
            <Text fontWeight="bold" fontSize="2xl">Item tidak ditemukan.</Text>
          </Center>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={filteredDataItems}
            renderItem={({ item }) => {
              return (
                <>
                  <HStack bg="white" p={3} mt={1} justifyContent="space-between">
                    <Text>{item.name}</Text>
                    <MyIcon
                      name="trash"
                      onPress={() => handleDeleteItem(item.name, item.id)}
                      color="#000000"
                    />
                  </HStack>
                  <Divider />
                </>
              );
            }}
            onRefresh={() => {
              setIsRefresh(true);
              fetchItems();
              setIsRefresh(false);
            }}
            refreshing={isRefresh}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Item;
