import Realm from 'realm';
export const LIST_SCHEMA = 'List';
// Define your models and their properties
export const ListSchema = {
  name: LIST_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: {type: 'string', indexed: true},
  },
};
const databaseOptions = {
  schema: [ListSchema],
  schemaVersion: 0, //optional
};
//functions for TodoLists
// export const insertNewTodoList = newTodoList =>
//   new Promise((resolve, reject) => {
//     Realm.open(databaseOptions)
//       .then(realm => {
//         realm.write(() => {
//           realm.create(LIST_SCHEMA, newTodoList);
//           resolve(newTodoList);
//         });
//       })
//       .catch(error => reject(error));
//   });
// export const updateTodoList = todoList =>
//   new Promise((resolve, reject) => {
//     Realm.open(databaseOptions)
//       .then(realm => {
//         realm.write(() => {
//           let updatingTodoList = realm.objectForPrimaryKey(
//             LIST_SCHEMA,
//             todoList.id,
//           );
//           updatingTodoList.name = todoList.name;
//           resolve();
//         });
//       })
//       .catch(error => reject(error));
//   });
// export const deleteTodoList = todoListId =>
//   new Promise((resolve, reject) => {
//     Realm.open(databaseOptions)
//       .then(realm => {
//         realm.write(() => {
//           let deletingTodoList = realm.objectForPrimaryKey(
//             LIST_SCHEMA,
//             todoListId,
//           );
//           realm.delete(deletingTodoList);
//           resolve();
//         });
//       })
//       .catch(error => reject(error));
//   });
// export const deleteAllTodoLists = () =>
//   new Promise((resolve, reject) => {
//     Realm.open(databaseOptions)
//       .then(realm => {
//         realm.write(() => {
//           let allTodoLists = realm.objects(LIST_SCHEMA);
//           realm.delete(allTodoLists);
//           resolve();
//         });
//       })
//       .catch(error => reject(error));
//   });
export const getAll = () =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        let data = realm.objects(LIST_SCHEMA);
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
export default new Realm(databaseOptions);
