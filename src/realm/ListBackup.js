import Realm from 'realm';

const LIST_SCHEMA = 'List';
const ListSchema = {
  name: LIST_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
  },
};

const ListModel = Realm.open({
  schema: [ListSchema],
});

export const getAll = async () => {
  new Promise((resolve, reject) => {
    let data = ListModel.objects(LIST_SCHEMA);
    resolve(data);
  });
};

export const Insert = async data => {
  return new Promise((resolve, reject) => {
    ListModel.write(() => {
      ListModel.create(LIST_SCHEMA, {
        id: data.id,
        name: data.name,
      });
      resolve(data);
    }).catch(error => reject(error));
  });
};

export const Delete = async id => {
  return new Promise((resolve, reject) => {
    ListModel.write(() => {
      const data = ListModel.objectForPrimaryKey(LIST_SCHEMA, id);
      ListModel.delete(data);
      resolve();
    }).catch(error => reject(error));
  });
};
