import db from '../config/db';
import {ucWords} from '../utils/general';
import {deleteListItemByItemId} from './listItems';

export const deleteItem = id => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM items WHERE id = ?`,
        [id],
        async (sqlTx, res) => {
          await deleteListItemByItemId(id);
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
      `CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, name VARCHAR(50))`,
      [],
      (sqlTx, res) => {
        // console.log('success create table');
        // console.log('res', res);
        // console.log('sqlTx', sqlTx);
      },
      error => {
        console.log('error create table');
        console.log('error', error.message);
      },
    );
  });
};
export const getAllItems = userId => {
  return new Promise((resolve, reject) => {
    db.transaction(fx => {
      fx.executeSql(
        'SELECT * FROM items WHERE user_id = ? ORDER BY id desc',
        [userId],
        (fx, res) => {
          let len = res.rows.length;
          let results = [];
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              const item = res.rows.item(i);
              results.push({id: item.id, name: item.name});
            }
          }
          resolve({success: true, data: results});
        },
        error => {
          console.log('error db getItems', error.message);
          reject(error.message);
        },
      );
    });
  });
};

export const syncronizingItems = userId => {
  const datalist = require('../../dataLists.json');
  let count = 0;
  return new Promise((resolve, reject) => {
    db.transaction(fx => {
      datalist.map(name => {
        let fixName = ucWords(name);
        fx.executeSql(
          'SELECT id FROM items WHERE user_id = ? AND name = ?',
          [userId, fixName],
          (fx, res) => {
            if (res.rows.length === 0) {
              fx.executeSql(
                'INSERT INTO items (user_id, name) VALUES (?,?)',
                [userId, fixName],
                (fx, res) => {
                  count++;
                },
                error => {
                  console.log('error db syncronizingItems', error.message);
                },
              );
            }
          },
          error => {
            console.log('error db syncronizingItems', error.message);
            reject(error.message);
          },
        );
      });
      resolve({success: true, totalDataInserted: count});
    });
  });
};

export const insertItem = data => {
  console.log('res unsertitem', data);
  let fixName = ucWords(data.name);
  return new Promise((resolve, reject) => {
    db.transaction(fx => {
      fx.executeSql(
        'SELECT id FROM items WHERE user_id = ? AND name = ?',
        [data.userId, fixName],
        (fx, res) => {
          if (res.rows.length > 0) {
            resolve({success: false});
          } else {
            fx.executeSql(
              'INSERT INTO items (user_id, name) VALUES (?,?)',
              [data.userId, fixName],
              (fx, res) => {
                console.log('res insertItem', res);
                resolve({success: true});
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
