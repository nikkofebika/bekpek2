import db from '../config/db';
import { deleteListItemByItemId } from './listItems';

export const deleteItem = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM items WHERE id = ?`,
        [id],
        async (sqlTx, res) => {
          await deleteListItemByItemId(id)
          console.log('success deleteItem');
          console.log('res', res);
          resolve();
        },
        error => {
          console.log('error deleteItem', error.message);
          reject(error.message);
        },
      );
    });
  });
};


export const createTableItems = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE items (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(50))`,
      [],
      (sqlTx, res) => {
        console.log('success create table');
        console.log('res', res);
        console.log('sqlTx', sqlTx);
      },
      error => {
        console.log('error create table');
        console.log('error', error.message);
      },
    );
  });
};
export const getAllItems = () => {
  return new Promise((resolve, reject) => {
    db.transaction(fx => {
      fx.executeSql(
        'SELECT * FROM items ORDER BY id desc',
        [],
        (fx, res) => {
          let len = res.rows.length;
          let results = [];
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              const item = res.rows.item(i);
              results.push({ id: item.id, name: item.name });
            }
          }
          resolve({ success: true, data: results });
        },
        error => {
          console.log('error db getItems', error.message);
          reject(error.message);
        },
      );
    });
  });
};

export const insertAll = () => {
  const datalist = require('../../dataLists.json');
  return new Promise((resolve, reject) => {
    db.transaction(fx => {
      datalist.map(name => {
        console.log(name);
        fx.executeSql(
          'INSERT INTO items (name) VALUES (?)',
          [name],
          (fx, res) => {
            console.log('res insertAll', res);
            resolve(res);
          },
          error => {
            console.log('error db getItems', error.message);
            reject(error.message);
          },
        );
      });
    });
  });
};

export const insertItem = (name) => {
  console.log("db name", name)
  return new Promise((resolve, reject) => {
    db.transaction(fx => {
      fx.executeSql(
        'SELECT id FROM items WHERE name = ?',
        [name],
        (fx, res) => {
          console.log("db insertItem", res)
          if (res.rows.length > 0) {
            resolve({ success: false });
          } else {
            fx.executeSql(
              'INSERT INTO items (name) VALUES (?)',
              [name],
              (fx, res) => {
                console.log('res insertItem', res);
                resolve({ success: true });
              },
              error => {
                console.log('error db insertItem', error.message);
                reject(error.message);
              },
            );
          }

        },
        error => {
          console.log('error db insertItem', error.message);
          reject(error.message);
        },
      );
    });
  });
};

export const dropTableItems = () => {
  return new Promise((resolve, reject) => {
    db.transaction(fx => {
      fx.executeSql(
        'DROP TABLE items',
        [],
        (fx, res) => {
          console.log('dropTableItems', res);
          resolve(res);
        },
        error => {
          console.log('error db dropTableItems', error.message);
          reject(error.message);
        },
      );
    });
  });
};
