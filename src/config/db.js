import { openDatabase } from 'react-native-sqlite-storage';
const db = openDatabase({
    name: 'bekpek',
    location: 'default',
});
export default db;