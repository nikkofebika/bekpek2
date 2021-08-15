import React, {useEffect, useState, useRef, useContext} from 'react';
import {
  AlertDialog,
  Button,
  Center,
  FlatList,
  HStack,
  Input,
  Modal,
  Spinner,
  Text,
  VStack,
} from 'native-base';
import {
  deleteItem,
  getAllItems,
  insertItem,
  syncronizingItems,
} from '../database/Items';
import Icon from '../components/atoms/Icon';
import {AuthContext} from '../context/auth/AuthContext';

const Item = ({navigation}) => {
  const [countDeleted, setCountDeleted] = useState(0);
  const [itemName, setItemName] = useState('');
  const [dataItems, setDataItems] = useState([]);
  const [isSynchronizing, setIsSynchronizing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({status: false, msg: ''});
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const onCloseAlert = () => setIsOpenAlert(false);
  const cancelRefAlert = useRef();

  const {authState} = useContext(AuthContext);
  const userData = JSON.parse(authState.userData);
  const userId = userData.id;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HStack>
          <Icon
            name="sync"
            style={{marginRight: 20}}
            onPress={() => setIsOpenAlert(!isOpenAlert)}
          />
          <Icon
            name="add"
            style={{marginRight: 15}}
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
      console.log('res items', res.data);
      setDataItems(res.data);
    } else {
      console.log('error fetch items', res.msg);
    }
  };

  const handleDeleteItem = async id => {
    await deleteItem(id);
    setCountDeleted(countDeleted + 1);
  };

  const handleInsertItem = async () => {
    if (itemName === '') {
      setErrors({status: true, msg: 'Nama item harus diisi!'});
    } else {
      let saveItem = await insertItem({userId, name: itemName});
      if (saveItem.success) {
        setItemName('');
        setCountDeleted(countDeleted + 1);
        setShowModal(false);
        setErrors({status: false});
      } else {
        setErrors({status: true, msg: 'Item sudah ada!'});
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setItemName('');
    setErrors({status: false});
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

  return (
    <>
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
      {dataItems.length === 0 ? (
        <Text>Tidak ada item</Text>
      ) : (
        <FlatList
          data={dataItems}
          renderItem={({item}) => {
            return (
              <HStack bg="white" p={3} mt={1} justifyContent="space-between">
                <Text>{item.name}</Text>
                <Icon name="trash" onPress={() => handleDeleteItem(item.id)} />
              </HStack>
            );
          }}
        />
      )}
    </>
  );
};

export default Item;
