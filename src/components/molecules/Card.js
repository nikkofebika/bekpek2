import React from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { Text, Box, HStack, VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import Icon from '../atoms/Icon';
import { formatDate } from '../../utils/general';
const Card = ({ data, handleDeleteList }) => {
  const navigation = useNavigation();
  return (
    <Box my={2} mx={3} shadow={3}>
      <TouchableOpacity onPress={() => navigation.navigate("Detail", { listId: data.id, list_name: data.list_name })}>
        <Box bg="gray.50" borderTopRadius="lg" px={3}>
          <Text bold fontSize="lg" py={1}>
            {data.list_name}
          </Text>
          <Text py={2}>
            <Text bold>Barang : </Text>{data.items.join(", ")}
          </Text>
        </Box>
      </TouchableOpacity>
      <HStack
        alignItems="center"
        justifyContent="space-between"
        bg="blue.300"
        borderBottomRadius="lg"
        px={3}
        py={1}>
        <VStack>
          <Text fontSize="xs">Dibuat: {formatDate(new Date(data.created))}</Text>
          {data.updated && <Text fontSize="xs">Diupdate: {formatDate(new Date(data.updated))}</Text>}

        </VStack>
        <HStack space={3}>
          <Icon name="create" onPress={() => navigation.navigate('Edit', { listId: data.id, list_name: data.list_name })} />
          <Icon
            name="trash"
            onPress={() =>
              Alert.alert('Hapus', 'Hapus ' + name, [
                {
                  text: 'Batal',
                },
                { text: 'OK', onPress: handleDeleteList },
              ])
            }
          />
        </HStack>
      </HStack>
    </Box>
  );
};
export default Card;
