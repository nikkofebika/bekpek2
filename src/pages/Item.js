import React, { useEffect, useState } from 'react'
import { Button, FlatList, HStack, Input, Modal, Text } from 'native-base'
import { deleteItem, getAllItems, insertItem } from '../database/Items';
import Icon from '../components/atoms/Icon';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const Item = ({ navigation }) => {
    const [countDeleted, setCountDeleted] = useState(0);
    const [itemName, setItemName] = useState("");
    const [dataItems, setDataItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showError, setShowError] = useState(false);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Icon name="add" style={{ marginRight: 15 }} onPress={() => setShowModal(true)} />
            ),
        });
    }, [navigation]);

    useEffect(() => {
        console.log('effect')
        fetchItems();
    }, [countDeleted]);

    const fetchItems = async () => {
        const res = await getAllItems();
        if (res.success) {
            console.log('res items', res.data);
            setDataItems(res.data);
        } else {
            console.log('error fetch items', res.msg);
        }
    };

    const handleDeleteItem = async (id) => {
        await deleteItem(id)
        setCountDeleted(countDeleted + 1);
    }

    const handleInsertItem = async () => {
        console.log(itemName)
        let saveItem = await insertItem(itemName);
        if (saveItem.success) {
            setItemName("");
            setCountDeleted(countDeleted + 1);
            setShowModal(false);
        } else {
            setShowError(true)
        }
    }

    if (dataItems.length === 0) {
        return <Text>Tidak ada item</Text>
    }
    return (
        <>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Tambah Item</Modal.Header>
                    <Modal.Body>
                        <TextInput
                            style={styles.input}
                            onChangeText={setItemName}
                            value={itemName}
                        />
                        {showError && <Text fontSize="xs" color="red.500">Item sudah ada!</Text>}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group variant="ghost" space={2}>
                            <Button
                                onPress={handleInsertItem}>
                                Simpan
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
            <FlatList data={dataItems} renderItem={({ item }) => {
                return (
                    <HStack bg="white" p={3} my={1} justifyContent="space-between">
                        <Text>{item.name}</Text>
                        <Icon name="trash" onPress={() => handleDeleteItem(item.id)} />
                    </HStack>
                )
            }} />
        </>
    )
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
});

export default Item
